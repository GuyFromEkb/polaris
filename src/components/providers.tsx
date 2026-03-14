import { ClerkProvider } from "@clerk/nextjs"
import { FC, ReactNode } from "react"
import { ConvexProvider } from "~/components/convex-provider"
import { ThemeProvider } from "~/components/theme-provider"

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <ConvexProvider>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </ConvexProvider>
    </ClerkProvider>
  )
}
