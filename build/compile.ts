import { mkdir, readFile, writeFile } from "node:fs/promises";

import babel from "@babel/core";

import { dirname } from "node:path";
import { babelPluginSyntaxMdx } from "./plugin";

export async function compile(
  inFilePath: string,
  outFilePath: string
): Promise<void> {
  const content = (await readFile(inFilePath)).toString();
  const result = await babel.transformAsync(content, {
    filename: inFilePath,
    plugins: [babelPluginSyntaxMdx],
  });
  await mkdir(dirname(outFilePath), { recursive: true });
  await writeFile(outFilePath, result?.code!); //NOSONAR
}
