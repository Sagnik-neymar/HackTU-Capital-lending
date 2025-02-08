import { AnimatedTestimonialsDemo } from "./_components/animated-testimonials-demo";
import BackdropGradient from "@/components/global/backdrop-gradient"
import GlassCard from "@/components/global/glass-card"



export default function FinancialLiteracyPage() {
    return (
        <div className="md:px-10 py-20 flex flex-col gap-8 items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-6">Financial Literacy</h1>
            <div className="p-10 rounded-xl shadow-md border-[1px]">
                <AnimatedTestimonialsDemo />
            </div>
        </div>
    );
}
