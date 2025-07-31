import ShoppingList from "./components/ShoppingList";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col p-8 overflow-x-hidden">
      <ShoppingList />
    </main>
  );
}