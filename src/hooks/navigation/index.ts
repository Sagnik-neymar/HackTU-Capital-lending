import { usePathname } from "next/navigation"
import { useState } from "react"

export const useNavigation = () => {
    const pathName = usePathname()
    const [section, SetSection] = useState<string>(pathName)
    const onSetSection = (page: string) => {
        SetSection(page)
    }

    return {
        section,
        onSetSection,
    }
}
