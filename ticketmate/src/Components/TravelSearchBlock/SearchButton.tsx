import React from "react";
import "./SearchButton.css";

interface SearchButtonProps {
  onClick: () => Promise<void>;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <div className="search d-flex p-0">
      <button
        className=" button bg-primary w-100 h-100 border-0 p-0 "
        type="button"
        onClick={onClick}
      >
        Search
      </button>
    </div>
  );
};
export default SearchButton;
