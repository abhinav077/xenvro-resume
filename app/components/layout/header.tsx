import type React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { useSceneBackgroundRef } from "~/components/layout/scene-background";
import SideDrawer from "~/components/ui/side-drawer";
import { ScrollReveal } from "~/components/ui/scroll-reveal";
import { usePuterStore } from "~/lib/puter";

type HeaderProps = {
  isMobile: boolean;
  enableReveal?: boolean;
  timelineRef?: React.RefObject<HTMLElement | null>;
};

const navItems = [
  { label: "Home", href: "/" },
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
    <Link
      to="/upload"
      className={`inline-flex bg-neutral-900 text-white px-3 py-3 gap-1 items-center rounded-xl font-bold text-sm hover:cursor-pointer gradient-button ${className}`}
      role="button"
    >
      Upload Resume <ChevronRight size={20} />
    </Link>
  );
}

function HeaderAuthAction({
  className = "",
}: {
  className?: string;
}) {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();
  const next = encodeURIComponent(`${location.pathname}${location.search}`);

  if (isLoading) {
    return (
      <span
        className={`inline-flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold text-slate-500 ${className}`}
      >
        Checking...
      </span>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <button
        type="button"
        onClick={() => {
          void auth.signOut();
        }}
        className={`inline-flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-neutral-100 ${className}`}
      >
        Log Out
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => navigate(`/auth?next=${next}`)}
      className={`inline-flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-neutral-100 ${className}`}
    >
      Log In
    </button>
  );
}

export function Header({
  isMobile,
  enableReveal = false,
  timelineRef,
}: HeaderProps) {
  const sceneBackgroundRef = useSceneBackgroundRef();

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
              <Link
                key={item.label}
                to={item.href}
                className="block p-2 hover:bg-neutral-200 hover:text-black rounded-sm"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <HeaderAuthAction />
              <HeaderCta />
            </div>
          </nav>
        </SideDrawer>
        <div className="flex items-center gap-2">
          <HeaderAuthAction className="relative z-2" />
          <HeaderCta className="relative z-2" />
        </div>
      </div>
    );
  }

  const headerContent = (
    <div className="bg-white/80 backdrop-blur-xl p-2 rounded-xl border border-white shadow-sm flex items-center justify-between">
      <BrandMark />
      <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-700">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="relative transition-all duration-300 hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <HeaderAuthAction />
        <HeaderCta />
      </div>
    </div>
  );

  const revealRef = timelineRef ?? sceneBackgroundRef;

  return (
    <header className="relative z-10 w-full max-w-7xl mx-auto p-2 mt-4">
      {enableReveal && revealRef ? (
        <ScrollReveal animationNum={1} timelineRef={revealRef}>
          {headerContent}
        </ScrollReveal>
      ) : (
        headerContent
      )}
    </header>
  );
}
