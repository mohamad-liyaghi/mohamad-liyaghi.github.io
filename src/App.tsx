import { About } from "./components/About";
import { CommandPalette } from "./components/CommandPalette";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Identity } from "./components/Identity";
import { Intro } from "./components/Intro";
import { Nav } from "./components/Nav";
import { Progress } from "./components/Progress";
import { Projects } from "./components/Projects";
import { Stack } from "./components/Stack";
import { Work } from "./components/Work";
import { Writing } from "./components/Writing";

export default function App() {
  return (
    <>
      <Progress />
      <Nav />
      <div className="mx-auto w-full max-w-[72rem] px-6 sm:px-8 lg:px-10">
        <div className="lg:grid lg:grid-cols-[minmax(16.5rem,22rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <Identity />
          <div className="min-w-0">
            <main id="main">
              <Intro />
              <Work />
              <Projects />
              <About />
              <Stack />
              <Writing />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <CommandPalette />
    </>
  );
}
