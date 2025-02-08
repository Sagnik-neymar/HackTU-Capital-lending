"use client";

import { useState } from "react";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";




export default function App() {
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    // Handle file upload and extract CDN URL
    const handleFileUpload = (file: any) => {
        if (file?.cdnUrl) {
            setFileUrl(file.cdnUrl); // ✅ Store the file URL in state
            console.log("Uploaded file URL:", file.cdnUrl); // ✅ Log the URL
        }
    };

    return (
        <div>
            <div className="p-3 flex flex-col gap-36 border-[1px] rounded-xl">
                <FileUploaderRegular
                    sourceList="local, camera, facebook, gdrive"
                    cameraModes="photo" // No video uploads
                    classNameUploader="uc-light"
                    pubkey="d3ddeba52ae0e92ce492"
                    onFileUploadSuccess={handleFileUpload} // ✅ Capture uploaded file details
                    accept="application/pdf"
                    onFileUploadProgress={(progress) => console.log("Upload progress:", progress.uploadProgress)}
                />
            </div>
            {/* password field */}
            
        </div>
    );
}











