import React from "react";

import { cn } from "~/lib/utils";
import { ScrollReveal } from "~/components/ui/scroll-reveal";

type SceneBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

const SceneBackgroundContext =
  React.createContext<React.RefObject<HTMLElement | null> | null>(null);

export function useSceneBackgroundRef() {
  return React.useContext(SceneBackgroundContext);
}

export function SceneBackground({
  children,
  className,
  contentClassName,
}: SceneBackgroundProps) {
  const sceneRef = React.useRef<HTMLDivElement>(null);

  return (
    <SceneBackgroundContext.Provider value={sceneRef}>
      <section
        ref={sceneRef}
        className={cn(
          "relative overflow-hidden bg-[#f7f9fc] text-[#1e293b]",
          className
        )}
      >
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-50" />

        <svg
          width="358"
          height="483"
          viewBox="0 0 358 483"
          className="absolute top-0 left-0 z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_0_1)">
            <rect
              x="-86.9961"
              y="-33.114"
              width="72"
              height="541"
              rx="36"
              transform="rotate(-30.8182 -86.9961 -33.114)"
              fill="url(#paint0_linear_0_1)"
            />
          </g>
          <g filter="url(#filter1_f_0_1)">
            <rect
              x="-17"
              y="-135.113"
              width="50.0937"
              height="541"
              rx="25.0469"
              transform="rotate(-30.8182 -17 -135.113)"
              fill="url(#paint1_linear_0_1)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_0_1"
              x="-137.641"
              y="-120.646"
              width="440.285"
              height="602.787"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="32"
                result="effect1_foregroundBlur_0_1"
              />
            </filter>
            <filter
              id="filter1_f_0_1"
              x="-71.707"
              y="-215.486"
              width="429.598"
              height="599.69"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="32"
                result="effect1_foregroundBlur_0_1"
              />
            </filter>
            <linearGradient
              id="paint0_linear_0_1"
              x1="-50.9961"
              y1="-33.114"
              x2="-50.9961"
              y2="507.886"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#91bbfb" />
              <stop offset="1" stopColor="#E6F1FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_0_1"
              x1="8.04686"
              y1="-135.113"
              x2="8.04686"
              y2="405.887"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8dbafd" />
              <stop offset="1" stopColor="#c1d9f8" />
            </linearGradient>
          </defs>
        </svg>

        <ScrollReveal
          timelineRef={sceneRef}
          animationNum={5}
          className="absolute top-0 left-0 z-0 h-[600px] w-full bg-linear-to-b from-blue-50 via-blue-100 to-transparent opacity-100"
        />

        <div className={cn("relative z-10", contentClassName)}>{children}</div>
      </section>
    </SceneBackgroundContext.Provider>
  );
}
