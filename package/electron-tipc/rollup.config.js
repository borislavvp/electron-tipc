import typescript from "@rollup/plugin-typescript";

export default function rollup() {
  return [
    {
      input: "./src/index.ts",
      output: [
        {
          file: "dist/index.cjs.js",
          format: "cjs",
          entryFileNames: "[name].cjs.js",
          chunkFileNames: "[name]-[hash].js"
        },
        {
          file: "dist/index.esm.js",
          format: "esm",
          entryFileNames: "[name].esm.js",
          chunkFileNames: "[name]-[hash].esm.js"
        }
      ],
      plugins: [
        typescript({
          tsconfig: "tsconfig.build.json",
          sourceMap: false
        })
      ],
      external: ["electron", "typescript"]
    }
  ];
}
