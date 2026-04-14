"use client"

import { useEffect } from "react"

export default function DynarisWidget() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DYNARIS_API_KEY

    if (!apiKey) {
      console.warn("Dynaris widget is not initialized: NEXT_PUBLIC_DYNARIS_API_KEY is missing.")
      return
    }

    let controller: { destroy: () => void } | undefined

    import("@dynaris/widget")
      .then(({ init }) => {
        controller = init({
          apiKey,
          apiUrl: process.env.NEXT_PUBLIC_DYNARIS_API_URL || "https://api.dynaris.ai",
          title: "Chat Support",
          subtitle: "AI assistant",
          welcomeMessage: "Hi! How can I help you today?",
          position: "bottom-right",
        })
      })
      .catch((error) => {
        console.error("Failed to initialize Dynaris widget.", error)
      })

    return () => {
      controller?.destroy()
    }
  }, [])

  return null
}
