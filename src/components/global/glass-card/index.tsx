import React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Props = {
    children: React.ReactNode
    className?: string
}

const GlassCard = ({ children, className }: Props) => {
    return (
        <Card
            className={cn(
                className,
                "rounded-2xl bg-white border-zinc-300 drop-shadow-md bg-clip-padding backdrop--blue__safar backrop-filter backdrop-blur-4xl bg-opacity-40",
            )}
        >
            {children}
        </Card>
    )
}

export default GlassCard
