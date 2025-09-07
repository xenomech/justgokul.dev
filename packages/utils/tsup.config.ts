import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/date.ts'],
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false,
  target: 'es2022',
  tsconfig: './tsconfig.build.json',
});
