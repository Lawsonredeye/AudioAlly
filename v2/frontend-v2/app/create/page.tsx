"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Music, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const artists = [
  "Taylor Swift",
  "Drake",
  "The Weeknd",
  "Billie Eilish",
  "Ed Sheeran",
  "Ariana Grande",
  "Post Malone",
  "Dua Lipa",
  "Harry Styles",
  "Olivia Rodrigo",
  "Bad Bunny",
  "BTS",
  "Adele",
  "Justin Bieber",
  "Doja Cat",
  "Blanco",
  "Travis scott",
]

const genres = [
  "Uk Rap",
  "Pop",
  "Hip-Hop",
  "Rock",
  "Electronic",
  "R&B",
  "Country",
  "Jazz",
  "Classical",
  "Reggae",
  "Folk",
  "Blues",
  "Punk",
  "Metal",
  "Indie",
  "Alternative",
]

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "South Korea",
  "Brazil",
  "Mexico",
  "Sweden",
  "Norway",
  "Netherlands",
]

export default function CreatePlaylistPage() {
  const [selectedArtist, setSelectedArtist] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCreatePlaylist = async () => {
    if (!selectedArtist || !selectedGenre || !selectedCountry) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/create-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artist: selectedArtist,
          genre: selectedGenre,
          country: selectedCountry,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/playlist/${data.playlistId}`)
      }
    } catch (error) {
      console.error("Error creating playlist:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = selectedArtist && selectedGenre && selectedCountry

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
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Dashboard
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Create Your Playlist
            </h1>
            <p className="text-xl text-gray-400">
              Tell us your preferences and we'll craft the perfect playlist for you
            </p>
          </div>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Your Music Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="artist" className="text-lg font-medium">
                  Favorite Artist
                </Label>
                <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Choose your favorite artist" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {artists.map((artist) => (
                      <SelectItem key={artist} value={artist} className="text-white hover:bg-gray-700">
                        {artist}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-lg font-medium">
                  Preferred Genre
                </Label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select your preferred genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-lg font-medium">
                  Country/Region
                </Label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Choose your country/region" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="text-white hover:bg-gray-700">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleCreatePlaylist}
                disabled={!isFormValid || isLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold text-lg py-6 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Your Playlist...
                  </>
                ) : (
                  "Create My Playlist"
                )}
              </Button>

              {isFormValid && !isLoading && (
                <div className="text-center text-sm text-gray-400">
                  <p>
                    Based on: {selectedArtist} • {selectedGenre} • {selectedCountry}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
