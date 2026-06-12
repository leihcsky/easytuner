import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

const navItems = [
  { href: "/", label: "Guitar" },
  { href: "/bass-tuner", label: "Bass" },
  { href: "/ukulele-tuner", label: "Ukulele" },
  { href: "/violin-tuner", label: "Violin" },
  { href: "/guides", label: "Guides" },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" aria-label="EasyTuner home">
          <Logo />
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex sm:hidden items-center gap-4">
          {navItems.slice(0, 3).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-medium text-gray-600 hover:text-brand-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
