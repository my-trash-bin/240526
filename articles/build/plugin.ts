// from https://mdxjs.com/docs/getting-started/

import babel from "@babel/core";
import parser from "@babel/parser";
import { compileSync } from "@mdx-js/mdx";
import estreeToBabel from "estree-to-babel";

export function babelPluginSyntaxMdx(): babel.PluginItem {
  return { parserOverride: babelParserWithMdx };
}

// A Babel parser that parses MDX files with `@mdx-js/mdx` and passes any
// other things through to the normal Babel parser.
function babelParserWithMdx(value: any, options: any) {
  if (options.sourceFileName && /\.mdx?$/.test(options.sourceFileName)) {
    // Babel does not support async parsers, unfortunately.
    return compileSync(
      { value, path: options.sourceFileName },
      // Tell `@mdx-js/mdx` to return a Babel tree instead of serialized JS.
      { recmaPlugins: [recmaBabel] /* jsxImportSource: …, otherOptions… */ }
    ).result;
  }

  return parser.parse(value, options);
}

// A “recma” plugin is a unified plugin that runs on the estree (used by
// `@mdx-js/mdx` and much of the JS ecosystem but not Babel).
// This plugin defines `'estree-to-babel'` as the compiler,
// which means that the resulting Babel tree is given back by `compileSync`.
function recmaBabel(this: { compiler: any }) {
  this.compiler = estreeToBabel;
}
