import { Home, CreditCard, Explore, Courses, CarotSort } from "@/icons"

export type MenuProps = {
    id: number
    label: string
    icon: JSX.Element
    path: string
    section?: boolean
    integration?: boolean
}

export type HoverMenuProps = {
    id: number
    label: string
    desc: string
    path: string
    icon: string
}

export const LANDING_PAGE_MENU: MenuProps[] = [
    {
        id: 0,
        label: "Home",
        icon: <Home />,
        path: "/",
        section: true,
    },
    {
        id: 1,
        label: "Products",
        icon: <CarotSort />,
        path: "#",
        section: true,
    },
    {
        id: 2,
        label: "Pricing",
        icon: <CreditCard />,
        path: "#pricing",
        section: true,
    },
]

export const HOVER_MENU: HoverMenuProps[] = [
    {
        id: 1,
        label: "Financial Literacy",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, odit.",
        path: "/financial-literacy",
        icon: "https://images.unsplash.com/photo-1659082246565-7195e6174b1a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 2,
        label: "Bank Statement Analysis",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, odit.",
        path: "/BSA",
        icon: "https://images.unsplash.com/photo-1638072536413-61c5c62b652e?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        label: "AI Consult",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, odit.",
        path: "/AC",
        icon: "https://images.unsplash.com/photo-1647612011547-55ae297d6a97?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        label: "Comparitive Analysis",
        desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, odit.",
        path: "/comparitive-analysis",
        icon: "https://images.unsplash.com/photo-1642908589071-f9e1d08056e2?q=80&w=1858&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
]
