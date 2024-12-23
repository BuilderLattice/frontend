"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Moon, Sun, Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi'


export function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const scrollDirection = useScrollDirection()

    const {isConnected} = useAccount()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 bg-background border-b transition-all duration-300 ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            Builder Lattice
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Tabs defaultValue="home">
                            <TabsList>
                                <TabsTrigger value="home">Home</TabsTrigger>
                                <TabsTrigger value="about">About</TabsTrigger>
                                <TabsTrigger value="services">Services</TabsTrigger>
                                <TabsTrigger value="contact">Contact</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <ConnectButton />
                        {isConnected ? (
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        ) : (
                             ""   
                        )}
                       
                    </div>
                </div>
            </div>
        </nav>
    )
}

