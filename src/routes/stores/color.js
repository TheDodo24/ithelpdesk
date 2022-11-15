import { readable } from "svelte/store";

export const backgroundColor = readable("red", function start(set) {
  let colors = [
    "orange",
    "amber",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "purple",
    "violet",
    "indigo",
    "sky",
    "cyan",
    "teal",
    "emerald",
    "amber",
    "orange",
  ];
  let index = 1;
  const interval = setInterval(() => {
    set(colors[index]);
    index++;
    if (index > colors.length - 1) {
      index = 0;
    }
  }, 1000 * 60);

  return function stop() {
    clearInterval(interval);
  };
});

// let color = "bg-red-500";
// let colors = [
//   "bg-red-500",
//   "bg-orange-500",
//   "bg-amber-500",
//   "bg-yellow-500",
//   "bg-lime-500",
//   "bg-green-500",
//   "bg-emerald-500",
//   "bg-teal-500",
//   "bg-cyan-500",
//   "bg-sky-500",
//   "bg-indigo-500",
//   "bg-violet-500",
//   "bg-purple-500",
//   "bg-fuchsia-500",
//   "bg-pink-500",
//   "bg-rose-500",
// ];
// let index = 1;
// onMount(() => {
//   setInterval(() => {
//     color = colors[index];
//     index++;
//     if (index > colors.length) {
//       index = 0;
//     }
//   }, 5000);
// });
