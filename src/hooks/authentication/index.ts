import { checkPanExist, onSignUpUser, userAlreadyExist } from "@/actions/auth"
import { SignInSchema } from "@/components/forms/sign-in/schema"
import { SignUpSchema } from "@/components/forms/sign-up/schema"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export const useAuthSignUp = () => {
    const { setActive, isLoaded, signUp } = useSignUp()
    const [creating, setCreating] = useState<boolean>(false)
    const [verifying, setVerifying] = useState<boolean>(false)
    const [code, setCode] = useState<string>("")

    const {
        register,
        formState: { errors },
        reset,
        handleSubmit,
        getValues,
    } = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        mode: "onBlur",
    })

    const router = useRouter()

    const onGenerateCode = async (
        pan: string,
        phone: string,
        password: string,
    ) => {
        if (!isLoaded)
            return toast("Error", {
                description: "Oops! something went wrong(onGenerateCode)",
            })

        console.log(getValues("pan"), getValues("phone"))
        // checking if a pan with the following combination exists or not
        const pan_found = await checkPanExist({
            phoneNumber: getValues("phone"),
            panNumber: getValues("pan"),
        })
        console.log(pan_found)
        if (!pan_found) return toast("wrong PAN or Phone number!")

        // checking if the user aleady exists
        const user_exist = await userAlreadyExist({
            phoneNumber: getValues("phone"),
            panNumber: getValues("pan"),
        })
        if (user_exist?.status === 200)
            return toast("User Already Exists. Try to Signin")

        try {
            if (pan && phone && password) {
                await signUp.create({
                    phoneNumber: `+91${getValues("phone")}`,
                    password: getValues("password"),
                })

                const verfification =
                    await signUp.preparePhoneNumberVerification({
                        strategy: "phone_code",
                    })
                console.log("verification: ", verfification)

                setVerifying(true)
            } else {
                return toast("Error", {
                    description: "No fields must be empty",
                })
            }
        } catch (error) {
            console.log("Error in onGenerateCode")
            console.error(JSON.stringify(error, null, 2))
        }
    }

    const onInitiateUserRegistration = handleSubmit(async (values) => {
        if (!isLoaded)
            return toast("Error", {
                description: "Oops! something went wrong",
            })

        try {
            setCreating(true)
            console.log(values.pan)
            const completeSignUp = await signUp.attemptPhoneNumberVerification({
                code,
            })

            if (completeSignUp.status !== "complete") {
                return toast("Error", {
                    description:
                        "Oops! something went wrong, status in complete",
                })
            }

            if (completeSignUp.status === "complete") {
                if (!signUp.createdUserId) return
                const user = await onSignUpUser({
                    firstname: values.firstname,
                    lastname: values.lastname,
                    clerkId: signUp.createdUserId,
                    panNumber: values.pan,
                    phoneNumber: values.phone,
                })

                reset()

                if (user.status === 200) {
                    toast("Success", {
                        description: user.message,
                    })
                    await setActive({
                        session: completeSignUp.createdSessionId,
                    })
                    router.push(`/upload-docs`)
                }
                if (user.status !== 200) {
                    toast("Error", {
                        description: user.message + "action failed",
                    })
                    router.refresh
                }
                setCreating(false)
                setVerifying(false)
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2))
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }
    })

    return {
        register,
        errors,
        onGenerateCode,
        onInitiateUserRegistration,
        verifying,
        creating,
        code,
        setCode,
        getValues,
    }
}

export const useAuthSignIn = () => {
    const { isLoaded, setActive, signIn } = useSignIn()
    const {
        register,
        formState: { errors },
        reset,
        getValues,
        handleSubmit,
    } = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        mode: "onBlur",
    })

    const router = useRouter()
    const onClerkAuth = async (phone: string, password: string) => {
        if (!isLoaded)
            return toast("Error", {
                description: "Oops! something went wrong",
            })
        try {
            // checking if a pan with the following combination exists or not
            console.log(getValues("phone"))
            const pan_found = await checkPanExist({
                phoneNumber: getValues("phone"),
                panNumber: getValues("pan"),
            })
            if (!pan_found) return toast("wrong PAN or Phone number!")

            const authenticated = await signIn.create({
                identifier: `+91${phone}`,
                password: password,
            })

            if (authenticated.status === "complete") {
                reset()
                await setActive({ session: authenticated.createdSessionId })
                toast("Success", {
                    description: "Welcome back!",
                })
                router.push("/upload-docs")
            }
        } catch (error: any) {
            if (error.errors[0].code === "form_password_incorrect")
                toast("Error", {
                    description: "email/password is incorrect try again",
                })
        }
    }

    const { mutate: InitiateLoginFlow, isPending } = useMutation({
        mutationFn: ({
            phone,
            password,
        }: {
            phone: string
            password: string
        }) => onClerkAuth(phone, password),
    })

    const onAuthenticateUser = handleSubmit(async (values) => {
        InitiateLoginFlow({ phone: values.phone, password: values.password })
    })

    return {
        onAuthenticateUser,
        isPending,
        register,
        errors,
    }
}
