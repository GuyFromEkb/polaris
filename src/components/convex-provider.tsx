"use client"

import { ConvexReactClient } from "convex/react"
import { FC, ReactNode } from "react"
import { useAuth } from "@clerk/nextjs"
import { ConvexProviderWithClerk } from "convex/react-clerk"

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export const ConvexProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
      {children}
    </ConvexProviderWithClerk>
  )
}
