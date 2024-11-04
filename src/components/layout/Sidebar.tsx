import Link from "next/link"
import Image from "next/image"
import { navigationItems } from "./Header"

export default function Sidebar() {
    return (
        <div className="hidden md:flex flex-col w-64 bg-white shadow-lg z-30 fixed h-screen">
            {/* Logo */}
            <Link href="/" className="p-4 flex items-center space-x-3">
                <Image 
                    className="object-contain" 
                    src="/images/tigerbyteLogoBlack.png" 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    priority
                />
                <span className="font-bold text-xl text-grey-900">
                    tigerbyte
                </span>
            </Link>

            {/* Navigation */}
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}