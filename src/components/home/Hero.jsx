import heroImage from "../../assets/images/hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative h-[85vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/45"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 text-white">

        <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm">
          Eco Tourism • Nature Retreat
        </span>

        <h1 className="text-6xl md:text-7xl font-bold mt-6 leading-tight">
          Experience Nature,
          <br />
          Not Just A Stay
        </h1>

        <p className="max-w-2xl mt-6 text-xl text-slate-200">
          Book directly with Trishul Homestay and enjoy authentic
          eco-tourism experiences, peaceful accommodation,
          and zero OTA commission.
        </p>

        <div className="flex gap-4 mt-8">
          <button className="bg-teal-700 hover:bg-teal-800 px-8 py-4 rounded-full font-semibold">
            Explore Rooms
          </button>

          <button className="border border-white px-8 py-4 rounded-full font-semibold">
            Check Availability
          </button>
        </div>

      </div>
    </section>
  );
}