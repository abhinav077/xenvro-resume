import { HeroSection } from "~/components/sections/herosection";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Xenvro" },
    { name: "description", content: "Smart feedback for your resume" },
  ];
}

export default function Home() {
  return (
    <div>
      <HeroSection/>
    </div>
  )
}
