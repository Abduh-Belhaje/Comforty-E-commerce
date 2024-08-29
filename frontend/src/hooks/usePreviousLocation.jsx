import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

export function usePreviousLocation() {
  const location = useLocation();
  const previousLocationRef = useRef(null);

  useEffect(() => {
    previousLocationRef.current = location.pathname;
  }, [location]);

  return previousLocationRef.current;
}
