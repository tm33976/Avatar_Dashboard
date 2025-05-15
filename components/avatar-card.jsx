"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar } from "lucide-react"
import { AvatarModal } from "./avatar-modal"
import { useAvatars } from "@/contexts/avatar-context"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatDistanceToNow } from "date-fns"

export default function AvatarCard({ avatar }) {
  const { deleteAvatar } = useAvatars()
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = () => {
    deleteAvatar(avatar.id)
    toast({
      title: "Avatar deleted",
      description: `${avatar.name} has been removed.`,
      variant: "destructive",
    })
  }

  const lastUpdated = formatDistanceToNow(new Date(avatar.updatedAt), { addSuffix: true })

  return (
    <>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <Image
              src={avatar.imageUrl || "/placeholder.svg?height=200&width=200"}
              alt={`Avatar of ${avatar.name}`}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                const target = e.target
                target.src = "/placeholder.svg?height=200&width=200"
              }}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{avatar.name}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">{avatar.email}</p>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Updated {lastUpdated}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 transition-colors hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
            onClick={() => setIsModalOpen(true)}
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </CardFooter>
      </Card>

      <AvatarModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} avatar={avatar} mode="edit" />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the avatar for {avatar.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600 transition-colors">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
