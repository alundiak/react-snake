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
- `useLayoutEffect()` (when border-conflict happens), 
- `useCallback()`, `useMemo()` to improve performance.


# 2024

Rework codebase using Vite setup instead fo Webpack.


## Before 2024

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

as

```
npx create-react-app react-snake --template typescript
```

Deploy to Github Pages:

```
npm run deploy
```

Run production build locally:

```
npm run build
```

## Prettier

In fact I did have conflict between formatters: built-in in VScode JS/TS and recently installed `deno fmt`.
And I didn't know, VScode stopped working because of ambiguity. Interesting experience. I started configuring Prettier, and it also didn't work. But then I realized, notifications at the bottom of VSCode, where I got understanding of conflict.

- https://prettier.io/docs/en/configuration.html
- https://medium.com/technical-credit/using-prettier-with-vs-code-and-create-react-app-67c2449b9d08
- https://saikat.dev/blog/posts/create-react-app-adding-prettier


## Examples

Leetcode tasks (problems):

- https://leetcode.com/problems/design-snake-game/
- https://leetcode.com/problems/snakes-and-ladders/
- https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/
- https://css-tricks.com/generating-and-solving-sudokus-in-css/ sudoku also quad-based
