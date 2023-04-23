import { useState, useCallback } from "react";
// https://blog.logrocket.com/using-localstorage-react-hooks/

function getStorageValue(key: string, defaultValue: any): any {
  // getting stored value

  // When nextjs first loads the page, localStorage is undefined
  if (typeof window === "undefined") return defaultValue;

  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial ?? defaultValue;
}

const useLocalStorage = (
  key: string,
  defaultValue: any
): [any, (value: any) => void] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  // This way the local storage is updated immediately, to prevent this step being skipped
  // when component unmounts first (which happened with guest_auth)
  const setLocalStorage = useCallback(
    (newvalue: any) => {
      if (typeof window === "undefined") return;
      if (typeof newvalue === "function") {
        newvalue = newvalue(value);
      }
      localStorage.setItem(key, JSON.stringify(newvalue));
      setValue(newvalue);
    },
    [key, value, setValue]
  );

  return [value, setLocalStorage];
};

export default useLocalStorage;
