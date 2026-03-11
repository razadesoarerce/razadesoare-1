/**
 * Orientation-based page layout generator.
 * Returns { layout, photoCount } for PhotoFlipBook to slice photos.
 */

export function classify(photo) {
  const width = photo.width || 1;
  const height = photo.height || 1;

  const ratio = width / height;

  if (ratio > 1.15) return "landscape";
  if (ratio < 0.85) return "portrait";

  return "square";
}

export function buildPageConfigs(photos) {
  if (!photos.length) return [];

  const portraits = [];
  const landscapes = [];
  const squares = [];

  photos.forEach((photo) => {
    const type = classify(photo);

    if (type === "portrait") portraits.push(photo);
    else if (type === "landscape") landscapes.push(photo);
    else squares.push(photo);
  });

  const configs = [];
  let toggle = "portrait";

  while (portraits.length >= 2 || landscapes.length >= 2) {
    if (toggle === "portrait" && portraits.length >= 2) {
      configs.push({
        layout: "B",
        photoCount: 2,
      });
      portraits.splice(0, 2);
    } else if (toggle === "landscape" && landscapes.length >= 2) {
      configs.push({
        layout: "A",
        photoCount: 2,
      });
      landscapes.splice(0, 2);
    }

    toggle = toggle === "portrait" ? "landscape" : "portrait";
  }

  if (portraits.length === 1) {
    configs.push({
      layout: "A",
      photoCount: 1,
    });
    portraits.length = 0;
  }

  if (landscapes.length === 1) {
    configs.push({
      layout: "A",
      photoCount: 1,
    });
    landscapes.length = 0;
  }

  while (squares.length > 0) {
    if (squares.length >= 4) {
      configs.push({
        layout: "D",
        photoCount: 4,
      });
      squares.splice(0, 4);
    } else if (squares.length === 3) {
      configs.push({
        layout: "C",
        photoCount: 3,
      });
      squares.length = 0;
    } else if (squares.length === 2) {
      configs.push({
        layout: "B",
        photoCount: 2,
      });
      squares.length = 0;
    } else {
      configs.push({
        layout: "A",
        photoCount: 1,
      });
      squares.length = 0;
    }
  }

  if (configs.length % 2 !== 0) {
    configs.push({
      layout: "A",
      photoCount: 1,
    });
  }

  return configs;
}
