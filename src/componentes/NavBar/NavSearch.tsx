import { ChangeEvent } from "react";
import { NavProps } from "../../interfaces";

export const NavSearch = (props: NavProps) => {
  const handleClearSearch = () => {
    props.setSearch('');
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    props.setSearch(searchValue);
  };

  return (
    <>
      <div className="flex flex-col">
        <form className="relative block">
          <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                stroke="currentColor"
                className="h-5 w-5 fill-white-900"
              >
                <path
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-yellow-100 rounded-md py-2 pl-8 pr-10 sm:pl-10 sm:pr-10 shadow-sm focus:outline-none focus:border-yellow-500 focus:ring-yellow-500 focus:ring-1 sm:text-sm"
              placeholder="Pesquisar..."
              type="text"
              name="search"
              value={props.search}
              onChange={handleSearchChange}
            />
            {props.search && (
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-900 cursor-pointer bold "
                  onClick={handleClearSearch}>
                  <path
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            )}
          </label>
        </form>
      </div>
    </>
  );
};




