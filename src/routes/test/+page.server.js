import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";
import fs from "fs";
const svg = createAvatar(style, {
  seed: "ahajwk",
});

fs.writeFile("./test.svg", svg, (err) => {
  if (err) console.log(err);
  console.log("written.");
});
