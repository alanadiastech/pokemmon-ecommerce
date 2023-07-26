import { ReactElement } from "react";
import AlertMessageProps from "../../interfaces/AlertMessage";
import { useLocation } from "react-router-dom";
import pokeLoad from "/src/assets/butterfree.gif";

export const AlertMessageSuccess = (props: AlertMessageProps): ReactElement => {
  
  const location = useLocation();
  const { state } = location;
  const message = state?.message || null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center">
        <div
          className="bg-blue-700 border border-blue-400 text-white px-4 py-3 rounded relative"
          role="alert"
          style={{ height: '50%' }}
        >
          <div className="flex justify-center mb-5">
            <img src={pokeLoad} alt="loading..." className="w-50 h-50 " />
          </div>
          <span className="sm:inline font-bold text-lg mt-5 flex">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-white"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={props.handleCloseAlert}
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    </>
  );
};