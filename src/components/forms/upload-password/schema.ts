import { z } from "zod"

export const UploadSchema = z.object({
    password: z
        .string()
        .min(0),
})
