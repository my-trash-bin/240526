import { glob } from "glob";

export async function listArticles(cwd: string): Promise<string[]> {
  return await glob("**/README.mdx", { cwd });
}
