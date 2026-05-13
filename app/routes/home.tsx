import { Header } from "~/components/layout/header";
import { SceneBackground } from "~/components/layout/scene-background";
import { HeroSection } from "~/components/sections/herosection";
import { useMediaQuery } from '~/hooks/use-media-query'
import type { Route } from "./+types/home";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Xenvro" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <main>
      <SceneBackground>
        <Header isMobile={isMobile} enableReveal />
        <HeroSection/>
      </SceneBackground>
    </main>
  )
}
