import aboutImage from "../../assets/images/about.jpg";

export default function About() {
  return (
    <section className="py-24 bg-white">
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

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
              Authentic Eco-Tourism
              <br />
              Experience
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Trishul Homestay offers a peaceful retreat surrounded by
              nature, mountains, and local culture. Our mission is to
              provide travelers with a comfortable stay while supporting
              sustainable tourism and direct booking benefits.
            </p>

            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              By booking directly with us, guests enjoy better pricing,
              personalized hospitality, and an authentic local experience
              without third-party commissions.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div className="bg-slate-50 p-5 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-teal-700">
                  500+
                </h3>
                <p className="text-slate-600">
                  Happy Guests
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-teal-700">
                  0%
                </h3>
                <p className="text-slate-600">
                  OTA Commission
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-teal-700">
                  Eco
                </h3>
                <p className="text-slate-600">
                  Tourism Focus
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-teal-700">
                  24/7
                </h3>
                <p className="text-slate-600">
                  Guest Support
                </p>
              </div>

            </div>

            <button className="mt-10 bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-full font-semibold transition">
              Learn More
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}