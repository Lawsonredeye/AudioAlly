import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music, ExternalLink, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

// This would normally come from your database or API
const getPlaylistData = (id: string) => {
  return {
    id,
    name: "Your Personalized Mix",
    description: "A curated playlist based on your preferences",
    spotifyUrl: `https://open.spotify.com/playlist/${id}`,
    trackCount: 30,
    duration: "2h 15m",
    artist: "Taylor Swift",
    genre: "Pop",
    country: "United States",
  }
}

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const playlist = getPlaylistData(params.id)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Music className="w-8 h-8 text-green-500" />
            <span className="text-xl font-bold">PlaylistCraft</span>
          </Link>
          <Link href="/create">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Create Another
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Playlist Created Successfully!
            </h1>
            <p className="text-xl text-gray-400">Your personalized playlist is ready on Spotify</p>
          </div>

          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Music className="w-16 h-16 text-black" />
              </div>
              <CardTitle className="text-2xl">{playlist.name}</CardTitle>
              <p className="text-gray-400">{playlist.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-500">{playlist.trackCount}</div>
                  <div className="text-sm text-gray-400">Tracks</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-500">{playlist.duration}</div>
                  <div className="text-sm text-gray-400">Duration</div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Based on your preferences:</h3>
                <div className="space-y-1 text-sm text-gray-400">
                  <p>
                    <span className="text-white">Artist:</span> {playlist.artist}
                  </p>
                  <p>
                    <span className="text-white">Genre:</span> {playlist.genre}
                  </p>
                  <p>
                    <span className="text-white">Country:</span> {playlist.country}
                  </p>
                </div>
              </div>

              <Link href={playlist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold text-lg py-6 rounded-full">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Open in Spotify
                </Button>
              </Link>

              <div className="text-center">
                <Link href="/create">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                    Create Another Playlist
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500">
            <p>Playlist will be available in your Spotify library</p>
          </div>
        </div>
      </div>
    </div>
  )
}
