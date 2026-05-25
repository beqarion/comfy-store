import { useLocation, useNavigate } from "react-router-dom";

function PaginationContainer({ meta }) {
  const { pageCount, page } = meta.pagination;

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const addPageButton = ({ pageNumber, isActive }) => {
    return (
      <button
        key={pageNumber}
        className={`btn btn-xs sm:btn-md join-item ${isActive ? "bg-base-300 border-base-300" : ""}`}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first button
    pageButtons.push(addPageButton({ pageNumber: 1, isActive: page === 1 }));

    // dots 1
    if (page > 2) {
      pageButtons.push(
        <button key="dots-1" className="btn btn-xs sm:btn-md join-item">
          ...
        </button>,
      );
    }

    // active page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({ pageNumber: page, isActive: true }));
    }

    // dots 2
    if (page < pageCount - 1) {
      pageButtons.push(
        <button key="dots-2" className="btn btn-xs sm:btn-md join-item">
          ...
        </button>,
      );
    }

    // last button
    pageButtons.push(
      addPageButton({
        pageNumber: pageCount,
        isActive: page === pageCount,
      }),
    );
    return pageButtons;
  };

  const handlePageChange = (pageN) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageN);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  if (pageCount < 2) {
    return null;
  }

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let prevPage = page - 1;
            if (prevPage < 1) {
              prevPage = pageCount;
            }
            handlePageChange(prevPage);
          }}
        >
          prev
        </button>
        {renderPageButtons()}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() => {
            let nextPage = page + 1;
            if (nextPage > pageCount) {
              nextPage = 1;
            }
            handlePageChange(nextPage);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}
export default PaginationContainer;
