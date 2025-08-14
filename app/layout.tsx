import type { Metadata } from "next";
import "./globals.css";
import { ListProvider } from "./provider/ListContext";


export const metadata: Metadata = {
  title: "Shopping List",
  description: "A simple shopping list application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ListProvider>{children}</ListProvider>
      </body>
    </html>
  );
}
