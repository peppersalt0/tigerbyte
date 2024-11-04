
'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {motion, AnimatePresence } from 'framer-motion'

const navigationItems = [
    { name: 'Feed', href: '/feed' },
    { name: 'Explore', href: '/explore' },
    { name: 'Messages', href: '/messages' },
    { name: 'Notifications', href: '/notifications' },
]
export default function Navbar()
{
    const [isOpen, setIsOpen] = useState(false)
    const user = {
        name: "Joshua Jung",
        image: "/images/personalPFP.jpg"
    }
    return (
        <div className="flex h-screen">
          {/* Sidebar - hidden on mobile */}
          <div className="hidden md:flex flex-col w-64 bg-white shadow-lg z-30 fixed h-screen">
            {/* Logo at top of sidebar */}
            <Link href="/" className="p-4 flex items-center space-x-3">
              <Image className="object-contain" src = "/images/tigerbyteLogoBlack.png" alt = "Logo" width={32} height={32} priority></Image>
              <span className="font-bold text-xl text-grey-900">
                tigerbyte
              </span>
            </Link>
    
            {/* Navigation Links in Sidebar */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      {/* You can add icons here */}
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
    
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Top Navigation Bar */}
            <header className="bg-white shadow-md h-16 fixed top-0 right-0 left-0 md:left-64 z-30">
              <div className="flex items-center justify-between h-full px-4">
                {/* Mobile Menu Button - only on mobile */}
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
    
                {/* Search Bar - hidden on mobile */}
                <div className="hidden md:flex flex-1 max-w-2xl mx-auto px-4">
                  <div className="relative w-full">
                    <input
                      type="search"
                      placeholder="Search..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {/* Search Icon */}
                    <span className="absolute right-3 top-2.5 text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                  </div>
                </div>
    
                {/* Profile Section - visible on all screens */}
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
                <Link href="/" className="p-4 flex items-center space-x-3 md:hidden">
                    <Image className="object-contain" src = "/images/tigerbyteLogoBlack.png" alt = "Logo" width={32} height={32} priority></Image>
                        <span className="font-bold text-xl text-grey-900">
                            tigerbyte
                        </span>
                    </Link>
              </div>
            </header>
            
            {/* Mobile Menu with Framer Motion */}
            <AnimatePresence>
            {isOpen && (
                <>
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />

                {/* Sliding Menu */}
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ 
                    type: "spring",
                    damping: 30,
                    stiffness: 300
                    }}
                    className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 md:hidden"
                >
                    {/* Profile at top of mobile menu */}
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 border-b"
                    >
                    <Link 
                        href="/profile"
                        className="flex items-center space-x-3"
                        onClick={() => setIsOpen(false)}
                    >
                        <Image
                        src={user.image}
                        alt="Profile"
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="font-medium">{user.name}</span>
                    </Link>
                    </motion.div>

                    {/* Mobile Search */}
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 border-b"
                    >
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded-lg border border-gray-300"
                    />
                    </motion.div>

                    {/* Mobile Navigation */}
                    <nav className="p-4">
                    {navigationItems.map((item, index) => (
                        <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        >
                        <Link
                            href={item.href}
                            className="block p-3 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                        </motion.div>
                    ))}
                    </nav>
                </motion.div>
                </>
            )}
            </AnimatePresence>
    
            {/* Main Content Area - Add margin for sidebar */}
            <div className="flex-1 md:ml-64"> {/* This pushes content away from sidebar */}
                {/* Main Content */}
                <main className="pt-16 min-h-screen relative">
                    {/* Background */}
                    <div 
                        className="fixed inset-0 z-0 pt-16"
                        style={{
                            backgroundImage: "url('/images/websiteBackgroundRandom.jpeg')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed'
                        }}
                    >
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Floating Content Container */}
                    <div className="
                        relative 
                        z-10 
                        flex 
                        justify-center 
                        px-4 
                        py-6
                        h-[calc(100vh-4rem)]
                    ">
                        <div className="
                            bg-white 
                            rounded-xl 
                            shadow-xl 
                            w-full
                            max-w-[90%] 
                            p-6 
                            md:p-8
                            h-full
                            overflow-y-auto
                        ">
                            {/* Your page content goes here */}
                            Content goes here
                        </div>
                    </div>
                </main>
            </div>
          </div>
        </div>
      )
}