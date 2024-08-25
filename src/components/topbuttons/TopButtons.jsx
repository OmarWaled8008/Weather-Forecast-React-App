import React, { useContext } from "react";
import { queryContextVar } from "../../context/queryContext";

export default function TopButtons() {
  const { setQuery } = useContext(queryContextVar);

  const buttons = [
    { label: "London" },
    { label: "Cairo" },
    { label: "Sydney" },
    { label: "Tokyo" },
    { label: "Paris" },
  ];
  return (
    <div className="flex items-center justify-around my-5">
      {buttons.map((button, index) => (
        <button
          key={index}
          className="text-gray-300 font-medium text-lg transition hover:text-org"
          onClick={() => setQuery({ q: button.label })} // Change to setQuery(button.label)
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}
