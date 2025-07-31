import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

type Data = {
    items: { id: string; name: string, price: number, purchased: boolean }[];
};

const initialItems: Data = {
    items: [
        { id: "0", name: "Milk", price: 1, purchased: false },
        { id: "1", name: "Eggs", price: 3, purchased: false },
        { id: "2", name: "Self-Raising Flour", price: 1.5, purchased: false },
        { id: "3", name: "Butter", price: 3, purchased: false },
        { id: "4", name: "Sugar", price: 1, purchased: false },
        { id: "5", name: "Blueberries", price: 2, purchased: false },
        { id: "6", name: "Maple Syrup", price: 2, purchased: false },
    ]
}

export async function getDb() {
    const filePath = process.env.LOWDB_PATH ?? path.join(process.cwd(), 'db.json');
    const adapter = new JSONFile<Data>(filePath);
    const db = new Low(adapter, initialItems);
    await db.read();
    db.data ||= initialItems;
    await db.write();
    return db;
}