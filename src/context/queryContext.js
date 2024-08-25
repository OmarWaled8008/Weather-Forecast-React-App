import { createContext, useState } from "react";

export const queryContextVar = createContext();

export default function QueryContextComp({ children }) {
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metric");

  return (
    <queryContextVar.Provider
      value={{
        query,
        setQuery,
        units,
        setUnits,
      }}
    >
      {children}
    </queryContextVar.Provider>
  );
}
