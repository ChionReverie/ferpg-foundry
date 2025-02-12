import dirs from "./dirnames";
import fs from "fs";
import { execSync, spawn } from "child_process";

import * as sass from "sass";
import path from "path";
import * as glob from "glob";

const LIBRARY_PATHS = {
  "@yaireo/tagify/dist/tagify.esm.js": "tagify.esm.js",
  "@yaireo/tagify/dist/tagify.esm.js.map": "tagify.esm.js.map",
  "@yaireo/tagify/dist/tagify.polyfills.min.js": "tagify.polyfills.min.js",
  "@yaireo/tagify/dist/tagify.polyfills.min.js.map":
    "tagify.polyfills.min.js.map",
  "@yaireo/tagify/dist/tagify.css": "tagify.css",
};

const EXTENSION_SOURCE_STYLESHEET = ".scss";
const EXTENSION_DEST_STYLESHEET = ".css";
const EXTENSION_DEST_STYLESHEET_MAPS = ".css.map";

export function fullBuild(options?: { scriptWatch?: boolean }) {
  copyLibs();
  copyPublic();
  transpileStyles();
  if (options && options.scriptWatch) {
    watchScripts();
  } else {
    compileScripts();
  }
}

export function copyPublic() {
  fs.cpSync(dirs.public.src, dirs.public.dest, { recursive: true });
}

export function transpileStyles() {
  let paths = _get_stylesheet_src_paths();

  paths.forEach((stylesheetName, _) => {
    const src = path.resolve(
      dirs.style.src,
      `${stylesheetName}${EXTENSION_SOURCE_STYLESHEET}`
    );
    let compiled = sass.compile(src, { sourceMap: true });

    const destStylesheet = path.resolve(
      dirs.style.dest,
      `${stylesheetName}${EXTENSION_DEST_STYLESHEET}`
    );
    const destSourceMap = path.resolve(
      dirs.style.dest,
      `${stylesheetName}${EXTENSION_DEST_STYLESHEET_MAPS}`
    );
    // Assumes the map path is the same as the stylesheet path
    fs.mkdirSync(path.dirname(destStylesheet), { recursive: true });

    const stylesheetText = `/*# sourceMappingURL=${stylesheetName}${EXTENSION_DEST_STYLESHEET_MAPS}*/\n\n${compiled.css}`;
    fs.writeFileSync(destStylesheet, stylesheetText);

    const sourceMapText = JSON.stringify(compiled.sourceMap);
    fs.writeFileSync(destSourceMap, sourceMapText);
  });
}

function _get_stylesheet_src_paths() {
  let paths = glob.sync(
    `${dirs.style.src}/**/[!_]*${EXTENSION_SOURCE_STYLESHEET}`
  );
  return paths.map((filePath: string, _: any) =>
    path
      .relative(dirs.style.src, filePath)
      .slice(0, -EXTENSION_SOURCE_STYLESHEET.length)
  );
}

export function copyLibs() {
  for (const [source, dest] of Object.entries(LIBRARY_PATHS)) {
    const sourceFile = path.resolve(dirs.library.src, source);
    const destFile = path.resolve(dirs.library.dest, dest);

    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.cpSync(sourceFile, destFile);
  }
}

export function compileScripts() {
  const command = "npm run build:script";
  execSync(command, { stdio: "inherit" });
}
export function watchScripts() {
  spawn("npm", ["run", "build:script:watch"], { stdio: "inherit" });
}

