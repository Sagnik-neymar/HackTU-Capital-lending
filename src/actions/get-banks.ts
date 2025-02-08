"use server";

import { client } from "@/lib/prisma";
import { onAuthenticatedUser } from "./auth";

type BankDataProps = {
    id: string;
    name: string;
    accountNumber: string;
    panId: string;
};

export const getBanks = async () => {
    try {
        // Get the authenticated user
        const user = await onAuthenticatedUser();
        if (!user) throw new Error("User not authenticated");

        // Fetch PAN details using phoneNumber
        const pan = await client.pan.findUnique({
            where: { phoneNumber: user.phoneNumber },
            include: { banks: true }, // Fetch all related banks
        });

        if (!pan) throw new Error("PAN details not found");

        // Extract and return bank accounts
        return pan.banks.map((bank) => ({
            id: bank.id,
            name: bank.name,
            accountNumber: bank.accountNumber,
            panId: bank.panId,
        }));
    } catch (error) {
        console.error("Error fetching banks:", error);
        return [];
    }
};
