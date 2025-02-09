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
  operations.fullBuild();
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

fs.watch(dirs.systemJSON.src, (eventType, fileName) => {
  console.log(`System configuration edited at ${fileName}`);
  try {
    operations.copyJSON();
    console.log(`Configs have successfully been replaced.`);
  } catch (e) {
    console.error("Failed to replace configs.");
    console.error(e);
    maybe_terminate();
  }
});

fs.watch(dirs.lang.src, { recursive: true }, (eventType, fileName) => {
  console.log(`Language configuration edited at ${fileName}`);
  try {
    operations.copyLanguageFiles();
    console.log("Language files have successfully been replaced.");
  } catch (e) {
    console.error("Failed to replace language files.");
    console.error(e);
    maybe_terminate();
  }
});

fs.watch(dirs.template.src, { recursive: true }, (eventType, fileName) => {
  console.log(`Tempalate edited at ${fileName}`);
  try {
    operations.copyTemplates();
    console.log("Templates have successfully been replaced.");
  } catch (e) {
    console.error("Failed to replace templates.");
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

fs.watch(dirs.module.src, { recursive: true }, (eventType, fileName) => {
  console.log(`Module script edited at ${fileName}`);

  try {
    operations.compileScripts();
    console.log("Module scripts have successfully been replaced.");
  } catch (e) {
    console.error("Failed to replace module scripts.");
    console.error(e);
    maybe_terminate();
  }
});
