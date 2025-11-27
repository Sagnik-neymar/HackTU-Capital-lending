"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderOne } from "@/components/ui/loader";
import { setAnalysisData } from "@/store/analysisSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  password: z.string().optional(),
});

export default function UploadToS3() {
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [analysing, setAnalysing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { password: "" },
  });

  const dispatch = useDispatch();

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Step 1: get presigned URL
    const { data } = await axios.post("/api/s3-presign", {
      fileName: file.name,
      fileType: file.type,
    });

    // Step 2: upload directly to S3
    await axios.put(data.uploadUrl, file, {
      headers: { "Content-Type": file.type },
      onUploadProgress: (p) =>
        console.log("Progress:", Math.round((p.loaded / p.total!) * 100)),
    });

setFileUrl(data.signedGetUrl);
    toast("File uploaded successfully!");
    setUploading(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!fileUrl) return toast("File not uploaded!");

    try {
      setAnalysing(true);
      const payload = {
        pdf_url:fileUrl,
        password: values.password,
      };

      const response = await axios.post("http://localhost:5000/upload", payload);

      if (response.status === 200) {
        dispatch(setAnalysisData(response.data));
        form.reset();
        setAnalysing(false);
        router.push("/bank-statement-analysis");
      }
    } catch (err) {
      toast("Error uploading");
      console.log(err);
    }
  };

  return !analysing ? (
    <div className="space-y-6">
      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full border p-3 rounded-md"
      />

      {uploading && <p>Uploading...</p>}

      {fileUrl && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password (if PDF is protected)</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </div>
  ) : (
    <LoaderOne/>
  );
}
