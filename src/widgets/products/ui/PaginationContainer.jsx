import { useLocation, useNavigate } from "react-router-dom";

function PaginationContainer({ meta }) {
  const { pageCount, page } = meta.pagination;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageN) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageN);
    navigate(`${pathname}?${searchParams.toString()}`);
    console.log(search);
    console.log(pathname);
    console.log(pageN);
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
        {pages.map((pageN) => {
          return (
            <button
              key={pageN}
              className={`btn btn-xs sm:btn-md join-item ${pageN === page ? "bg-base-300 border-base-300" : ""}`}
              onClick={() => {
                handlePageChange(pageN);
              }}
            >
              {pageN}
            </button>
          );
        })}
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
