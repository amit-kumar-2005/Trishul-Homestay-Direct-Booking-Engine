export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">

        <div>
          <h3 className="text-2xl font-bold mb-4">
            Trishul Homestay
          </h3>
          <p className="text-slate-300">
            Experience nature, comfort and authentic
            hospitality with direct booking benefits.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li>Home</li>
            <li>Rooms</li>
            <li>Availability</li>
            <li>Book Now</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Contact
          </h3>

          <ul className="space-y-2 text-slate-300">
            <li>+91 9876543210</li>
            <li>info@trishulhomestay.com</li>
            <li>Uttarakhand, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">
            Follow Us
          </h3>

          <p className="text-slate-300">
            Facebook • Instagram • WhatsApp
          </p>
        </div>

      </div>

      <div className="border-t border-slate-800 py-5 text-center text-slate-400">
        © 2026 Trishul Homestay Direct Booking Engine
      </div>
    </footer>
  );
}