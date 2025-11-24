import React from "react"
import Menu from "./menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logout } from "@/icons"
import { UserButton } from "@clerk/nextjs"

type Props = {}

const DashboardPageNavbar = () => {
    return (
        <div className="w-full flex justify-between items-center sticky top-0 py-5 z-50">
            <p className="font-bold text-2xl">LendX.</p>
            <Menu orientation="desktop" />
            <div className="flex gap-2">
                <Link href="/sign-up">
                    <Button
                        variant="outline"
                        className="border-zinc-400 border-[3px] w-[2.5vw] h-[2.5vw] rounded-full flex gap-2 hover:bg-zinc-300 transition-colors p-1"
                    >
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "grayscale", // Makes the profile image black & white
                                },
                            }}
                        />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardPageNavbar
