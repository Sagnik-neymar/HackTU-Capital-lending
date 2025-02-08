import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp" // from shadcn
import React from "react"

type Props = {
    otp: string
    setOtp: React.Dispatch<React.SetStateAction<string>>
}

const OtpInput = ({ otp, setOtp }: Props) => {
    // clerk passes a 5 digit otp
    return (
        <InputOTP maxLength={6} value={otp} onChange={(otp) => setOtp(otp)}>
            <div className="flex gap-3">
                <div className="">
                    <InputOTPSlot className="border-zinc-400" index={0} />
                </div>
                <div>
                    <InputOTPSlot className="border-zinc-400" index={1} />
                </div>
                <div>
                    <InputOTPSlot className="border-zinc-400" index={2} />
                </div>
                <div>
                    <InputOTPSlot className="border-zinc-400" index={3} />
                </div>
                <div>
                    <InputOTPSlot className="border-zinc-400" index={4} />
                </div>
                <div>
                    <InputOTPSlot className="border-zinc-400" index={5} />
                </div>
            </div>
        </InputOTP>
    )
}

export default OtpInput
