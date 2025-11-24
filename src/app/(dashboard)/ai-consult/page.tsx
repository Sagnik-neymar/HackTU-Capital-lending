"use client"

import React from "react"
import BackdropGradient from "@/components/global/backdrop-gradient"
import GlassCard from "@/components/global/glass-card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

const formSchema = z.object({
    loan: z.string().min(2, {
        message: "Minimum Loan amount required.",
    }),
    tenure: z.string().min(2, {
        message: "Minimum Tenure required.",
    }),
    category: z.string().min(2, {
        message: "Category.",
    }),
})

const index = () => {
    const [EMI, setEMI] = useState("")
    const [totalPayableAmount, setTotalPayableAmount] = useState("")
    const [totalInterest, setTotalInterest] = useState("")

    const [optiEMI, setoptiEMI] = useState("")
    const [optiTenure, setoptiTenure] = useState<number>(0)
    const [optiPayable, setoptiPayable] = useState("")
    const [optiTotalInterest, setoptiTotalInterest] = useState("")

    // 1. Define your form.
    const form1 = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            loan: "",
            tenure: "",
            category: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const loanAmount = parseFloat(values.loan)
        const tenureMonths = parseFloat(values.tenure)
        const total_payable_amount =
            (loanAmount * 12.71 * (1 + 12.71) ** tenureMonths) /
            ((1 + 12.71) ** tenureMonths - 1) /
            tenureMonths
        const emi = total_payable_amount / tenureMonths
        const total_interest = total_payable_amount - loanAmount

        const opti_emi = emi * 0.85
        const opti_tenure =
            Math.log(opti_emi / (opti_emi - (loanAmount * 12.71) / 1200)) /
            Math.log(1 + 12.71 / 1200)
        const opti_total_payable_amount = opti_emi * opti_tenure
        const opti_total_interest = opti_total_payable_amount - loanAmount

        setEMI(emi.toFixed(2))
        setTotalPayableAmount(total_payable_amount.toFixed(2))
        setTotalInterest(total_interest.toFixed(2))

        setoptiEMI(opti_emi.toFixed(2)) // value in optiEMI
        setoptiTenure(Math.ceil(parseFloat(opti_tenure.toFixed(2)))) // value in optiTenure
        setoptiPayable(opti_total_payable_amount.toFixed(2)) // value in optiPayable
        setoptiTotalInterest(opti_total_interest.toFixed(2)) // value in optiTotalInterest
    }

    return (
        <div className="w-full h-full flex px-10 gap-1 justify-center items-center">
            <div className="flex flex-col w-full items-center py-24">
                <h2 className="text-3xl font-bold text-zinc-700 pb-3">
                    EMI Estimation.
                </h2>
                <Card className="w-[32vw] p-10">
                    <Form {...form1}>
                        <form
                            onSubmit={form1.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                                control={form1.control}
                                name="loan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Required Loan Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="loan amount"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="tenure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tenure</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="tenure in months"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Personal Loan for</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="health">
                                                    Health Checkup
                                                </SelectItem>
                                                <SelectItem value="marriage">
                                                    marriage
                                                </SelectItem>
                                                <SelectItem value="travel">
                                                    Travel
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </Card>
            </div>
            <div className="flex flex-col gap-3 w-full items-center py-24">
                <Card className="w-[32vw] h-[13vw] p-3 flex flex-col">
                    <div className="w-full h-[5vw] text-left pl-3">
                        <h6 className="text-[0.9vw]">Your EMI is</h6>
                        <h5 className="text-[1.5vw] font-bold text-zinc-800">
                            {EMI && `₹ ${EMI}`}
                        </h5>
                    </div>
                    <div className="w-full h-[2px] bg-zinc-500 rounded mb-3" />
                    <div className="w-full h-[8vw] flex gap-5 px-3">
                        <div>
                            <h6 className="text-[0.9vw] flex gap-1 items-center">
                                <span className="w-[0.5vw] h-[0.5vw] bg-blue-500 rounded-full"></span>{" "}
                                Total Interest
                            </h6>
                            <h5 className="text-[0.9vw] text-zinc-800">
                                {totalInterest && `₹ ${totalInterest}`}
                            </h5>
                        </div>
                        <div>
                            <h6 className="text-[0.9vw]] flex gap-1 items-center">
                                <span className="w-[0.5vw] h-[0.5vw] bg-blue-500 rounded-full"></span>{" "}
                                Total Amount Payable
                            </h6>
                            <h5 className="text-[0.9vw] text-zinc-800">
                                {totalPayableAmount &&
                                    `₹ ${totalPayableAmount}`}
                            </h5>
                        </div>
                    </div>
                </Card>
                {/* 2nd card */}
                <Card className="w-[32vw] h-[13vw] p-3 flex flex-col">
                    <div className="w-full h-[5vw] text-left pl-3 flex gap-9">
                        <div className="flex flex-col">
                            <h6 className="text-[0.9vw]">Optimized EMI</h6>
                            <h5 className="text-[1.5vw] font-bold text-zinc-800">
                                {optiEMI && `₹ ${optiEMI}`}
                            </h5>
                        </div>
                        <div className="flex flex-col">
                            <h6 className="text-[0.9vw]">
                                Optimized Tenure (months)
                            </h6>
                            <h5 className="text-[1.5vw] font-bold text-zinc-800">
                                {optiTenure && ` ${optiTenure} m`}
                            </h5>
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-zinc-500 rounded mb-3" />
                    <div className="w-full h-[8vw] flex gap-5 px-3">
                        <div>
                            <h6 className="text-[0.9vw]] flex gap-1 items-center">
                                <span className="w-[0.5vw] h-[0.5vw] bg-blue-500 rounded-full"></span>{" "}
                                Total Interest
                            </h6>
                            <h5 className="text-[0.9vw] text-zinc-800">
                                {optiTotalInterest && `₹ ${optiTotalInterest}`}
                            </h5>
                        </div>
                        <div>
                            <h6 className="text-[0.9vw]] flex gap-1 items-center">
                                <span className="w-[0.5vw] h-[0.5vw] bg-blue-500 rounded-full"></span>{" "}
                                Total Amount Payable
                            </h6>
                            <h5 className="text-[0.9vw] text-zinc-800">
                                {optiPayable && `₹ ${optiPayable}`}
                            </h5>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default index
