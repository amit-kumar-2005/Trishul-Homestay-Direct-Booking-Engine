import { useTheme } from "../../context/ThemeContext";

export default function Features() {
  const { darkMode } = useTheme();

  const features = [
    {
      title: "500+",
      subtitle: "Happy Guests",
    },
    {
      title: "4.9 Rating",
      subtitle: "Guest Satisfaction",
    },
    {
      title: "0% Commission",
      subtitle: "Direct Booking",
    },
    {
      title: "24/7",
      subtitle: "Guest Support",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {features.map((item, index) => (
            <div
              key={index}
              className={`rounded-3xl p-8 text-center transition-all duration-300 shadow-md ${
                darkMode
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-900"
              }`}
            >
              <h3 className="text-3xl font-bold text-teal-700">
                {item.title}
              </h3>

              <p
                className={`mt-3 ${
                  darkMode
                    ? "text-slate-300"
                    : "text-slate-600"
                }`}
              >
                {item.subtitle}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}