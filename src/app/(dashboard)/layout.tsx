import React from "react"
import DashboardPageNavbar from "./_components/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col container relative">
            <DashboardPageNavbar />
            {children}
        </div>
    )
}

export default DashboardLayout
