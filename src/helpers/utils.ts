import { useEffect, useRef } from "react";

export function getPageNumber(url: string | null): number {
  if (!url) {
    return 0;
  }
  const queryString = url.split("?")[1];
  const params = queryString.split("&");
  for (let param of params) {
    const [key, value] = param.split("=");

    if (key === "page") {
      return parseInt(value);
    }
  }

  return 0;
}

export const debounce = (func: Function, delay: number) => {
  let timer: any;
  return function (...args: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(func, args);
    }, delay);
  };
};

type CallbackType = (event: MouseEvent | TouchEvent) => void;

export const useOnClickOutside = (callback: CallbackType) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [callback]);

  return ref;
};
