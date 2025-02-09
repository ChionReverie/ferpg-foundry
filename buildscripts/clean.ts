import * as fs from "fs";
import * as path from "path";

const distDir = path.resolve(process.cwd(), "dist");

if(!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

fs.readdirSync(distDir).map(
    (dirName) => path.resolve(distDir, dirName)
).forEach((file) => {
    fs.rmSync(file, {recursive: true});
});

console.log("Clean complete!");