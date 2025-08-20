
import { Geist, Geist_Mono, Jersey_15, Russo_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

const jersey15 = Jersey_15({
  weight: "400", 
  subsets: ["latin"],
});

const russoOne = Russo_One({
  weight: "400",
  subsets: ["cyrillic", "latin"], 
});

export const metadata = {
  title: "AvatarMaster",
  description: "Your app description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}



