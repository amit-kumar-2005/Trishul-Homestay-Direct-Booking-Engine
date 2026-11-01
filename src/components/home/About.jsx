
import aboutImage from "../../assets/images/about.jpg";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function About() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("/rooms");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className={`py-24 transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div>
            <img
              src={aboutImage}
              alt="About Trishul Homestay"
              className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-teal-700 font-semibold uppercase tracking-wider">
              About Us
            </span>

            <h2
              className={`text-4xl md:text-5xl font-bold mt-4 ${
                darkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Authentic Eco-Tourism
              <br />
              Experience
            </h2>

            <p
              className={`mt-6 text-lg leading-relaxed ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Trishul Homestay offers a peaceful retreat surrounded by
              nature, mountains, and local culture. Our mission is to
              provide travelers with a comfortable stay while supporting
              sustainable tourism and direct booking benefits.
            </p>

            <p
              className={`mt-4 text-lg leading-relaxed ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              By booking directly with us, guests enjoy better pricing,
              personalized hospitality, and an authentic local experience
              without third-party commissions.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { value: "500+", label: "Happy Guests" },
                { value: "0%", label: "OTA Commission" },
                { value: "Eco", label: "Tourism Focus" },
                { value: "24/7", label: "Guest Support" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`p-5 rounded-2xl shadow-sm ${
                    darkMode ? "bg-slate-800" : "bg-slate-50"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-teal-700">
                    {item.value}
                  </h3>
                  <p
                    className={
                      darkMode ? "text-slate-300" : "text-slate-600"
                    }
                  >
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Learn More Button */}
            <button
              type="button"
              onClick={handleLearnMore}
              className="mt-10 bg-teal-700 hover:bg-teal-800
                text-white px-8 py-4 rounded-full font-semibold
                transition duration-300 hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
