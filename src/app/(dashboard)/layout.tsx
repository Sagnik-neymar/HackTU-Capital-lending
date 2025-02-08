import React from "react"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-col container relative">{children}</div>
}

export default DashboardLayout
