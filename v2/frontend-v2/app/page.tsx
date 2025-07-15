import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Music, Sparkles, Globe, Users } from "lucide-react"

export default function HomePage() {
  return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Music className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold">AudioAlly</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/achievements">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Achievements
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-green-500 hover:bg-green-600 text-black font-semibold">Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Craft Your Perfect Playlist
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover new music tailored to your taste. Select your favorite artist, genre, and country, and we'll create
              a personalized Spotify playlist just for you.
            </p>
            <Link href="/create">
              <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold text-lg px-8 py-4 rounded-full"
              >
                Start Creating
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">Three simple steps to your perfect playlist</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Choose Your Preferences</h3>
                <p className="text-gray-400">
                  Select your favorite artist, preferred genre, and country to personalize your playlist
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Curation</h3>
                <p className="text-gray-400">
                  Our algorithm finds the perfect tracks that match your taste and preferences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 hover:border-green-500 transition-colors">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Instant Spotify Playlist</h3>
                <p className="text-gray-400">
                  Get a direct link to your new playlist on Spotify, ready to enjoy immediately
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-500 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-black mb-4">Ready to Discover New Music?</h2>
            <p className="text-xl text-black/80 mb-8">
              Join thousands of music lovers who've found their new favorite songs
            </p>
            <Link href="/create">
              <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white font-semibold text-lg px-8 py-4 rounded-full bg-transparent"
              >
                Create Your Playlist Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2024 PlaylistCraft. Powered by Spotify.</p>
          </div>
        </footer>
      </div>
  )
}
