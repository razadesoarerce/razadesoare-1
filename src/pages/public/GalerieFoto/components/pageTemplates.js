/**
 * Generator de layout album. Primește doar pozele din pool (fără hero).
 * Sortează în portrait, landscape, pătrate. Pătratele la final.
 * Returnează { layout, photos }[] – asignare directă, fără slicing.
 */

/**
 * Clasifică orientarea: folosește orientationMap (de la DOM img onLoad) când există,
 * altfel "unknown" (tratăm ca square în layout).
 */
export function classify(photo, index, orientationMap = {}) {
  if (orientationMap[index]) {
    return orientationMap[index];
  }
  return "square";
}

export function buildPageConfigs(photos, orientationMap = {}) {
  if (!photos.length) return [];

  const portraits = [];
  const landscapes = [];
  const squares = [];

  photos.forEach((photo, index) => {
    const type = classify(photo, index, orientationMap);
    if (type === "portrait") portraits.push(photo);
    else if (type === "landscape") landscapes.push(photo);
    else squares.push(photo);
  });

  const pages = [];
  let toggle = "portrait";

  // 1. Epuizare portrait și landscape: doar perechi (B/A), fără niciun square. Alternanță când ambele cozi au ≥2.
  while (portraits.length >= 2 || landscapes.length >= 2) {
    let added = false;
    if (toggle === "portrait" && portraits.length >= 2) {
      pages.push({
        layout: "B",
        photos: [portraits.shift(), portraits.shift()],
      });
      toggle = "landscape";
      added = true;
    } else if (toggle === "landscape" && landscapes.length >= 2) {
      pages.push({
        layout: "A",
        photos: [landscapes.shift(), landscapes.shift()],
      });
      toggle = "portrait";
      added = true;
    }
    if (!added) {
      if (portraits.length >= 2) {
        pages.push({
          layout: "B",
          photos: [portraits.shift(), portraits.shift()],
        });
        toggle = "landscape";
      } else if (landscapes.length >= 2) {
        pages.push({
          layout: "A",
          photos: [landscapes.shift(), landscapes.shift()],
        });
        toggle = "portrait";
      } else {
        break;
      }
    }
  }

  // 2. Un portrait rămas: 1 portrait + 2 pătrate (vertical) dacă avem ≥2 pătrate, altfel 1 pagină A.
  if (portraits.length === 1) {
    if (squares.length >= 2) {
      pages.push({
        layout: "P1",
        photos: [portraits.shift(), squares.shift(), squares.shift()],
      });
    } else {
      pages.push({
        layout: "A",
        photos: [portraits.shift()],
        singleOrientation: "portrait",
      });
    }
  }

  // 3. Un landscape rămas: 1 landscape + 2 pătrate pe orizontală (același plan), în 2 frame-uri square; dacă avem ≥2 pătrate, altfel 1 pagină A.
  if (landscapes.length === 1) {
    if (squares.length >= 2) {
      pages.push({
        layout: "L1",
        photos: [landscapes.shift(), squares.shift(), squares.shift()],
      });
    } else {
      pages.push({
        layout: "A",
        photos: [landscapes.shift()],
        singleOrientation: "landscape",
      });
    }
  }

  // 4. Toate pătratele rămase la final: 4 → o pagină cu 4 frame-uri (SQUARE_4), 3 → 3 frame-uri (SQUARE_3), 2 → SQUARE_2, 1 → SQUARE_1.
  while (squares.length > 0) {
    if (squares.length >= 4) {
      pages.push({
        layout: "SQUARE_4",
        photos: [
          squares.shift(),
          squares.shift(),
          squares.shift(),
          squares.shift(),
        ],
      });
    } else if (squares.length === 3) {
      pages.push({
        layout: "SQUARE_3",
        photos: [squares.shift(), squares.shift(), squares.shift()],
      });
    } else if (squares.length === 2) {
      pages.push({
        layout: "SQUARE_2",
        photos: [squares.shift(), squares.shift()],
      });
    } else {
      pages.push({ layout: "SQUARE_1", photos: [squares.shift()] });
    }
  }

  // Pagină goală la final dacă număr impar de pagini
  if (pages.length % 2 !== 0) {
    pages.push({ layout: "BLANK", photos: [] });
  }

  return pages;
}
