import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HabitForge - Transform Habits Into Power",
  description: "Next-generation gamified habit tracker with 3D interactions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
