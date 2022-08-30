import { MutableRefObject, useRef } from "react";

export const createHeaders = (headers: string[]) =>
  headers.map((item) => ({
    text: item,
    ref: useRef() as MutableRefObject<HTMLTableHeaderCellElement>,
  }));
