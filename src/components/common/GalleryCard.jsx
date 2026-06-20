import gallery1 from "../../assets/images/gallery1.jpg";
import gallery2 from "../../assets/images/gallery2.jpg";
import gallery3 from "../../assets/images/gallery3.jpg";
import gallery4 from "../../assets/images/gallery4.jpg";
import gallery5 from "../../assets/images/gallery5.jpg";
import gallery6 from "../../assets/images/gallery6.jpg";

const galleryImages = {
  "gallery1.jpg": gallery1,
  "gallery2.jpg": gallery2,
  "gallery3.jpg": gallery3,
  "gallery4.jpg": gallery4,
  "gallery5.jpg": gallery5,
  "gallery6.jpg": gallery6,
};

export default function GalleryCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-3xl shadow-lg cursor-pointer">
      <img
        src={galleryImages[item.image]}
        alt={item.title}
        className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
      />
    </div>
  );
}