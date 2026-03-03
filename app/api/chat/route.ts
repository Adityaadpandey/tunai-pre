import { openai } from "@/lib/openai"
import { prisma } from "@/lib/prisma"
import { SYSTEM_PROMPT } from "@/lib/systemPrompt"
import { NextResponse } from "next/server"

function extractContact(text: string) {
    const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)
    const phone = text.match(/\+?\d{7,15}/)

    if (email) return { type: "email", value: email[0] }
    if (phone) return { type: "phone", value: phone[0] }
    return null
}

export async function POST(req: Request) {
    const { sessionId, message } = await req.json()

    if (!sessionId || !message)
        return NextResponse.json({ error: "Invalid input" }, { status: 400 })

    await prisma.session.upsert({
        where: { id: sessionId },
        update: {},
        create: { id: sessionId },
    })

    await prisma.message.create({
        data: {
            sessionId,
            sender: "USER",
            content: message,
        },
    })

    const history = await prisma.message.findMany({
        where: { sessionId },
        orderBy: { createdAt: "asc" },
        take: 12,
    })

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.4,
        messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history.map((m) => ({
                role: m.sender === "USER" ? ("user" as const) : ("assistant" as const),
                content: m.content,
            })),
            { role: "user", content: message },
        ],
    })

    const raw = response.choices[0].message.content || "{}"

    let parsed
    try {
        parsed = JSON.parse(raw)
    } catch {
        parsed = {
            reply: raw,
            stage: "EARLY_STAGE",
            score: 40,
            askContact: false,
            contactRequestedField: null,
            collectedContact: null,
            nextQuestions: [],
        }
    }

    await prisma.message.create({
        data: {
            sessionId,
            sender: "TUNAI",
            content: parsed.reply,
            meta: parsed,
        },
    })

    const contact = parsed.collectedContact || extractContact(message)

    if (contact) {
        await prisma.lead.upsert({
            where: { sessionId },
            update: {
                contactType: contact.type,
                contactValue: contact.value,
                stage: parsed.stage,
                score: parsed.score,
            },
            create: {
                sessionId,
                contactType: contact.type,
                contactValue: contact.value,
                stage: parsed.stage,
                score: parsed.score,
            },
        })
    }

    return NextResponse.json(parsed)
}
