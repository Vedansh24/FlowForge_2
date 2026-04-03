import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlowForge",
  description: "Manage projects, control workflows, scale teams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
