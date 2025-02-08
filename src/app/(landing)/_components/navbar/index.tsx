import React from "react"
import Menu from "./menu"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logout } from "@/icons"

type Props = {}

const LandingPageNavbar = () => {
    return (
        <div className="w-full flex justify-between items-center sticky top-0 py-5 z-50">
            <p className="font-bold text-2xl">LendX.</p>
            <Menu orientation="desktop" />
            <div className="flex gap-2">
                <Link href="/sign-up">
                    <Button
                        variant="outline"
                        className="bg-zinc-200 border-zinc-400 rounded-xl flex gap-2 hover:bg-zinc-300 transition-colors"
                    >
                        <Logout />
                        Login
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPageNavbar
