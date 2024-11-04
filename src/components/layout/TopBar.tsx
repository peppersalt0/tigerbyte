import Link from "next/link"
import Image from "next/image"
import { user } from "./Header"

interface TopBarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function TopBar({ isOpen, setIsOpen }: TopBarProps) {
    return (
        <header className="bg-white shadow-md h-16 fixed top-0 right-0 left-0 md:left-64 z-30">
            <div className="flex items-center justify-between h-full px-4">
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden text-gray-600 hover:text-gray-900"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-auto px-4">
                    <div className="relative w-full">
                        <input
                            type="search"
                            placeholder="Search..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                    </div>
                </div>

                {/* Profile */}
                <Link href="/profile" className="hidden md:flex items-center space-x-3">
                    <span className="text-gray-700">{user.name}</span>
                    <Image
                        src={user.image}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-grey-200"
                    />
                </Link>

                {/* Mobile Logo */}
                <Link href="/" className="p-4 flex items-center space-x-3 md:hidden">
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
            </div>
        </header>
    )
}