import React from "react"
import { CardStack } from "@/components/ui/card-stack"
import { cn } from "@/lib/utils"
import { client } from "@/lib/prisma"

const Page = () => {
    return (
        <div className="md:px-10 py-20 flex gap-8 items-center justify-center h-screen">
            <CardStack bank="icici" />
        </div>
    )
}

export default Page
