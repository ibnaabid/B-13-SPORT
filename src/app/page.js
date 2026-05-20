import Image from "next/image";
import HeroSection from "./Hero/page";
import WhyChoose from "./WhyChoose/page";
import PopularSection from "./PopularCard/page";

export default function Home() {
  return (
  <>
  <HeroSection></HeroSection>
  <PopularSection></PopularSection>
  <WhyChoose></WhyChoose>
  
  </>
  );
}
