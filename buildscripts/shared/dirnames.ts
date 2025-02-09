import * as path from "path";

const src = path.resolve(process.cwd(), "src");
const dest = path.resolve(process.cwd(), "dist"); // Distribution, not to be confused with Destination

type pathInfo = { src: string; dest: string };
type NameOptions2 =
  | "base"
  | "systemJSON"
  | "lang"
  | "style"
  | "module"
  | "template"
  | "library";

const dirs: {
  [k in NameOptions2]: pathInfo;
} = {
  base: {
    src, dest
  },
  systemJSON: {
    src: path.resolve(src, "system.json"),
    dest: path.resolve(dest, "system.json"),
  },
  lang: {
    src: path.resolve(src, "lang"),
    dest: path.resolve(dest, "lang"),
  },
  style: {
    src: path.resolve(src, "styles"),
    dest: path.resolve(dest, "styles"),
  },
  module: {
    src: path.resolve(src, "module"),
    dest: path.resolve(dest, "module"),
  },
  template: {
    src: path.resolve(src, "templates"),
    dest: path.resolve(dest, "templates"),
  },
  library: {
    src: path.resolve(process.cwd(), "node_modules"),
    dest: path.resolve(dest, "lib"),
  },
};

export default dirs;
