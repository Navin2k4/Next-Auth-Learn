"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, User, LayoutDashboard, FileText, PenTool, LogOut, CheckCheck, LoaderIcon, EllipsisIcon, Globe } from 'lucide-react'

export default function TopNavigation() {
  const pathname = usePathname()

  const menuItems = [
    { icon: <Home className="h-4 w-4" />, label: 'HOME', href: '/' },
    { icon: <PenTool className="h-4 w-4" />, label: 'REPORT ISSUE', href: '/issue/id/createissue' },
    { icon: <Globe className="h-4 w-4" />, label: 'ISSUES', href: '/issue/id/issues' },
    { icon: <LayoutDashboard className="h-4 w-4" />, label: 'DASHBOARD', href: '/user/id/dashboard' },
    { icon: <FileText className="h-4 w-4" />, label: 'YOUR REPORTS', href: '/user/id/user-report' },
    { icon: <User className="h-4 w-4" />, label: 'PROFILE', href: '/user/id/profile' },
  ]

  return (
    <nav className=" bg-white shadow-md ">
      <div className="container mx-auto px-4 py-3">
        <ul className="flex flex-wrap justify-between items-center -mb-px">
          {menuItems.map((item, index) => (
            <li key={index} className="mr-2">
              <Link href={item.href} passHref>
                <span
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium leading-5 transition duration-150 ease-in-out border-b-2 ${
                    pathname === item.href
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } focus:outline-none focus:text-gray-700 focus:border-gray-300`}
                >
                  {item.icon}
                  <span className="ml-2 hidden sm:inline">{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}