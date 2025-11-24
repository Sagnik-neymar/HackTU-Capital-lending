export type ComparitiveDataProps = {
    id: number
    name: string
    icon: string
    Max_loan: string
    interest_rate: string
    tenure: string
    processing_fee: string
}

export const COMPARITIVE_DATA: ComparitiveDataProps[] = [
    {
        id: 1,
        name: "HDFC Bank",
        icon: "/hdfc.png",
        Max_loan: "₹ 40 Lakh",
        interest_rate: "10.85% - 21.00%",
        tenure: "1 - 6 years",
        processing_fee: "0.50% - 1.50%",
    },
    {
        id: 2,
        name: "SBI Bank",
        icon: "/sbi.png",
        Max_loan: "₹ 10 Lakh",
        interest_rate: "11.1% - ww%",
        tenure: "1 - 5 years",
        processing_fee: "0.50% - 2%",
    },
    {
        id: 3,
        name: "ICICI Bank",
        icon: "/icici.png",
        Max_loan: "₹ 40 Lakh",
        interest_rate: "6.70% - 8.05%",
        tenure: "1 - 5 years",
        processing_fee: "0.50% - 1.50%",
    },
]
