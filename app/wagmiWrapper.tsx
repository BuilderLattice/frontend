"use client"
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { opBNBTestnet, opBNB, bscTestnet, bsc } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactNode } from 'react';
import ThemeProvider from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
    appName: 'Builder Lattice',
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
    chains: [bscTestnet, opBNBTestnet, opBNB, bsc],
    ssr: false,
});

const WagmiWrapper = ({ children }: Readonly<{
    children: ReactNode;
}>) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider coolMode>
                        <Navbar />
                        {children}
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </ThemeProvider>
    );
};

export default WagmiWrapper;