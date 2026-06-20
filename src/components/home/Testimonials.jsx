import reviews from "../../data/reviews.json";

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-teal-700 font-semibold uppercase">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold mt-3">
            What Our Guests Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl shadow-md"
            >
              <div className="text-yellow-500 text-xl mb-4">
                ⭐⭐⭐⭐⭐
              </div>

              <p className="text-slate-600 mb-6">
                "{review.review}"
              </p>

              <h3 className="font-bold text-lg">
                {review.name}
              </h3>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}