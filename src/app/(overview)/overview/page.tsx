import { onAuthenticatedUser } from "@/actions/auth";
import { getBanks } from "@/actions/get-banks";
import { redirect } from "next/navigation";
import BankList from "../_components/bank-list";

const OverviewPage = async () => {
    const user = await onAuthenticatedUser();
    if (!user) redirect("/sign-in"); // ✅ Redirect on the server

    const banks = await getBanks(); // ✅ Fetch bank accounts on the server

    return <BankList banks={banks} />; // ✅ Pass data to Client Component
};

export default OverviewPage;
