"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAvatars } from "@/contexts/avatar-context"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DEFAULT_AVATAR = {
  name: "",
  email: "",
  imageUrl: "/placeholder.svg?height=200&width=200",
}

// Sample avatar styles for quick selection
const AVATAR_STYLES = [
  { name: "Professional", url: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Casual", url: "https://randomuser.me/api/portraits/women/44.jpg" },
  { name: "Creative", url: "https://randomuser.me/api/portraits/men/22.jpg" },
  { name: "Abstract", url: "https://randomuser.me/api/portraits/women/68.jpg" },
]

export function AvatarModal({ isOpen, onClose, avatar, mode }) {
  const { addAvatar, updateAvatar } = useAvatars()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    imageUrl: DEFAULT_AVATAR.imageUrl,
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    imageUrl: "",
  })

  const [activeTab, setActiveTab] = useState("custom")

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && avatar) {
        setFormData({
          name: avatar.name,
          email: avatar.email,
          imageUrl: avatar.imageUrl,
        })
      } else {
        setFormData({
          name: "",
          email: "",
          imageUrl: DEFAULT_AVATAR.imageUrl,
        })
      }

      setErrors({
        name: "",
        email: "",
        imageUrl: "",
      })

      setActiveTab("custom")
    }
  }, [isOpen, avatar, mode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const selectAvatarStyle = (url) => {
    setFormData((prev) => ({ ...prev, imageUrl: url }))
    if (errors.imageUrl) {
      setErrors((prev) => ({ ...prev, imageUrl: "" }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "Name is required",
      email: formData.email
        ? /^\S+@\S+\.\S+$/.test(formData.email)
          ? ""
          : "Invalid email format"
        : "Email is required",
      imageUrl: formData.imageUrl ? "" : "Image URL is required",
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    if (mode === "create") {
      addAvatar(formData)
      toast({
        title: "Avatar created",
        description: `${formData.name} has been added to your avatars.`,
        variant: "default",
      })
    } else if (mode === "edit" && avatar) {
      updateAvatar({
        ...avatar,
        ...formData,
      })
      toast({
        title: "Avatar updated",
        description: `${formData.name} has been updated.`,
        variant: "default",
      })
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">{mode === "create" ? "Create New Avatar" : "Edit Avatar"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex justify-center">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-purple-500">
              <Image
                src={formData.imageUrl || "/placeholder.svg?height=200&width=200"}
                alt="Avatar preview"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target
                  target.src = "/placeholder.svg?height=200&width=200"
                }}
              />
            </div>
          </div>

          <Tabs defaultValue="custom" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="custom">Custom URL</TabsTrigger>
              <TabsTrigger value="presets">Quick Select</TabsTrigger>
            </TabsList>

            <TabsContent value="custom" className="space-y-4 pt-2">
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                  className={errors.imageUrl ? "border-red-500" : ""}
                />
                {errors.imageUrl && <p className="text-red-500 text-xs">{errors.imageUrl}</p>}
              </div>
            </TabsContent>

            <TabsContent value="presets" className="pt-2">
              <div className="grid grid-cols-2 gap-3">
                {AVATAR_STYLES.map((style) => (
                  <div
                    key={style.url}
                    className={`relative cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                      formData.imageUrl === style.url
                        ? "border-purple-500 shadow-md"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                    }`}
                    onClick={() => selectAvatarStyle(style.url)}
                  >
                    <div className="relative h-20 w-full">
                      <Image src={style.url || "/placeholder.svg"} alt={style.name} fill className="object-cover" />
                    </div>
                    <div className="text-xs p-1 text-center bg-white dark:bg-gray-800">{style.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              {mode === "create" ? "Create Avatar" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
