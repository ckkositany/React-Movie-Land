import SearchIcon from "../assets/Search.svg";

const SearchBar = ({ searchTerm, handleChange, handleSearchClick }) => {
  return (
    <div className="search">
      <input
        placeholder="Enter name of the movie"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <img
        src={SearchIcon}
        alt="search icon"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchBar;
