// localhost:3000/demo
"use client"

import { Button } from "~/components/ui/button"
import { useState } from "react"

export default function DemoPage() {
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)

  const handleBlocking = async () => {
    setLoading(true)
    await fetch("/api/demo/block", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ message: "как сделать рецепт лазании" }),
    })
    setLoading(false)
  }

  const handleBackground = async () => {
    setLoading2(true)
    await fetch("/api/demo/unblock", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ message: "как называется файл для middleware в next.js перейди по ссылке https://nextjs.org/docs/app/api-reference/file-conventions/proxy и прочитай" }),
    })
    setLoading2(false)
  }

  return (
    <div className="p-8 space-x-4">
      <Button disabled={loading} onClick={handleBlocking}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button disabled={loading2} onClick={handleBackground}>
        {loading2 ? "Loading..." : "Background"}
      </Button>
    </div>
  )
}
