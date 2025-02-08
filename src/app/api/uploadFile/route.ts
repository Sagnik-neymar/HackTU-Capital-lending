import { NextResponse } from "next/server"
import { client } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const { clerkId, fileUrl } = await req.json()

        if (!clerkId || !fileUrl) {
            return NextResponse.json(
                { error: "Missing clerkId or fileUrl" },
                { status: 400 },
            )
        }

        // ✅ Update the user record with the file URL
        const user = await client.user.update({
            where: { clerkId },
            data: { fileUrl },
        })

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error("Error saving file URL:", error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        )
    }
}
