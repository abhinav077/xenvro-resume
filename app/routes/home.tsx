import { Header } from "~/components/layout/header";
import { SceneBackground } from "~/components/layout/scene-background";
import { HeroSection } from "~/components/sections/herosection";
import { useMediaQuery } from '~/hooks/use-media-query'
import type { Route } from "./+types/home";
import  { usePuterStore } from '~/lib/puter'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'



export function meta({}: Route.MetaArgs) {

  return [
    { title: "Xenvro" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  
  const { auth, isLoading } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

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
