import { useContext } from "react";
import { Appcontext } from "./Appcontext";

export const useAppcontext = () => {
  const context = useContext(Appcontext);
  if (!context) {
    throw Error("useAppContext must be used inside an AuthContextProvider");
  }
  return context;
};
