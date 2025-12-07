// import type { Metadata } from "next";
// import { AppProvider } from "@/provider/AppContextt";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "OneFit",
//   description: "Manage your fashion orders and grow your tailoring business",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <AppProvider>{children}</AppProvider>
//       </body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from "next";
import { AppProvider } from "@/provider/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneFit Vendors",
  description: "Vendor dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
