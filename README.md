# React Snake

My implementation of popular game 'Snake' in TypeScript, React and CSS grid.

It's my React-educational goal, to have a repository of code where I use all react features.

Also used `useReducer()` React hook.

TODO: `useState()`, `useContext()`, `useLayoutEffect()` (when border-conflict happens).


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

- Leetcode tasks (problems)
    - https://leetcode.com/problems/design-snake-game/
    - https://leetcode.com/problems/snakes-and-ladders/
    - https://leetcode.com/problems/minimum-moves-to-reach-target-with-rotations/
    - https://css-tricks.com/generating-and-solving-sudokus-in-css/ sudoku also quad-based

# 2024

Rework codebase using Vite setup instead fo Webpack.
