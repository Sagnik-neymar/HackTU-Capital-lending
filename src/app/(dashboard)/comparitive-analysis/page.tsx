import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { LENDX_CONSTANTS } from "@/constants"

const Page = () => {
    return (
        <div className="container h-screen flex justify-center items-center flex-wrap gap-4">
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

                    <CardFooter>
                        <Button className="w-full">
                            <Check className="mr-2" /> Apply Now
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default Page

{
    /* // < Card className = { cn("w-[380px]",) } >
    //             <CardHeader>
    //                 <CardTitle className="flex gap-3 items-center">
    //                     <div className="border-[1px] w-[3vw] h-[3vw] flex justify-center items-center">
    //                         <img src="/stripe.png" alt="img" />
    //                     </div>
    //                     <div className="text-[1vw] font-bold">
    //                         HDFC Bank
    //                     </div>
    //                 </CardTitle>
    //                 <CardDescription>Your options.</CardDescription>
    //             </CardHeader>
    //             <CardContent className="grid gap-4">
    //                 <div className="flex flex-col items-start rounded-md border p-4 text-left space-y-2">
    //                     <div className="text-[0.75vw] font-semibold text-zinc-600 flex itmes-center gap-2">
    //                         <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> Max Loan Amount:
    //                     </div>
    //                     <div className="text-[0.75vw] font-semibold text-zinc-600 flex itmes-center gap-2">
    //                         <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />Rate of Interest:
    //                     </div>
    //                     <div className="text-[0.75vw] font-semibold text-zinc-600 flex itmes-center gap-2">
    //                         <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />Tenure Upto:
    //                     </div>
    //                     <div className="text-[0.75vw] font-semibold text-zinc-600 flex itmes-center gap-2">
    //                         <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />Processing Fee:
    //                     </div>
    //                 </div>
    //             </CardContent>

    //             <CardFooter>
    //                 <Button className="w-full">
    //                     <Check /> Apply Now
    //                 </Button>
    //             </CardFooter>
    //         </Card > */
}
