import typescript from "@rollup/plugin-typescript";

export default function rollup() {
  return [
    {
      input: "./src/index.ts",
      output: [
        {
          file: "dist/index.js",
          format: "cjs",
          entryFileNames: "[name].js",
          chunkFileNames: "[name]-[hash].js"
        },
        {
          file: "dist/index.mjs",
          format: "esm",
          entryFileNames: "[name].mjs",
          chunkFileNames: "[name]-[hash].mjs"
        }
      ],
      plugins: [
        typescript({
          tsconfig: "tsconfig.build.json"
        })
      ],
      external: ["electron", "typescript"]
    }
  ];
}
