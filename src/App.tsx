import { About } from "./components/About";
import { CommandPalette } from "./components/CommandPalette";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Toaster } from "./components/Toaster";
import { Work } from "./components/Work";
import { Writing } from "./components/Writing";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Work />
        <Writing />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <Toaster />
    </>
  );
}
