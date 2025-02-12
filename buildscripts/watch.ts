import * as fs from "fs";
import { default as dirs } from "./shared/dirnames";
import * as operations from "./shared/file_operations";

const FAIL_GRACEFULLY = (process.argv.indexOf("--fail-gracefully") != -1);

if (FAIL_GRACEFULLY) {
  console.log("When a compilation fails, we will continue to watch for changes.");
} else {
  console.log("When a compilation fails, the process with terminate.");
}

try {
  operations.fullBuild({ scriptWatch: true });
  console.log("Initial build complete.");
} catch (e) {
  console.log("Initial build failed.");
  console.error(e);
  maybe_terminate();
}

function maybe_terminate() {
  if (!FAIL_GRACEFULLY) {
    console.error("Failing gracelessly. Goodbye.");
    process.exit(1);
  }
}

// Note: Not watching libs folder

fs.watch(dirs.public.src, { recursive: true }, (eventType, fileName) => {
  console.log(`Public file edited at ${fileName}`);

  try {
    operations.copyPublic();
    console.log("Public files have successfully been copied over.");
  } catch (e) {
    console.error("Failed to copy over public files.");
    console.error(e);
    maybe_terminate();
  }
});

fs.watch(dirs.style.src, { recursive: true }, (eventType, fileName) => {
  console.log(`Stylesheet edited at ${fileName}`);

  try {
    operations.transpileStyles();
    console.log("Stylesheets have successfully been replaced.");
  } catch (e) {
    console.error("Failed to replace stylesheets.");
    console.error(e);
    maybe_terminate();
  }
});
