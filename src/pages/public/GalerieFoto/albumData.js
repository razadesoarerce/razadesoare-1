// Album "1 Martie" – photos from src/assets/poze/1 martie/
import img1m1 from "../../../assets/poze/1 martie/1.jpeg";
import img1m2 from "../../../assets/poze/1 martie/2.jpeg";
import img1m3 from "../../../assets/poze/1 martie/3.jpeg";
import img1m4 from "../../../assets/poze/1 martie/4.jpeg";
import img1m5 from "../../../assets/poze/1 martie/5.jpeg";
import img1m6 from "../../../assets/poze/1 martie/6.jpeg";
import img1m7 from "../../../assets/poze/1 martie/7.jpeg";
import img1m8 from "../../../assets/poze/1 martie/8.jpeg";
import img1m9 from "../../../assets/poze/1 martie/9.jpeg";
import img1m10 from "../../../assets/poze/1 martie/10.jpeg";
import img1m11 from "../../../assets/poze/1 martie/11.jpeg";
import img1m12 from "../../../assets/poze/1 martie/12.jpeg";
import img1m13 from "../../../assets/poze/1 martie/13.jpeg";
import img1m14 from "../../../assets/poze/1 martie/14.jpeg";
import img1m15 from "../../../assets/poze/1 martie/15.jpeg";
import img1m16 from "../../../assets/poze/1 martie/16.jpeg";
import img1m17 from "../../../assets/poze/1 martie/17.jpeg";
import img8m1 from "../../../assets/poze/8 martie/1.jpeg";

const photos1Martie = [
  img1m1, img1m2, img1m3, img1m4, img1m5, img1m6, img1m7, img1m8, img1m9,
  img1m10, img1m11, img1m12, img1m13, img1m14, img1m15, img1m16, img1m17,
];

export const ALBUM_1_MARTIE = {
  id: "1-martie",
  title: "1 Martie",
  cover: img1m1,
  photos: photos1Martie.map((src, i) => ({ id: i + 1, src, alt: `1 Martie – Foto ${i + 1}` })),
};

const photos8Martie = [img8m1];

export const ALBUM_8_MARTIE = {
  id: "8-martie",
  title: "8 Martie",
  cover: img8m1,
  photos: photos8Martie.map((src, i) => ({ id: i + 1, src, alt: `8 Martie – Foto ${i + 1}` })),
};

export const ALBUMS = [ALBUM_1_MARTIE, ALBUM_8_MARTIE];

/** @deprecated Use ALBUM_1_MARTIE or ALBUMS instead */
export const ALBUM_DEMO = ALBUM_1_MARTIE;

export default ALBUMS;
