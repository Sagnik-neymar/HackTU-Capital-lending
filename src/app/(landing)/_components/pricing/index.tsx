import BackdropGradient from "@/components/global/backdrop-gradient"
import GradientText from "@/components/global/gradient-text"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Check } from "@/icons"
import Link from "next/link"

type Props = {}

export const PricingSection = (props: Props) => {
    return (
        <div
            className="w-full pt-20 flex flex-col items-center gap-3"
            id="pricing"
        >
            <BackdropGradient className="w-8/12 h-full opacity-40 flex flex-col items-center">
                <GradientText
                    className="text-4xl font-semibold text-center"
                    element="H2"
                >
                    Pricing Plans That Fit Your Right
                </GradientText>
                <p className="text-sm md:text-center text-left text-muted-foreground mt-6">
                    LendX is a revolutionary AI powered lending solution to,{" "}
                    <br className="hidden md:block" />
                    improve the loan origination process.
                </p>
            </BackdropGradient>
            <Card className="p-7 mt-10 md:w-auto w-full bg-zinc-100 border-zinc-300 hover:bg-zinc-200 transition-all">
                <div className="flex flex-col gap-2">
                    <CardTitle>₹ 100</CardTitle>
                    <CardDescription className="text-[#706e6d]">
                        Per Bank statement.
                    </CardDescription>
                    <Link href="#" className="w-full mt-3">
                        <Button
                            variant="default"
                            className="bg-[#666669] w-full rounded-xl text-white hover:text-[white] hover:bg-[#49494b] transition-all"
                        >
                            Start for free
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-2 text-[#5d5b5a] mt-5">
                    <p>Features</p>
                    <span className="flex gap-2 mt-3 items-center">
                        <Check />
                        Advanced analytics.
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Link multiple Bank accounts
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        Recurring Payments
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        More Graphs on your face
                    </span>
                    <span className="flex gap-2 items-center">
                        <Check />
                        We won't leak your data
                    </span>
                </div>
            </Card>
        </div>
    )
}
