import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { BadgePlus } from "@/icons"
import Link from "next/link"

const CallToAction = () => {
    return (
        <div className="flex flex-col items-start md:items-center gap-y-5 md:gap-y-0">
            <GradientText
                className="text-[35px] md:text-[40px] lg:text-[55px] xl:text-[70px] 2xl:text-[80px] leading-tight font-semibold"
                element="H1"
            >
                AI Powered Lending Solution.
            </GradientText>
            <p className="text-sm md:text-center text-left text-muted-foreground mt-5">
                LendX is an AI powered Lending solution, which simplifies
                <br className="md:hidden" />
                the loan origination , <br className="hidden md:block" />{" "}
                process by improving the user experience
                <br className="md:hidden" />
                and providing a secure auth flow.
            </p>
            <div className="flex md:flex-row flex-col md:justify-center gap-5 md:mt-5 w-full">
                {/* <Button
                    variant="outline"
                    className="rounded-xl bg-transparent text-base"
                >
                    Watch Demo
                </Button> */}
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
