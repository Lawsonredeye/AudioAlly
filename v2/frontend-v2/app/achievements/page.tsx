"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music, ArrowLeft, Trophy, Target, Star, Zap } from "lucide-react"
import Link from "next/link"
import { achievements } from "@/lib/achievements"
import { AchievementCard } from "@/components/achievement-card"

const categories = [
  { id: "all", label: "All", icon: Trophy },
  { id: "playlists", label: "Playlists", icon: Music },
  { id: "tracks", label: "Tracks", icon: Zap },
  { id: "genres", label: "Genres", icon: Target },
  { id: "special", label: "Special", icon: Star },
]

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredAchievements =
    selectedCategory === "all"
      ? achievements
      : achievements.filter((achievement) => achievement.category === selectedCategory)

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-green-500" />
            <span className="text-xl font-bold">AudioAlly</span>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Achievements
          </h1>
          <p className="text-xl text-gray-400 mb-6">Track your progress and unlock rewards as you explore music</p>

          {/* Progress Summary */}
          <Card className="bg-gray-900 border-gray-800 max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-500">{unlockedCount}</div>
                  <div className="text-sm text-gray-400">Unlocked</div>
                </div>
                <div className="text-gray-600">/</div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400">{totalCount}</div>
                  <div className="text-sm text-gray-400">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id
                    ? "bg-green-500 text-black hover:bg-green-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            )
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} size="large" />
          ))}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No achievements found</h3>
            <p className="text-gray-500">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}
