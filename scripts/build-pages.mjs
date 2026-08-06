import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const serverUrl = new URL("../dist/server/index.js", import.meta.url);
const outputDirectory = resolve(root, "dist-pages");

const { default: worker } = await import(serverUrl.href);
const response = await worker.fetch(
  new Request("https://static.local/", {
    headers: { accept: "text/html" },
  }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) {
  throw new Error(`Could not render the page: ${response.status}`);
}

let html = await response.text();
html = html
  .replaceAll('href="/_next/', 'href="./_next/')
  .replaceAll('src="/_next/', 'src="./_next/')
  .replaceAll('href="/favicon.svg"', 'href="./favicon.svg"');

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(resolve(root, "dist/client"), outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "index.html"), html);
await writeFile(resolve(outputDirectory, ".nojekyll"), "");

console.log(`Static Pages artifact created at ${outputDirectory}`);
