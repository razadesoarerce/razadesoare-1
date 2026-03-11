import img1 from "../../../assets/poze/1.jpeg";
import img2 from "../../../assets/poze/2.jpeg";
import img3 from "../../../assets/poze/3.jpeg";
import img4 from "../../../assets/poze/4.jpeg";
import img5 from "../../../assets/poze/5.jpeg";
import img6 from "../../../assets/poze/6.jpeg";
import img7 from "../../../assets/poze/7.jpeg";
import img8 from "../../../assets/poze/8.jpeg";
import img9 from "../../../assets/poze/9.jpeg";
import img10 from "../../../assets/poze/10.jpeg";
import img11 from "../../../assets/poze/11.jpeg";
import img12 from "../../../assets/poze/12.jpeg";
import img13 from "../../../assets/poze/13.jpeg";
import img14 from "../../../assets/poze/14.jpeg";
import img15 from "../../../assets/poze/15.jpeg";
import img16 from "../../../assets/poze/16.jpeg";
import img17 from "../../../assets/poze/17.jpeg";

const photos = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9,
  img10, img11, img12, img13, img14, img15, img16, img17,
];

export const ALBUM_DEMO = {
  id: "demo",
  title: "1 Martie",
  cover: img1,
  photos: photos.map((src, i) => ({ id: i + 1, src, alt: `Foto ${i + 1}` })),
};

export default photos;
