"use client"

import React from "react"
import { useNavigation } from "@/hooks/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { LENDX_CONSTANTS } from "@/constants"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Image from "next/image"
import { ChevronUp } from "lucide-react"

type MenuProps = {
    orientation: "desktop" | "mobile"
}

const Menu = ({ orientation }: MenuProps) => {
    const { section, onSetSection } = useNavigation() // hook to find out current active page

    switch (orientation) {
        case "desktop":
            return (
                <Card className="bg-zinc-200 border-zinc-400 bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 p-1 lg:flex hidden rounded-xl">
                    <CardContent className="p-0 flex gap-2">
                        {LENDX_CONSTANTS.landingPageMenu.map((menuItem) =>
                            menuItem.id === 1 ? (
                                <HoverCard key={menuItem.id}>
                                    <HoverCardTrigger asChild>
                                        <div
                                            onClick={() => {
                                                if (menuItem.section) {
                                                    onSetSection(menuItem.path)
                                                }
                                            }}
                                            className={cn(
                                                "rounded-xl flex gap-2 py-2 px-4 items-center cursor-pointer hover-rotate-container",
                                                section === menuItem.path
                                                    ? "bg-[#0f0f0f] border-[#27272A] text-zinc-50"
                                                    : "",
                                            )}
                                        >
                                            <ChevronUp className="hover-rotate" />
                                            {menuItem.label}
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="translate-y-2 -translate-x-2 p-1 w-[46vw] h-fit flex flex-wrap justify-around">
                                        {LENDX_CONSTANTS.hoverMenu.map(
                                            (item) => (
                                                <Link
                                                    href={item.path}
                                                    className="w-[22vw] h-[7vw] my-1 mx-1 rounded-sm hover:bg-zinc-200 transition-all"
                                                    key={item.id}
                                                >
                                                    <div className="w-full h-full flex justify-between rounded-sm">
                                                        <div className="w-2/6 h-full rounded-sm overflow-hidden relative">
                                                            <img
                                                                src={item.icon}
                                                                className="absolute inset-0 w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="w-4/6 h-full rounded-r-sm px-3 pt-1 leading-tight text-left">
                                                            <h5 className="font-bold text-zinc-700">
                                                                {item.label}
                                                            </h5>
                                                            <p className="text-[0.7vw] text-zinc-500 pt-1">
                                                                {item.desc}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ),
                                        )}
                                    </HoverCardContent>
                                </HoverCard>
                            ) : (
                                <Link
                                    href={menuItem.path}
                                    {...(menuItem.section && {
                                        onClick: () =>
                                            onSetSection(menuItem.path),
                                    })}
                                    className={cn(
                                        "rounded-xl flex gap-2 py-2 px-4 items-center",
                                        section === menuItem.path
                                            ? "bg-[#0f0f0f] border-[#27272A] text-zinc-50"
                                            : "",
                                    )}
                                    key={menuItem.id}
                                >
                                    {section === menuItem.path && menuItem.icon}
                                    {menuItem.label}
                                </Link>
                            ),
                        )}
                    </CardContent>
                </Card>
            )

        case "mobile":
            return <div></div>
        default:
            break
    }
}

export default Menu
