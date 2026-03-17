import { createContext, useState } from "react";

export const MobileAlbumContext = createContext();

/**
 * Tracks whether the full-screen mobile album viewer is open.
 * Used so the navbar can disable sticky when the album is open (no overlap).
 */
export const MobileAlbumProvider = ({ children }) => {
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);

  return (
    <MobileAlbumContext.Provider value={{ isAlbumOpen, setIsAlbumOpen }}>
      {children}
    </MobileAlbumContext.Provider>
  );
};
