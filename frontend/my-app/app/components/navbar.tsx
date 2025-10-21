'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b bg-background sticky top-0 z-50">
      <Link href="/" className="text-lg font-semibold">
        AI ChatApp
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-6">
          <NavigationMenuItem>
            <Link href="/" className="hover:text-primary transition">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/chat" className="hover:text-primary transition">Chat</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" className="hover:text-primary transition">About</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button asChild variant="outline">
        <Link href="/chat">Get Started</Link>
      </Button>
    </nav>
  );
}
