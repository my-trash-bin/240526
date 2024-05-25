import { resolve } from "node:path";

import { compile } from "./compile";
import { listArticles } from "./listArticles";

(async () => {
  for (const path of await listArticles(resolve("src/articles"))) {
    await compile(
      resolve("src/articles", path),
      resolve("out/articles", path.replace(/[\\/]README\.mdx$/, "/page.js"))
    );
  }
})();
