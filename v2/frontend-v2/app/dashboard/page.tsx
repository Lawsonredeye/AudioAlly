"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Music, Plus, ExternalLink, LogOut, Calendar, Clock, Trophy, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { achievements } from "@/lib/achievements"
import { AchievementCard } from "@/components/achievement-card"

// Demo user data
const demoUser = {
  username: "MusicLover2024",
  email: "demo@audioally.com",
  avatar: "/placeholder.svg?height=80&width=80",
  joinDate: "January 2024",
  totalPlaylists: 12,
  playlists: [
    {
      id: "1",
      name: "Taylor Swift Pop Mix",
      artist: "Taylor Swift",
      genre: "Pop",
      country: "United States",
      createdAt: "2024-01-15",
      trackCount: 30,
      spotifyUrl: "https://open.spotify.com/playlist/demo1",
    },
    {
      id: "2",
      name: "UK Rap Vibes",
      artist: "Stormzy",
      genre: "UK Rap",
      country: "United Kingdom",
      createdAt: "2024-01-12",
      trackCount: 25,
      spotifyUrl: "https://open.spotify.com/playlist/demo2",
    },
    {
      id: "3",
      name: "Drake Hip-Hop Collection",
      artist: "Drake",
      genre: "Hip-Hop",
      country: "Canada",
      createdAt: "2024-01-10",
      trackCount: 35,
      spotifyUrl: "https://open.spotify.com/playlist/demo3",
    },
    {
      id: "4",
      name: "Electronic Beats",
      artist: "Calvin Harris",
      genre: "Electronic",
      country: "United Kingdom",
      createdAt: "2024-01-08",
      trackCount: 28,
      spotifyUrl: "https://open.spotify.com/playlist/demo4",
    },
  ],
}

export default function DashboardPage() {
  const [user, setUser] = useState(demoUser)
  const router = useRouter()
  const [achievementIndex, setAchievementIndex] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("username")
    router.push("/")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const recentAchievements = unlockedAchievements.slice(0, 6) // Show recent 6

  const nextAchievement = () => {
    setAchievementIndex((prev) => (prev >= recentAchievements.length - 1 ? 0 : prev + 1))
  }

  const prevAchievement = () => {
    setAchievementIndex((prev) => (prev <= 0 ? recentAchievements.length - 1 : prev - 1))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-green-500" />
            <span className="text-xl font-bold">AudioAlly</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/create">
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create Playlist
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="ghost" className="text-gray-400 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                  <AvatarFallback className="bg-green-500 text-black text-2xl font-bold">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <p className="text-gray-400 mb-4">{user.email}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Music className="w-4 h-4" />
                      <span>{user.totalPlaylists} playlists created</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500 mb-1">{user.totalPlaylists}</div>
              <div className="text-sm text-gray-400">Total Playlists</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500 mb-1">
                {user.playlists.reduce((total, playlist) => total + playlist.trackCount, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Tracks</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-green-500 mb-1">
                {new Set(user.playlists.map((p) => p.genre)).size}
              </div>
              <div className="text-sm text-gray-400">Genres Explored</div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Achievements</h2>
            <Link href="/achievements">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                View All
              </Button>
            </Link>
          </div>

          {recentAchievements.length > 0 ? (
            <div className="relative">
              {/* Desktop Carousel */}
              <div className="hidden md:block">
                <div className="grid grid-cols-3 gap-4">
                  {recentAchievements.slice(0, 3).map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} size="medium" />
                  ))}
                </div>
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={prevAchievement}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white flex-shrink-0"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <div className="flex-1">
                    <AchievementCard achievement={recentAchievements[achievementIndex]} size="small" />
                  </div>

                  <Button
                    onClick={nextAchievement}
                    variant="ghost"
                    size="icon"
                    className="text-gray-400 hover:text-white flex-shrink-0"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center mt-4 gap-2">
                  {recentAchievements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setAchievementIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === achievementIndex ? "bg-green-500" : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-8 text-center">
                <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-400 mb-2">No achievements yet</h3>
                <p className="text-gray-500">Create your first playlist to start earning achievements!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Playlists Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Playlists</h2>
            <Link href="/create">
              <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.playlists.map((playlist) => (
              <Card key={playlist.id} className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
                <CardHeader>
                  <div className="w-full h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Music className="w-12 h-12 text-black" />
                  </div>
                  <CardTitle className="text-lg">{playlist.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Artist:</span>
                      <span>{playlist.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Genre:</span>
                      <Badge variant="secondary" className="bg-gray-800 text-green-500">
                        {playlist.genre}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Country:</span>
                      <span>{playlist.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tracks:</span>
                      <span>{playlist.trackCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created:</span>
                      <span>{formatDate(playlist.createdAt)}</span>
                    </div>
                  </div>

                  <Link href={playlist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open in Spotify
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
