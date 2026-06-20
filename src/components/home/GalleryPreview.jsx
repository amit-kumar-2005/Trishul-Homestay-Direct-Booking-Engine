import galleryData from "../../data/gallery.json";
import GalleryCard from "../common/GalleryCard";

export default function GalleryPreview() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">

          <span className="text-teal-700 font-semibold uppercase tracking-wider">
            Gallery
          </span>

          <h2 className="text-5xl font-bold mt-3">
            Explore Trishul Homestay
          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {galleryData.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
            />
          ))}

        </div>

      </div>

    </section>
  );
}