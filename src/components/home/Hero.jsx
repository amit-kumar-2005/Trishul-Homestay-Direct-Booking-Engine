import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-top md:bg-center flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-white">

        {/* Badge */}
        <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm">
          Eco Tourism • Nature Retreat
        </span>

        {/* Heading */}
        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mt-6 leading-tight max-w-4xl">
          Experience Nature,
          <br />
          Not Just A Stay
        </h1>

        {/* Description */}
        <p className="max-w-2xl mt-6 text-base md:text-lg lg:text-xl text-slate-200">
          Book directly with Trishul Homestay and enjoy authentic
          eco-tourism experiences, peaceful accommodation,
          and zero OTA commission.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">

          <button className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 transition duration-300 px-6 py-3 rounded-full font-semibold">
            Explore Rooms
          </button>

          <button className="w-full sm:w-auto border border-white hover:bg-white hover:text-black transition duration-300 px-6 py-3 rounded-full font-semibold">
            Check Availability
          </button>

        </div>

      </div>
    </section>
  );
}