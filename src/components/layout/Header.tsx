'use client'

import { useState } from "react"
import Sidebar from "./Sidebar"
import TopBar from "./TopBar"
import MobileMenu from "./MobileMenu"

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
        <div>
            <Sidebar />
            <TopBar isOpen={isOpen} setIsOpen={setIsOpen} />
            <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}