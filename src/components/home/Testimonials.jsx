import reviews from "../../data/reviews.json";
import { useTheme } from "../../context/ThemeContext";

export default function Testimonials() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900"
          : "bg-slate-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-teal-700 font-semibold uppercase">
            Testimonials
          </p>

          <h2
            className={`text-5xl font-bold mt-3 ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            What Our Guests Say
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.id}
              className={`p-8 rounded-3xl shadow-md ${
                darkMode
                  ? "bg-slate-800"
                  : "bg-white"
              }`}
            >
              <div className="text-yellow-500 text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p
                className={`mb-6 ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }`}
              >
                "{review.review}"
              </p>

              <h3
                className={`font-bold text-lg ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}