"use client"; // ✅ Marks this as a Client Component

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Bank = {
    id: string;
    name: string;
    accountNumber: string;
};

const BankList = ({ banks }: { banks: Bank[] }) => {
    const router = useRouter(); // ✅ Initialize router for navigation

    return (
        <div className="md:px-10 py-20 flex flex-col gap-10">
            <h1 className="text-2xl font-bold text-zinc-800">Your Linked Bank Accounts</h1>

            {banks.length === 0 ? (
                <p>No bank accounts found.</p>
            ) : (
                <ul className="space-y-4">
                    {banks.map((bank) => (
                        <li
                            key={bank.id}
                            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900"
                        >
                            <p className="font-bold text-lg">{bank.name}</p>
                            <p className="text-gray-600 dark:text-gray-300">Account No: {bank.accountNumber}</p>
                        </li>
                    ))}
                </ul>
            )}

            {/* ✅ Redirect Button */}
            <Button
                variant="default"
                className="mt-4"
                onClick={() => router.push("/")} // ✅ Redirect to "/dashboard"
            >
                Continue
            </Button>
        </div>
    );
};

export default BankList;
