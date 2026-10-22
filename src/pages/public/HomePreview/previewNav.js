/** Routes and menu for the new preview site (parallel to the old public pages). */
export const PREVIEW_HOME = "/preview";
export const PREVIEW_INFORMATII = "/preview/informatii";
export const PREVIEW_DESPRE = "/preview/despre-noi";
export const PREVIEW_ECHIPA = "/preview/echipa-noastra";
export const PREVIEW_BLOG = "/preview/blog";
/** Design-atmosphere A/B of the home page (bands, type, ray mark). */
export const PREVIEW_ATMO = "/preview/test-atmosfera";

export const PREVIEW_NAV = [
  { label: "Acasă", path: PREVIEW_HOME },
  { label: "Test atmosferă", path: PREVIEW_ATMO },
  { label: "Informații", path: PREVIEW_INFORMATII },
  { label: "Despre noi", path: PREVIEW_DESPRE },
  { label: "Echipa noastră", path: PREVIEW_ECHIPA },
  { label: "Blog", path: PREVIEW_BLOG },
];
