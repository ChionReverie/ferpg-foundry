import * as path from "path";

const src = path.resolve(process.cwd(), "src");
const dest = path.resolve(process.cwd(), "dist"); // Distribution, not to be confused with Destination

type pathInfo = { src: string; dest: string };
type NameOptions2 = "base" | "style" | "module" | "library" | "public";

const dirs: {
  [k in NameOptions2]: pathInfo;
} = {
  base: {
    src,
    dest,
  },
  style: {
    src: path.resolve(src, "styles"),
    dest: path.resolve(dest, "styles"),
  },
  module: {
    src: path.resolve(src, "module"),
    dest: path.resolve(dest, "module"),
  },
  library: {
    src: path.resolve(process.cwd(), "node_modules"),
    dest: path.resolve(dest, "lib"),
  },
  public: {
    src: path.resolve(process.cwd(), "public"),
    dest, // Public stuff copies to the destination's base directory.
  },
};

export default dirs;
