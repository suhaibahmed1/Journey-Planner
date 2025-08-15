"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, MapPin } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/plan", label: "Make Your Plan" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-teal-600" />
            <span className="text-xl font-bold text-gray-900">Journey Planner</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                  pathname === item.href ? "text-teal-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-teal-600 ${
                      pathname === item.href ? "text-teal-600" : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button asChild variant="ghost">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                  <Button asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
