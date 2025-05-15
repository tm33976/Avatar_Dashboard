"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create context
const AvatarContext = createContext(undefined)

// Initial mock data
const INITIAL_AVATARS = [
  {
    id: 1,
    name: "Rahul ",
    email: "rahul.singh@example.com",
    imageUrl: "https://images.unsplash.com/photo-1659421614911-e77b65eb368a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwbWVufGVufDB8MHwwfHx8MA%3D%3D",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    name: "Taylor Swift",
    email: "taylor.swift@example.com",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    name: "Rishi",
    email: "rishi.mishra@example.com",
    imageUrl: "https://plus.unsplash.com/premium_photo-1722682240098-735ac6efef2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function AvatarProvider({ children }) {
  const [avatars, setAvatars] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load avatars from localStorage on initial render
  useEffect(() => {
    const loadAvatars = async () => {
      try {
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const savedAvatars = localStorage.getItem("avatars")
        if (savedAvatars) {
          setAvatars(JSON.parse(savedAvatars))
        } else {
          // Use initial data if nothing in localStorage
          setAvatars(INITIAL_AVATARS)
          localStorage.setItem("avatars", JSON.stringify(INITIAL_AVATARS))
        }
      } catch (error) {
        console.error("Error loading avatars:", error)
        setAvatars(INITIAL_AVATARS)
      } finally {
        setIsLoading(false)
      }
    }

    loadAvatars()
  }, [])

  // Save avatars to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("avatars", JSON.stringify(avatars))
    }
  }, [avatars, isLoading])

  // Add a new avatar
  const addAvatar = (avatar) => {
    const newId = avatars.length > 0 ? Math.max(...avatars.map((a) => a.id)) + 1 : 1
    const now = new Date().toISOString()

    setAvatars((prev) => [
      ...prev,
      {
        ...avatar,
        id: newId,
        createdAt: now,
        updatedAt: now,
      },
    ])
  }

  // Update an existing avatar
  const updateAvatar = (updatedAvatar) => {
    setAvatars((prev) =>
      prev.map((avatar) =>
        avatar.id === updatedAvatar.id ? { ...updatedAvatar, updatedAt: new Date().toISOString() } : avatar,
      ),
    )
  }

  // Delete an avatar
  const deleteAvatar = (id) => {
    setAvatars((prev) => prev.filter((avatar) => avatar.id !== id))
  }

  return (
    <AvatarContext.Provider
      value={{
        avatars,
        isLoading,
        addAvatar,
        updateAvatar,
        deleteAvatar,
      }}
    >
      {children}
    </AvatarContext.Provider>
  )
}

export function useAvatars() {
  const context = useContext(AvatarContext)
  if (context === undefined) {
    throw new Error("useAvatars must be used within an AvatarProvider")
  }
  return context
}
