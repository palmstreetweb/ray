import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";
import Stories from "@/components/Stories";
import Press from "@/components/Press";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-grow">
        <Hero />
        <Intro />
        <Portfolio />
        <Stories />
        <Press />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
