import React from "react"
import BackdropGradient from "@/components/global/backdrop-gradient"
import GlassCard from "@/components/global/glass-card"

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col container relative">
            <div className="container h-screen flex justify-center items-center">
                <div className="flex flex-col w-full items-center py-24">
                    <h2 className="text-4xl font-bold text-themeTextBlack">
                        Overview.
                    </h2>
                    <BackdropGradient
                        className="w-4/12 h-2/6 opacity-40"
                        container="flex flex-col items-center"
                    >
                        <GlassCard className="xs:w-full md:w-7/12 lg:w-5/12 xl:w-4/12 p-7 mt-16">
                            {children}
                        </GlassCard>
                    </BackdropGradient>
                </div>
            </div>
        </div>
    )
}

export default layout
