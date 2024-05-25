import { resolve } from "node:path";

import { compile } from "./compile";
import { listArticles } from "./listArticles";

(async () => {
  const articlePaths = await listArticles(resolve("src/(articles)"));
  for (let i = 0; i < articlePaths.length; i++) {
    const path = articlePaths[i];
    console.log(`(${i + 1}/${articlePaths.length}) compiling ${path}`);
    await compile(
      resolve("src/(articles)", path),
      resolve("out/(articles)", path.replace(/[\\/]README\.mdx$/, "/page.js"))
    );
  }
  console.log("done.");
})();
