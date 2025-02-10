// @ts-check
/**
 * Run this script before publishing the package or after building dist.
 *
 * This copies the svg files to the dist folder, and converts them into Javascript files with the svg content.
 */
import fs from "fs";
import path from "path";
import { promisify } from "util";

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
 * The source directory of the svg files.
 */
const svgSrcDir = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../src/icons"
);
/**
 * The destination directory of the svg files.
 */
const distDir = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../dist/icons"
);

async function main() {
  const files = await readDir(svgSrcDir);

  // create the dist folder if it doesn't exist
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // copy the svg files to the dist folder
  for (const fileName of files) {
    if (!fileName.endsWith(".svg")) {
      continue;
    }

    const svgFilePath = path.join(svgSrcDir, fileName);
    const content = await readFile(svgFilePath, "utf8");
    const compressed = content
      .split("\n")
      .map((line) => line.trim())
      .join("");

    const jsFileName = fileName.replace(".svg", ".svg.js");
    const jsFilePath = path.join(distDir, jsFileName);
    const jsContent = `export default \`${compressed}\`;`;

    await writeFile(jsFilePath, jsContent);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
