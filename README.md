# React Snake

It's my React-educational implementation of popular game 'Snake'.

## Tech stack

- TypeScript
- React
- CSS grid

In the code I used:

- React `useState()` hook.
- React `useReducer()` hook.
- React `useContext()` hook and `createContext()`.

TODO:

- So far no need, but use `useRef()` hook to store data variables which are rather constant but it's better to NOT re-declare it all the time inside of component when it renders. `ref-current` will be kinda "cached" between re-renders and also its change will NOT trigger re-rendering.
- `useLayoutEffect()` (when border-conflict happens),
- `useCallback()`, `useMemo()` and/or - Maybe `React.memo()` to improve performance. Used in fp-react-examples repo.
- Maybe `React.lazy()`
- Maybe `useDeferredValue()` and `<Suspense>`.
- https://react.dev/reference/react/Profiler

Code is deployed to GitHub Actions

- https://create-react-app.dev/docs/deployment/

## Examples

Leetcode tasks (problems):

- https://leetcode.com/problems/design-snake-game/
- https://leetcode.com/problems/snakes-and-ladders/
- https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/
- https://css-tricks.com/generating-and-solving-sudokus-in-css/ sudoku also quad-based

## 2025

Migrated to ESLINT v9 - [guide](https://eslint.org/docs/latest/use/getting-started)

```sh
npm init @eslint/config@latest
```

And also added `@vitest/eslint-plugin` (because legacy `eslint-plugin-vitest` refers to eslint v8).

## 2024 Migrated to Vite and Vitest.

Reworked codebase using [Vite](https://vitejs.dev/) setup instead of `react-scripts` via `webpack`.

Introduced [Vitest](https://vitest.dev/) instead of `@testing-library/react`. Used hints from [here](https://github.com/vitest-dev/vitest/tree/main/examples/react).

Note. Both Vite and Vitest evolved from VueJS community.

Tech note.

- `npx create-vite my-app` - I looked up boilerplate to compare.
- `npm i vite -D`
- `npm i jsdom happy-dom vitest @vitest/ui react-test-renderer @types/react-test-renderer -D`

- `%PUBLIC_URL%`-approach from CRA/Webpack was used to define proper URL base path for localhost and GitHub Page. CRA deployments info - https://create-react-app.dev/docs/deployment/

- Using Vite it requires change in `vite.config.js`:

```sh
  base: '/react-snake/',
```

And I also added this:

```json
  build: {
    outDir: 'build', // because default was 'dist'
  },
```

And worth mentioning, that Vite setup now, in Jan-2024 suggest `type: module` in `package.json` and I assume that is way Vite template generates code fro React:

```html
<script type="module" src="/src/main.tsx"></script>
```

Web Vitals is not added by Vite developers in template. So need to add it manually:

- `npm install web-vitals`

### React + TypeScript + Vite (from template README.md)

Minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Before 2024

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

as

```sh
npx create-react-app react-snake --template typescript
```

Deploy to Github Pages:

```sh
npm run deploy
```

Run production build locally:

```sh
npm run build
```

## Prettier

In fact I did have conflict between formatters: built-in in VScode JS/TS and recently installed `deno fmt`.
And I didn't know, VScode stopped working because of ambiguity. Interesting experience. I started configuring Prettier, and it also didn't work. But then I realized, notifications at the bottom of VSCode, where I got understanding of conflict.

- https://prettier.io/docs/en/configuration.html
- https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08
- https://saikat.dev/blog/posts/create-react-app-adding-prettier
