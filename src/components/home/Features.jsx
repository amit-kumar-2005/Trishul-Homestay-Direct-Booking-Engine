export default function Features() {
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

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md p-8 text-center"
            >
              <h3 className="text-3xl font-bold text-teal-700">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {item.subtitle}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}