import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { type Achievement, getRarityColor, getRarityBg } from "@/lib/achievements"
import { Lock } from "lucide-react"

interface AchievementCardProps {
  achievement: Achievement
  size?: "small" | "medium" | "large"
}

export function AchievementCard({ achievement, size = "medium" }: AchievementCardProps) {
  const IconComponent = achievement.icon
  const rarityColor = getRarityColor(achievement.rarity)
  const rarityBg = getRarityBg(achievement.rarity)

  const progressPercentage = achievement.progress
    ? Math.min((achievement.progress / achievement.criteria) * 100, 100)
    : 0

  const cardSize = {
    small: "p-4",
    medium: "p-6",
    large: "p-8",
  }

  const iconSize = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  }

  return (
    <Card
      className={`bg-gray-900 border-gray-800 ${achievement.unlocked ? `border-2 ${rarityColor.split(" ")[1]}` : "opacity-75"} transition-all hover:scale-105`}
    >
      <CardContent className={cardSize[size]}>
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Icon */}
          <div className={`${iconSize[size]} ${rarityBg} rounded-full flex items-center justify-center relative`}>
            {achievement.unlocked ? (
              <IconComponent className={`${iconSize[size]} ${rarityColor.split(" ")[0]}`} />
            ) : (
              <Lock className={`${iconSize[size]} text-gray-500`} />
            )}
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h3
              className={`font-bold ${size === "small" ? "text-sm" : size === "medium" ? "text-lg" : "text-xl"} ${achievement.unlocked ? "text-white" : "text-gray-400"}`}
            >
              {achievement.title}
            </h3>
            <p className={`text-gray-400 ${size === "small" ? "text-xs" : "text-sm"}`}>{achievement.description}</p>
          </div>

          {/* Rarity Badge */}
          <Badge
            variant="outline"
            className={`${rarityColor} bg-transparent capitalize ${size === "small" ? "text-xs" : "text-sm"}`}
          >
            {achievement.rarity}
          </Badge>

          {/* Progress Bar (for unlocked achievements with progress or locked achievements) */}
          {achievement.progress !== undefined && !achievement.unlocked && (
            <div className="w-full space-y-2">
              <Progress value={progressPercentage} className="h-2 bg-gray-800" />
              <p className="text-xs text-gray-400">
                {achievement.progress}/{achievement.criteria}
              </p>
            </div>
          )}

          {/* Unlocked Date */}
          {achievement.unlocked && achievement.unlockedAt && size !== "small" && (
            <p className="text-xs text-gray-500">Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
