"use client"

import { Authenticated, Unauthenticated, AuthLoading } from "convex/react"

import { useMutation, useQuery } from "convex/react"

import { api } from "../../convex/_generated/api"
import { Button } from "~/components/ui/button"
import { UnauthenticatedView } from "~/features/auth/components/unauthenticated-view"
import { AuthLoadingView } from "~/features/auth/components/auth-loading-view"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  const tasks = useQuery(api.projects.getProjects)
  const addTask = useMutation(api.projects.createProject)

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
