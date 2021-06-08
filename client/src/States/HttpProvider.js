import { useHttp } from "../hooks/http.hook";
import { HttpContext } from "./Context/HttpContext";

export const HttpProvider = ({ children }) => {
  const { loading, request, error, clearError } = useHttp();
  return (
    <HttpContext.Provider
      value={{
        loading,
        request,
        error,
        clearError,
      }}
    >
      {children}
    </HttpContext.Provider>
  );
};
