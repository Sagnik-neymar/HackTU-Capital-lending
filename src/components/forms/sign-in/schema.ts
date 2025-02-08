import { z } from "zod"

export const SignInSchema = z.object({
    pan: z
        .string()
        .min(10, { message: "PAN number must be atleast 10 digits long" }),
    phone: z
        .string()
        .min(10, { message: "Phone number must be atleast 10 digits long" }),
    password: z
        .string()
        .min(8, { message: "Your password must be atleast 8 characters long" })
        .max(64, {
            message: "Your password can not be longer then 64 characters long",
        })
        .refine(
            (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ""),
            "password should contain only alphabets and numbers",
        ),
})
