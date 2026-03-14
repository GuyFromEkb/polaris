import { NextRequest, NextResponse } from "next/server"
import { inngest } from "~/ingest/client"

export async function POST(req: NextRequest) {
  const body: { message: string } = await req.json()

  await inngest.send({
    name: "test/unblock",
    data: {
      message: body.message,
    },
  })

  return NextResponse.json("Event sent", { status: 200 })
}
