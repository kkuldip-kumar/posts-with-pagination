// import React from "react";

// const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
//   const handleClick = (page) => {
//     setCurrentPage(page);
//   };

//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const renderPages = () => {
//     let pages = [];

//     // If totalPages is less than or equal to 6, show all pages
//     if (totalPages <= 6) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(
//           <li key={i} className={`${currentPage === i ? "active" : ""}`}>
//             <button onClick={() => handleClick(i)}>{i}</button>
//           </li>
//         );
//       }
//     } else {
//       // Always show the first page
//       pages.push(
//         <li key={1} className={`${currentPage === 1 ? "active" : ""}`}>
//           <button onClick={() => handleClick(1)}>1</button>
//         </li>
//       );

//       // Show dots if the current page is beyond the 4th page
//       if (currentPage > 4) {
//         pages.push(<li key="start-dots">...</li>);
//       }

//       // Show middle pages (2 previous and 2 next around currentPage)
//       const startPage = Math.max(2, currentPage - 2);
//       const endPage = Math.min(totalPages - 1, currentPage + 2);

//       for (let i = startPage; i <= endPage; i++) {
//         pages.push(
//           <li key={i} className={`${currentPage === i ? "active" : ""}`}>
//             <button onClick={() => handleClick(i)}>{i}</button>
//           </li>
//         );
//       }

//       // Show dots if the current page is far from the last page
//       if (currentPage < totalPages - 3) {
//         pages.push(<li key="end-dots">...</li>);
//       }

//       // Always show the last page
//       pages.push(
//         <li
//           key={totalPages}
//           className={`${currentPage === totalPages ? "active" : ""}`}
//         >
//           <button onClick={() => handleClick(totalPages)}>{totalPages}</button>
//         </li>
//       );
//     }

//     return pages;
//   };

//   return (
//     <div className="pagination">
//       <button onClick={handlePrevious} disabled={currentPage === 1}>
//         Previous
//       </button>
//       <ul>{renderPages()}</ul>
//       <button onClick={handleNext} disabled={currentPage === totalPages}>
//         Next
//       </button>
//     </div>
//   );
// };

// export { Pagination };

import React from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const renderPages = () => {
    let pages = [];

    // If totalPages is less than or equal to 6, show all pages
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li key={i} className={`${currentPage === i ? "active" : ""}`}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }
    } else {
      // Always show the first page
      pages.push(
        <li key={1} className={`${currentPage === 1 ? "active" : ""}`}>
          <button onClick={() => handleClick(1)}>1</button>
        </li>
      );

      let startPage, endPage;

      // If current page is near the start, show more pages towards the right
      if (currentPage <= 4) {
        startPage = 2;
        endPage = 5;
      }
      // If current page is near the end, show more pages towards the left
      else if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
        endPage = totalPages - 1;
      }
      // Show pages around the current page
      else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      // Add start dots if there's a gap after the first page
      if (startPage > 2) {
        pages.push(<li key="start-dots">...</li>);
      }

      // Adding pages between startPage and endPage
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i} className={`${currentPage === i ? "active" : ""}`}>
            <button onClick={() => handleClick(i)}>{i}</button>
          </li>
        );
      }

      // Add end dots if there's a gap before the last page
      if (endPage < totalPages - 1) {
        pages.push(<li key="end-dots">...</li>);
      }

      // Always show the last page
      pages.push(
        <li
          key={totalPages}
          className={`${currentPage === totalPages ? "active" : ""}`}
        >
          <button onClick={() => handleClick(totalPages)}>{totalPages}</button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <ul>{renderPages()}</ul>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export { Pagination };
