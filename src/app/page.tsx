"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"

import { useMutation, useQuery } from "convex/react"
import { useChat } from "@ai-sdk/react"
import { api } from "../../convex/_generated/api"
import { Button } from "~/components/ui/button"
import { UnauthenticatedView } from "~/features/auth/components/unauthenticated-view"
import { AuthLoadingView } from "~/features/auth/components/auth-loading-view"
import { UserButton } from "@clerk/nextjs"
import { useState } from "react"

export default function Home() {
  const tasks = useQuery(api.projects.getProjects)
  const addTask = useMutation(api.projects.createProject)

  const [input, setInput] = useState("")
  const { messages, sendMessage } = useChat()

  return (
    <>
      <Authenticated>
        <UserButton />

        <div>
          <Button
            onClick={() => {
              addTask({ name: "Project" + new Date().getMilliseconds() })
            }}
          >
            Add Project
          </Button>
          <div className="flex flex-col items-center gap-1 justify-between p-24">
            {tasks?.map(({ _id, name, ownerId }) => (
              <div className="bg-gray-400 p-4 text-amber-50" key={_id}>
                <div className="flex flex-col gap-1.5">
                  <span>{name}</span>
                  <span>{ownerId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
          {messages.map((message) => (
            <div key={message.id} className="whitespace-pre-wrap">
              {message.role === "user" ? "User: " : "AI: "}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>
                }
              })}
            </div>
          ))}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage({ text: input })
              setInput("")
            }}
          >
            <input
              className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.currentTarget.value)}
            />
          </form>
        </div>
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedView />
      </Unauthenticated>
      <AuthLoading>
        <AuthLoadingView />
      </AuthLoading>
    </>
  )
}
