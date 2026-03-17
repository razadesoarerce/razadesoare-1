import { createContext } from "react";

export const BreadcrumbContext = createContext({
  breadcrumbLabelOverride: null,
  setBreadcrumbLabelOverride: () => {},
});
