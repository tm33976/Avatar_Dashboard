"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AvatarModal } from "./avatar-modal"

export default function CreateAvatarButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 shadow-lg rounded-full h-14 w-14 p-0 flex items-center justify-center transition-all duration-300 hover:scale-110 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus className="h-6 w-6" />
        <span className="sr-only">Create New Avatar</span>
      </Button>

      <AvatarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode="create" />
    </>
  )
}
