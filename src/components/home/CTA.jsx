import { useTheme } from "../../context/ThemeContext";

export default function CTA() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-950"
          : "bg-teal-700"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 text-center text-white">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready For Your Next Nature Escape?
        </h2>

        <p
          className={`text-lg md:text-xl max-w-3xl mx-auto ${
            darkMode
              ? "text-slate-300"
              : "text-teal-100"
          }`}
        >
          Book directly with Trishul Homestay and enjoy
          better pricing, personalized hospitality,
          and a peaceful eco-tourism experience.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-10">

          <button className="bg-white text-teal-700 px-8 py-4 rounded-full font-semibold hover:scale-105 transition">
            Check Availability
          </button>

          <button className="border border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-slate-900 transition">
            Contact Us
          </button>

        </div>

      </div>
    </section>
  );
}