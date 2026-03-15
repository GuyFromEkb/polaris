import { ConvexError, v } from "convex/values"
import { query, mutation } from "./_generated/server"

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return []
    }

    return await ctx.db
      .query("projects")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .collect()
  },
})

export const createProject = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const newProjectName = args.name
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError({ message: "Not authenticated" })
    }

    const newProjectId = await ctx.db.insert("projects", {
      name: newProjectName,
      ownerId: identity.subject,
      updatedAt: +new Date(),
    })

    return newProjectId
  },
})
