import RoomsPreview from "../components/home/RoomsPreview";
import GalleryPreview from "../components/home/GalleryPreview";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import About from "../components/home/About";
import Hero from "../components/home/Hero";
import BookingBar from "../components/home/BookingBar";
import Features from "../components/home/Features";

export default function Home() {
  return (
    <>
      <Hero />
      <BookingBar />
      <Features />
      <About />

      <RoomsPreview />
      <GalleryPreview />
      <Testimonials />
      <CTA />
    </>
  );
}