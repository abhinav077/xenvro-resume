import type React from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import SideDrawer from "~/components/ui/side-drawer";
import { ScrollReveal } from "~/components/ui/scroll-reveal";

type HeaderProps = {
  isMobile: boolean;
  timelineRef: React.RefObject<HTMLElement | null>;
};

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Pricing", href: "#" }
];

function BrandMark() {
  return (
    <Link to="/" className="flex items-center gap-3 cursor-pointer">
      <img
        src="/logo.png"
        alt="Xenvro Logo"
        className="w-10 h-10 object-contain"
      />

      <span
        className="
          text-2xl
          font-display
          tracking-tight
          text-slate-900
        "
      >
        Xenvro
      </span>
    </Link>
  );
}

function HeaderCta({ className = "" }: { className?: string }) {
  return (
    <a
      href="/upload"
      className={`inline-flex bg-neutral-900 text-white px-3 py-3 gap-1 items-center rounded-xl font-bold text-sm hover:cursor-pointer bg-[linear-gradient(135deg,#3b82f6,#bfdbfe,#60a5fa)] bg-[length:200%_200%] bg-left hover:bg-right transition-all duration-500 border border-blue-300 ${className}`}
      role="button"
    >
      Upload Resume <ChevronRight size={20} />
    </a>
  );
}

export function Header({ isMobile, timelineRef }: HeaderProps) {
  if (isMobile) {
    return (
      <div className="flex gap-4 justify-between items-center px-5 w-full pt-4">
        <SideDrawer
          direction="left"
          width={300}
          backgroundColor="#ffffff"
          clsBtnClassName="bg-neutral-800 border-r border-neutral-900 text-white"
          contentClassName="bg-white border-r border-neutral-200 text-black"
          btnClassName="bg-white text-black relative w-fit p-2 left-0 top-0 rounded-full shadow-xs border border-neutral-200"
        >
          <nav className="space-y-4">
            <BrandMark />
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block p-2 hover:bg-neutral-200 hover:text-black rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SideDrawer>
        <HeaderCta className="relative z-2" />
      </div>
    );
  }

  return (
    <header className="relative z-10 w-full max-w-7xl mx-auto p-2 mt-4">
      <ScrollReveal
        animationNum={1}
        timelineRef={timelineRef}
        className="bg-white/80 backdrop-blur-xl p-2 rounded-xl border border-white shadow-sm flex items-center justify-between"
      >
        <BrandMark />
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-700">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative transition-all duration-300 hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <HeaderCta />
      </ScrollReveal>
    </header>
  );
}
