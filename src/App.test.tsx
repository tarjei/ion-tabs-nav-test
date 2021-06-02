import React from 'react';
import { getByLabelText, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';
import { debug } from 'webpack';

test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});


test('should be able to navigate from one tab to another', async () => {
  const { debug, baseElement, getByText } = render(<App />);
  expect(baseElement).toBeDefined();

  await waitFor(async()=> {
    expect(getByText('Log in')).toBeInTheDocument()
  }, {timeout:400})


  userEvent.click(getByText('Log in'))

  await waitFor(async()=> {
    expect(getByText('Tab 2')).toBeInTheDocument()
  })

  userEvent.click(getByText('Tab 2'))

  await waitFor(async()=> {
    expect(expect(getByText('Tab 2 page'))).toBeInTheDocument()
    
  })
  //console.log(baseElement.innerHTML)

});
