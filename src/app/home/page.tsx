import About from "../../slices/About";
import Footer from "../../slices/Footer";
import Hero from "../../slices/Hero";
import BigSection from "../../slices/TabSection";

export default async function Page() {
  return (
    <div className="relative">
      <Hero />
      <About />
      <BigSection />
      <Footer />
    </div>
  );
}
