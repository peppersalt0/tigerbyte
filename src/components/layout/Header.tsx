'use client'

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import MobileMenu from "./MobileMenu"
import PageContainer from "./PageContainer"

export const navigationItems = [
    { name: 'Sandbox', href: '/sandbox' },
    { name: 'Algorithms', href: '/algorithms' },
    { name: 'Data Structures', href: '/datastructures' },
    { name: 'Settings', href: '/settings' },
]

export const user = {
    name: "Joshua Jung",
    image: "/images/personalPFP.jpg"
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1">
                <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
                <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                <PageContainer />
            </div>
        </div>
    )
}