/** Routes and menu for the new preview site (parallel to the old public pages). */
export const PREVIEW_HOME = "/preview";
export const PREVIEW_INFORMATII = "/preview/informatii";
export const PREVIEW_DESPRE = "/preview/despre-noi";
export const PREVIEW_ECHIPA = "/preview/echipa-noastra";
export const PREVIEW_BLOG = "/preview/blog";
/** Temporary homepage typography test — same layout, larger type. */
export const PREVIEW_TEST = "/preview/test";

export const PREVIEW_NAV = [
  { labelKey: "preview.nav.home", path: PREVIEW_HOME },
  { labelKey: "preview.nav.info", path: PREVIEW_INFORMATII },
  { labelKey: "preview.nav.about", path: PREVIEW_DESPRE },
  { labelKey: "preview.nav.team", path: PREVIEW_ECHIPA },
  { labelKey: "preview.nav.blog", path: PREVIEW_BLOG },
  { labelKey: "preview.nav.test", path: PREVIEW_TEST },
];
