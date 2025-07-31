import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '../../../lib/lowdb';

export async function POST(req: NextRequest) {
    const item = await req.json();
    const db = await getDb();
    db.data!.items.push(item);
    await db.write();
    return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
    const updatedItem = await req.json()
    const db = await getDb()
    const index = db.data!.items.findIndex(item => item.id === updatedItem.id)

    if (index !== -1) {
        db.data!.items[index] = updatedItem
        await db.write()
        return NextResponse.json(updatedItem)
    }

    return NextResponse.json({ error: 'Item not found' }, { status: 404 })
}

export async function DELETE(req: NextRequest) {
    const { id } = await req.json()
    const db = await getDb()
    db.data!.items = db.data!.items.filter(item => item.id !== id)
    await db.write()
    return NextResponse.json({ success: true })
}