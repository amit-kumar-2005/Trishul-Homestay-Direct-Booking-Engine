export default function Availability() {
  return (
    <section className="pt-32 pb-20 px-5 bg-slate-50 min-h-screen">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Availability
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            Check Room Availability
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Select your preferred dates and check room availability
            before submitting a booking request.
          </p>

        </div>

        {/* Availability Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Check-In
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Check-Out
              </label>

              <input
                type="date"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Guests
              </label>

              <select className="w-full border rounded-xl px-4 py-3">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5 Guests</option>
              </select>
            </div>

          </div>

          <button className="mt-8 w-full md:w-auto bg-teal-700 text-white px-8 py-4 rounded-full hover:bg-teal-800 transition">
            Check Availability
          </button>

        </div>

      </div>

    </section>
  );
}