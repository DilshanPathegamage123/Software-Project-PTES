import React from "react";
import "./SearchButton.css";

export default function SearchButton() {
  return (
    <div className="  search d-flex p-0 ">
      <button
        className=" button bg-primary w-100 h-100 border-0 p-0 "
        type="button"
      >
        Search
      </button>
    </div>
  );
}
