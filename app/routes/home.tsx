import { Header } from "~/components/layout/header";
import { SceneBackground } from "~/components/layout/scene-background";
import { HeroSection } from "~/components/sections/herosection";
import { useMediaQuery } from '~/hooks/use-media-query'
import type { Route } from "./+types/home";
import  { usePuterStore } from '~/lib/puter'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'



export function meta({}: Route.MetaArgs) {

  const { auth} = usePuterStore();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!auth.isAuthenticated) navigate('/auth?next=/')
  }),[auth.isAuthenticated]


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
