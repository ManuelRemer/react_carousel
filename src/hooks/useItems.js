import { useEffect, useRef } from "react";
export const useItems = (itemsShown, children) => {
  let items = useRef([]);
  useEffect(() => {
    items.current = [
      ...prevItems(itemsShown, children),
      ...children,
      children[0],
    ];
  }, [itemsShown, children]);

  return items.current;
};

const prevItems = (itemsShown, children) => {
  let result = [];
  for (let i = 1; i < itemsShown; i++) {
    result = [children[children.length - i], ...result];
  }
  return result;
};

const nextItems = (itemsShown, children) => {
  let result = [];
  for (let i = itemsShown; i < 0; i--) {
    result = [children[children.length - i], ...result];
  }
  return result;
};
