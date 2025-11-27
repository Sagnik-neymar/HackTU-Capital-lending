import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardStack } from "@/components/ui/card-stack"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LENDX_CONSTANTS } from "@/constants"
import { Xcom } from "@/icons/X"
import { cn } from "@/lib/utils"
import Link from "next/link"

const Page = () => {
    return (
        <div className="container h-screen flex justify-center items-center flex-wrap gap-4 -mt-[3vw]">
            {LENDX_CONSTANTS.comparitiveData.map((data, index) => (
                <Card
                    key={index}
                    className={cn("w-[380px] hover:bg-zinc-50 transition-all")}
                >
                    <CardHeader>
                        <CardTitle className="flex gap-3 items-center">
                            <div className=" w-[3vw] h-[3vw] flex justify-center items-center">
                                <img src={data.icon} alt="img" />
                            </div>
                            <div className="text-[1vw] font-bold">
                                {data.name}
                            </div>
                        </CardTitle>
                        <CardDescription>Your Options</CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-4">
                        <div className="flex flex-col items-start rounded-md border p-4 text-left space-y-2">
                            {[
                                {
                                    label: "Max Loan Amount",
                                    value: data.Max_loan,
                                },
                                {
                                    label: "Rate of Interest",
                                    value: data.interest_rate,
                                },
                                { label: "Tenure Upto", value: data.tenure },
                                {
                                    label: "Processing Fee",
                                    value: data.processing_fee,
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="text-[0.8vw] font-semibold text-zinc-600 flex items-center gap-2"
                                >
                                    <span className="flex h-2 w-2 rounded-full bg-sky-500" />
                                    {item.label}:{" "}
                                    <p className="font-bold">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Link target="_blank" className="w-full" href={data.apply_link!} >
                        <Button className="w-full">
                            <Check className="mr-2" /> Apply Now
                        </Button>
                        
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full bg-white text-themeBlack"
                                >
                                    <Xcom /> Check Tweets
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[40vw] h-[25vw] border-none flex justify-between items-center">
                                <div className="flex justify-between items-center translate-x-10">
                                    <CardStack bank={data.name} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Page
