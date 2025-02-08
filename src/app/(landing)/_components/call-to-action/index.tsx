import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BadgePlus } from "@/icons"
import React from "react"

const CallToAction = () => {
    return (
        <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
            <GradientText
                className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                element="H1"
            >
                AI Powered Loondry Service.
            </GradientText>
            <p className="text-sm md:text-center text-left text-muted-foreground mt-5">
                LendX is an AI powered Loondry solution, which in collaboration
                <br className="md:hidden" />
                with mangla laundramat, <br className="hidden md:block" /> has
                changed the game, of laundry to better wash clothes
                <br className="md:hidden" />
                and get you a girlfriend
            </p>
            <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
                <Button
                    variant="outline"
                    className="rounded-xl bg-transparent text-base"
                >
                    Watch Demo
                </Button>
                <Link href="/sign-up">
                    <Button className="rounded-xl text-base flex gap-2 w-full">
                        <BadgePlus /> Get Started
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default CallToAction
