// import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

// Look details here
// https://github.com/vitest-dev/vitest/blob/main/examples/react/test/basic.test.tsx

function toJson(component: renderer.ReactTestRenderer) {
  const result = component.toJSON()
  expect(result).toBeDefined()
  expect(result).not.toBeInstanceOf(Array)
  return result as renderer.ReactTestRendererJSON
}

test('renders component', () => {
  const component = renderer.create(<App />);

  const tree = toJson(component)
  expect(tree).toMatchSnapshot()

  // const linkElement = screen.getByText(/Snake/i);
  // expect(linkElement).toBeInTheDocument();
});
