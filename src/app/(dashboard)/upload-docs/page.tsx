"use client"

import { useState } from "react"
import { FileUploaderRegular } from "@uploadcare/react-uploader/next"
import "@uploadcare/react-uploader/core.css"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    password: z.string().min(0).max(50),
})

export default function App() {
    const router = useRouter()

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(fileUrl, values)
        try {
            const payload = {
                fileUrl,
                password: values.password,
            }
            const response = await axios.post(
                "http://localhost:5000/upload",
                payload,
            ) // ✅ Send the file URL to the server

            if (response.status === 200) {
                form.reset()
                router.push("/bank-statement-analysis")
            } else {
                toast("An unknown error occurred")
            }
        } catch (error) {
            console.error(error)
            if (error instanceof Error) {
                return toast(error.message)
            }
            return toast("An unknown error occurred")
        }
    }

    const [fileUrl, setFileUrl] = useState<string | null>(null)

    // Handle file upload and extract CDN URL
    const handleFileUpload = (file: any) => {
        if (file?.cdnUrl) {
            setFileUrl(file.cdnUrl) // ✅ Store the file URL in state
            console.log("Uploaded file URL:", file.cdnUrl) // ✅ Log the URL
        }
    }

    return (
        <div>
            <div className="h-[4vw] p-3 flex flex-col gap-36 border-[1px] border-zinc-400 rounded-lg mb-5">
                <FileUploaderRegular
                    sourceList="local, camera, facebook, gdrive"
                    cameraModes="photo" // No video uploads
                    classNameUploader="uc-light"
                    pubkey="d3ddeba52ae0e92ce492"
                    onFileUploadSuccess={handleFileUpload} // ✅ Capture uploaded file details
                    accept="application/pdf"
                    onFileUploadProgress={(progress) =>
                        console.log("Upload progress:", progress.uploadProgress)
                    }
                />
            </div>
            {/* password field */}
            {fileUrl && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Enter Password if protected pdf
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            )}
        </div>
    )
}
