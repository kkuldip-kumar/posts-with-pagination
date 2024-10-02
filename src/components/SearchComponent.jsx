import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 150);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
      setSearchParams({ by_name: debouncedSearchTerm });
    } else {
      searchParams.delete("by_name");
      // setSearchParams(searchParams);
    }
  }, [debouncedSearchTerm, searchParams, setSearchParams]);

  return (
    <input
      type="text"
      className="search_input"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

export { SearchComponent };
