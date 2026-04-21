"use client"

import { useEffect } from "react"

export default function DynarisWidget() {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_DYNARIS_API_KEY
    const voiceAgentId = process.env.NEXT_PUBLIC_DYNARIS_VOICE_AGENT_ID

    if (!apiKey) {
      console.warn("Dynaris widget is not initialized: NEXT_PUBLIC_DYNARIS_API_KEY is missing.")
      return
    }

    if (!voiceAgentId) {
      console.warn(
        "Dynaris voice is not enabled: NEXT_PUBLIC_DYNARIS_VOICE_AGENT_ID is missing."
      )
    }

    let controller: { destroy: () => void } | null | undefined

    import("@dynaris/widget")
      .then(({ init }) => {
        controller = init({
          apiKey,
          apiUrl: process.env.NEXT_PUBLIC_DYNARIS_API_URL || "https://api.dynaris.ai",
          voiceEnabled: Boolean(voiceAgentId),
          voiceAgentId,
          voiceCallLabel: "Talk to our AI",
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
