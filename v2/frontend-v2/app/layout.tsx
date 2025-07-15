import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "PlaylistCraft - Create Personalized Spotify Playlists",
    description:
        "Discover new music with AI-powered playlist creation. Select your preferences and get a personalized Spotify playlist instantly.",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
        <body className={inter.className}>{children}</body>
        </html>
    )
}
