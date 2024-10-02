import React, { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { PostList } from "./PostList";
import { Pagination } from "./Pagination";
import { Empty } from "./Empty";
import { SearchComponent } from "./SearchComponent";
import { useSearchParams } from "react-router-dom";
const breweriesPerPage = 11;
const PostListWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePage, setActivePage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(10);

  const name = searchParams.get("by_name") || "";
  const page = searchParams.get("page") || 1;
  // const perPage = searchParams.get("per_page") || breweriesPerPage;
  const [perPage, setPerPage] = useState(
    Number(searchParams.get("per_page")) || 10 // Default to 10 items per page
  );
  let URL = `https://api.openbrewerydb.org/breweries?per_page=${perPage}&page=${page}`;
  if (name) {
    URL += `&by_name=${name}`;
  }

  const { data: posts, loading, error, totalItems } = useFetch(URL);

  useEffect(() => {
    if (totalItems) {
      setTotalPages(Math.ceil(totalItems / perPage));
    }
  }, [totalItems, perPage]);

  // Handle page changes and update the URL
  const setCurrentPage = (page) => {
    setActivePage(page);
    setSearchParams({
      per_page: perPage,
      page: page,
      by_name: name || "",
    });
  };

  const handlePerPageChange = (event) => {
    const newPerPage = Number(event.target.value);
    setPerPage(newPerPage);
    setActivePage(1);
    setSearchParams({
      per_page: newPerPage,
      page: 1,
      by_name: name || "",
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <div className="pagination_wrap">
        <SearchComponent />
      </div>
      {posts.length == 0 ? (
        <Empty />
      ) : (
        <>
          <PostList posts={posts} />
          <div className="pagination_wraper">
            <div className="select_ww">
              <label htmlFor="items-per-page">per page:</label>
              <select
                id="items-per-page"
                value={perPage}
                onChange={handlePerPageChange}
                className="custom_select"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <Pagination
              currentPage={activePage}
              setCurrentPage={setCurrentPage}
              totalPages={10}
            />
          </div>
        </>
      )}
    </div>
  );
};

export { PostListWrapper };
