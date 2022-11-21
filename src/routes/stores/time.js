import { readable } from "svelte/store";

export const time = readable(null, (set) => {
  // @ts-ignore
  set(new Date());

  const interval = setInterval(() => {
    // @ts-ignore
    set(new Date());
  }, 1000);

  return () => clearInterval(interval);
});
