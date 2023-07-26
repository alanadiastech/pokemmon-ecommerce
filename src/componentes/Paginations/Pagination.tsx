import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { PaginationProps } from '../../interfaces/Pagination'

export const Pagination = (props: PaginationProps) => {
  return (
    <>
      <div
        className=" bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div
          className="flex-1 flex justify-between sm:hidden"
        >
          <button
            disabled={props.currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={props.handlePreviousPage}
          >
            <ChevronLeftIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
            <span className="sr-only">Previous</span>
          </button>
          <button
            disabled={props.currentPokemons.length < props.pokemonsPerPage}
            className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            onClick={props.handleNextPage}
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p
              className="text-sm text-gray-700"
            >
              Mostrando{' '}
              <span
                className="font-medium"
              >
                {props.indexOfFirstPokemon + 1}
              </span>
              de{' '}
              <span
                className="font-medium"
              >
                {props.indexOfFirstPokemon + props.filteredPokemons.length > props.filteredPokemons.length
                  ? props.filteredPokemons.length
                  : props.indexOfFirstPokemon + props.filteredPokemons.length}
              </span>
              {' '} de{' '}
              <span
                className="font-medium"
              >
                {props.filteredPokemons.length}
              </span>
              {' '}resultados
            </p>
          </div>
          <div>
            <nav
              className="inline-flex space-x-2"
              aria-label="Pagination"
            >
              <button
                disabled={props.currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => props.paginate(props.currentPage - 1)}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {props.getPageNumbers().map(pageNumber => (
                <button
                  key={pageNumber}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${props.currentPage === pageNumber
                    ? 'bg-blue-700 text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500 rounded-md'
                    : 'text-gray-700 hover:bg-gray-50 border rounded-md'
                    }`}
                  onClick={() => props.paginate(Number(pageNumber))}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                disabled={props.currentPokemons.length < props.pokemonsPerPage}
                className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => props.paginate(props.currentPage + 1)}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};