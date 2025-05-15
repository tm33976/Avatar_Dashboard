"use client"

import { useAvatars } from "@/contexts/avatar-context"
import AvatarCard from "./avatar-card"
import CreateAvatarButton from "./create-avatar-button"
import LoadingAvatars from "./loading-avatars"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function AvatarDashboard() {
  const { avatars, isLoading } = useAvatars()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAvatars, setFilteredAvatars] = useState(avatars)

  // Filter avatars based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredAvatars(avatars)
    } else {
      const term = searchTerm.toLowerCase()
      setFilteredAvatars(
        avatars.filter(
          (avatar) => avatar.name.toLowerCase().includes(term) || avatar.email.toLowerCase().includes(term),
        ),
      )
    }
  }, [searchTerm, avatars])

  // Show toast when avatars are loaded
  useEffect(() => {
    if (!isLoading && avatars.length > 0) {
      toast({
        title: "Avatars loaded",
        description: `Successfully loaded ${avatars.length} avatars.`,
        duration: 3000,
      })
    }
  }, [isLoading, avatars.length, toast])

  if (isLoading) {
    return <LoadingAvatars />
  }

  return (
    <div className="relative">
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Your Avatars</h2>

          <div className="relative mt-2 md:mt-0 w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search avatars..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 bg-white dark:bg-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvatars.length > 0 ? (
            filteredAvatars.map((avatar) => <AvatarCard key={avatar.id} avatar={avatar} />)
          ) : (
            <p className="text-gray-500 dark:text-gray-400 col-span-3">
              {searchTerm ? "No avatars match your search." : "No avatars found. Create one to get started!"}
            </p>
          )}
        </div>
      </section>

      <CreateAvatarButton />
    </div>
  )
}
