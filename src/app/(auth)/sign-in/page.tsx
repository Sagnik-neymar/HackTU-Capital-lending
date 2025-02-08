import SignInForm from "@/components/forms/sign-in"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const SignInPage = () => {
    return (
        <>
            <h5 className="font-bold text-base text-zinc-700">Login</h5>
            <p className="text-zinc-500 leading-tight mt-5">
                Login using PAN and registered Phone number and Password.
            </p>
            <SignInForm />
            <div className="my-10 w-full relative">
                <div className="bg-zinc-200 p-3 absolute text-themeTextBlack text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    OR CONTINUE WITH
                </div>
                <Separator orientation="horizontal" className="bg-themeGray" />
            </div>
            <Link href={"/sign-up"}>
                <p className="text-indigo-700 text-[0.9vw]">
                    Don't have an account? signup
                </p>
            </Link>
        </>
    )
}

export default SignInPage
