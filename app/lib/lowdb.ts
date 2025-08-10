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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readWithRetry(db: Low<Data>, attempts = 5, delay = 25) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      await db.read();
      return;
    } catch (e: unknown) {
      lastErr = e;
      await sleep(delay);
    }
  }
  throw lastErr;
}

export async function getDb() {
    const filePath = process.env.LOWDB_PATH ?? path.join(process.cwd(), 'db.json');
    const adapter = new JSONFile<Data>(filePath);
    const db = new Low(adapter, initialItems);
    await readWithRetry(db);

    if (!db.data) db.data = initialItems;
    return db;
}