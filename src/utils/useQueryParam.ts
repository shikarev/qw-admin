import React from 'react';
import type { NavigateOptions } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

export default function useQueryParam(
  key: string
): [string | undefined, (newQuery: string, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key) ?? undefined;

  let value = React.useMemo(() => {
    return paramValue;
  }, [paramValue]);

  let setValue = React.useCallback(
    (newValue: string, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key,  String(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}