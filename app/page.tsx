import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Timeline from "@/components/Timeline";
import CaseStudies from "@/components/CaseStudies";
import ChatBox from "@/components/ChatBox";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ScrollToTop />
      <Header />
      <Hero />
      <About />
      <Timeline />
      <CaseStudies />
      <ChatBox />
      <Contact />
      <Footer />
    </main>
  );
}
