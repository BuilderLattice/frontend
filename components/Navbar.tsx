'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Address } from 'viem'
import { UserProfile } from '@/utils/types'
import { getUsersData } from '@/utils/getUsersData'

const routes = [
    { path: '/', label: 'Home', value: 'home' },
    { path: '/people', label: 'People', value: 'people' },
    { path: '/analAIse', label: '✨ analAIse', value: 'analAIse' },
    { path: '/privacy', label: 'Privacy', value: 'privacy' },
]

export function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const [userData, setUserData] = useState<UserProfile | null>(null)

    const { isConnected, address } = useAccount()

    const initialisePage = async () => {
        const _userData: UserProfile = (await getUsersData([{
            userAddress: address as Address,
            dataHash: address as string
        }]))[0];

        console.log("got user Data", _userData)
        setUserData(_userData)
    }
    useEffect(() => {
        if (isConnected)
            initialisePage()
    }, [isConnected])



    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const currentTab = routes.find(route => route.path === pathname)?.value || 'home'

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-bold">
                            Builder Lattice
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Tabs value={currentTab}>
                            <TabsList>
                                {routes.map((route) => (
                                    <Link key={route.value} href={route.path} passHref>
                                        <TabsTrigger value={route.value} asChild>
                                            <span>{route.label}</span>
                                        </TabsTrigger>
                                    </Link>
                                ))}
                            </TabsList>
                        </Tabs>
                        <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                            {theme === 'dark' ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                        <ConnectButton />
                        {isConnected ? (
                            <Link href={`/profile/${address}`}>
                                <Avatar>
                                        <AvatarImage src={`https://github.com/${userData?.githubUsername}.png`} alt={userData?.name} />
                                        <AvatarFallback><AvatarImage src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${userData?.name}`} /></AvatarFallback>
                                </Avatar>
                            </Link>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

