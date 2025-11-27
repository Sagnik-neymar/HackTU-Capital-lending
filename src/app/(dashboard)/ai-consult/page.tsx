"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    loan: z.string().min(2, { message: "Minimum Loan amount required." }),
    tenure: z.string().min(2, { message: "Minimum Tenure required." }),
    category: z.string().min(2, { message: "Category." }),
    age: z.string().min(1),
    income: z.string().min(1),
    emp_length: z.string().min(1),
    home_ownership: z.string().default("RENT"),
})

const index = () => {
    const [EMI, setEMI] = useState("")
    const [totalPayableAmount, setTotalPayableAmount] = useState("")
    const [totalInterest, setTotalInterest] = useState("")

    const [optiEMI, setoptiEMI] = useState("")
    const [optiTenure, setoptiTenure] = useState<number>(0)
    const [optiPayable, setoptiPayable] = useState("")
    const [optiTotalInterest, setoptiTotalInterest] = useState("")
    const router = useRouter();

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
async function onSubmit(values: z.infer<typeof formSchema>) {

    const loanAmount = parseFloat(values.loan);
    const tenureMonths = parseFloat(values.tenure);
    const income = parseFloat(values.income);

    const loan_percent_income = loanAmount / income;

    // map frontend categories to model categories
    const intentMap: any = {
        health: "MEDICAL",
        marriage: "PERSONAL",
        // travel: "TRAVEL",
        home: "HOMEIMPROVEMENT",
        education: "EDUCATION",
    };

    const payload = {
        person_age: parseFloat(values.age),
        person_income: income,
        person_home_ownership: values.home_ownership, // or ask user later
        person_emp_length: parseFloat(values.emp_length),
        loan_intent: intentMap[values.category],
        loan_grade: "B",
        loan_amnt: loanAmount,
        loan_percent_income: loan_percent_income,
        cb_person_default_on_file: "N",
        cb_person_cred_hist_length: 1
    };

    // 🔥 CALL PREDICTION API
    const response = await axios.post("http://localhost:8000/predict", payload);
    const rate = response.data.predicted_interest_rate;

    // Convert % to decimal (model returns like 12.7)
    const r = rate / (100 * 12);

    // 🔥 EMI CALCULATION USING predicted rate
const emi =
    (loanAmount * r * (1 + r) ** tenureMonths) /
    ((1 + r) ** tenureMonths - 1);

const total_payable = emi * tenureMonths;

    const total_interest = total_payable - loanAmount;

    // 🔥 OPTIMIZED EMI
    const opti_emi = emi * 0.85;

    if(opti_emi >= income * 0.75){
        alert("Optimized EMI exceeds 75% of your income. Please consider increasing tenure or reducing loan amount.");
    }

    // optimized tenure formula
    const opti_tenure =
        Math.log(opti_emi / (opti_emi - (loanAmount * r))) /
        Math.log(1 + r);

    const opti_total_payable = opti_emi * opti_tenure;
    const opti_interest = opti_total_payable - loanAmount;

    // update UI
    setEMI(emi.toFixed(2));
    setTotalPayableAmount(total_payable.toFixed(2));
    setTotalInterest(total_interest.toFixed(2));

    setoptiEMI(opti_emi.toFixed(2));
    setoptiTenure(Math.ceil(opti_tenure));
    setoptiPayable(opti_total_payable.toFixed(2));
    setoptiTotalInterest(opti_interest.toFixed(2));
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

                                                <SelectItem value="home">
                                                    Home Renovation
                                                </SelectItem>
                                                <SelectItem value="education">
                                                    Education
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Age</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Age"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form1.control}
                                name="income"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Income</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Income"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form1.control}
                                name="emp_length"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Employment Length (months)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Employment Length"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                                                        <FormField
                                control={form1.control}
                                name="home_ownership"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Home Ownership Status</FormLabel>
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
                                                <SelectItem value="RENT">
                                                    Rent
                                                </SelectItem>
                                                <SelectItem value="OWN">
                                                    Own
                                                </SelectItem>
                                                <SelectItem value="MORTGAGE">
                                                    Mortgage
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
            <div className="flex flex-col gap-6 w-full min-h-[95vh] justify-start items-center py-24">
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
                <InteractiveHoverButton onClick={()=> {router.push('/comparitive-analysis')}} className="justify-self-end"  >View Loan Options</InteractiveHoverButton>
                




            </div>

        </div>
    )
}

export default index
