"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
            <Shield className="w-6 h-6" />
            <span>An Toàn Giao Thông</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/driving-tips" className="hover:text-primary transition-colors">
              Mẹo Lái Xe
            </Link>
            <Link href="/traffic-laws" className="hover:text-primary transition-colors">
              Luật Giao Thông
            </Link>
            <Link href="/safety" className="hover:text-primary transition-colors">
              An Toàn
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-8 h-8 flex items-center justify-center">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/driving-tips" className="block py-2 hover:text-primary">
              Mẹo Lái Xe
            </Link>
            <Link href="/traffic-laws" className="block py-2 hover:text-primary">
              Luật Giao Thông
            </Link>
            <Link href="/safety" className="block py-2 hover:text-primary">
              An Toàn
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

import { Shield } from "lucide-react"
