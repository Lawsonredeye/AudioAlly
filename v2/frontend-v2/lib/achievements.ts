import { Trophy, Star, Music, Target, Zap, Crown, Flame, Globe, Calendar, Award } from "lucide-react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  criteria: number
  category: "playlists" | "tracks" | "genres" | "special" | "time"
  rarity: "common" | "rare" | "epic" | "legendary"
  unlocked: boolean
  progress?: number
  unlockedAt?: string
}

export const achievements: Achievement[] = [
  {
    id: "first_playlist",
    title: "Getting Started",
    description: "Create your very first playlist",
    icon: Music,
    criteria: 1,
    category: "playlists",
    rarity: "common",
    unlocked: true,
    unlockedAt: "2024-01-15",
  },
  {
    id: "playlist_creator",
    title: "Playlist Creator",
    description: "Create 5 playlists",
    icon: Target,
    criteria: 5,
    category: "playlists",
    rarity: "common",
    unlocked: true,
    progress: 12,
    unlockedAt: "2024-01-12",
  },
  {
    id: "music_enthusiast",
    title: "Music Enthusiast",
    description: "Create 10 playlists",
    icon: Star,
    criteria: 10,
    category: "playlists",
    rarity: "rare",
    unlocked: true,
    progress: 12,
    unlockedAt: "2024-01-10",
  },
  {
    id: "playlist_master",
    title: "Playlist Master",
    description: "Create 25 playlists",
    icon: Crown,
    criteria: 25,
    category: "playlists",
    rarity: "epic",
    unlocked: false,
    progress: 12,
  },
  {
    id: "playlist_legend",
    title: "Playlist Legend",
    description: "Create 50 playlists",
    icon: Trophy,
    criteria: 50,
    category: "playlists",
    rarity: "legendary",
    unlocked: false,
    progress: 12,
  },
  {
    id: "track_collector",
    title: "Track Collector",
    description: "Collect 100 tracks across all playlists",
    icon: Zap,
    criteria: 100,
    category: "tracks",
    rarity: "common",
    unlocked: true,
    progress: 118,
    unlockedAt: "2024-01-08",
  },
  {
    id: "music_library",
    title: "Music Library",
    description: "Collect 500 tracks across all playlists",
    icon: Award,
    criteria: 500,
    category: "tracks",
    rarity: "rare",
    unlocked: false,
    progress: 118,
  },
  {
    id: "genre_explorer",
    title: "Genre Explorer",
    description: "Explore 5 different genres",
    icon: Globe,
    criteria: 5,
    category: "genres",
    rarity: "rare",
    unlocked: false,
    progress: 4,
  },
  {
    id: "genre_master",
    title: "Genre Master",
    description: "Explore 10 different genres",
    icon: Flame,
    criteria: 10,
    category: "genres",
    rarity: "epic",
    unlocked: false,
    progress: 4,
  },
  {
    id: "early_adopter",
    title: "Early Adopter",
    description: "Join AudioAlly in its first month",
    icon: Calendar,
    criteria: 1,
    category: "special",
    rarity: "legendary",
    unlocked: true,
    unlockedAt: "2024-01-01",
  },
]

export const getRarityColor = (rarity: Achievement["rarity"]) => {
  switch (rarity) {
    case "common":
      return "text-gray-400 border-gray-600"
    case "rare":
      return "text-blue-400 border-blue-600"
    case "epic":
      return "text-purple-400 border-purple-600"
    case "legendary":
      return "text-yellow-400 border-yellow-600"
    default:
      return "text-gray-400 border-gray-600"
  }
}

export const getRarityBg = (rarity: Achievement["rarity"]) => {
  switch (rarity) {
    case "common":
      return "bg-gray-500/20"
    case "rare":
      return "bg-blue-500/20"
    case "epic":
      return "bg-purple-500/20"
    case "legendary":
      return "bg-yellow-500/20"
    default:
      return "bg-gray-500/20"
  }
}
