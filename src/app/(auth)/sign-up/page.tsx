import SignUpForm from "@/components/forms/sign-up"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const SignInPage = () => {
    return (
        <>
            <h5 className="font-bold text-base text-zinc-700">Sign Up</h5>
            <p className="text-zinc-500 leading-tight mt-5">
                Sign Up using name, PAN and registered Phone number.
            </p>
            <SignUpForm />
            <div className="my-10 w-full relative">
                <div className="bg-zinc-200 p-3 absolute text-themeTextBlack text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    OR CONTINUE WITH
                </div>
                <Separator orientation="horizontal" className="bg-themeGray" />
            </div>
            <Link href={"/sign-in"}>
                <p className="text-indigo-700 text-[0.9vw]">
                    Already have an account? signin
                </p>
            </Link>
        </>
    )
}

export default SignInPage
