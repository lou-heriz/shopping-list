import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '../../lib/lowdb'

export async function GET() {
    const db = await getDb()
    return NextResponse.json(db.data!.items)
}

export async function POST(req: NextRequest) {
    const items = await req.json()
    const db = await getDb()
    db.data!.items = items
    await db.write()
    return NextResponse.json(items, { status: 201 })
}

