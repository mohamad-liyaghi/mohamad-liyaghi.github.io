import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Nav } from "./components/Nav";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { Work } from "./components/Work";
import { Writing } from "./components/Writing";

export default function App() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Projects />
        <About />
        <Stack />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
