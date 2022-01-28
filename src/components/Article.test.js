import React from 'react';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

test('renders component without errors', ()=> {
  render(<Article article={{}} />);
});

test('renders headline, author from the article when passed in through props', ()=> {
  render(<Article article={{
    headline: 'This headline',
    author: 'that author',
    summary: 'oh my gosh an award winning summary',
    body: 'THIS IS THE BEST STORY EVER'
  }} />);

  const headline = screen.queryByText(/this headline/i);
  const author = screen.queryByText(/that author/i);
  const summary = screen.queryByText(/oh my gosh an award winning summary/i);
  const body = screen.queryByText(/this is the best story ever/i);

  expect(headline).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
  render(<Article article={{
    headline: 'This headline',
    author: '',
    summary: 'oh my gosh an award winning summary',
    body: 'THIS IS THE BEST STORY EVER'
  }} />)

  const author = screen.getByTestId('author');

  expect(author).toHaveTextContent(/Associated Press/i);
});

test('executes handleDelete when the delete button is pressed', async () => {
  const handleDelete = jest.fn();

  render(<Article article={{
    headline: 'This headline',
    author: 'that author',
    summary: 'oh my gosh an award winning summary',
    body: 'THIS IS THE BEST STORY EVER'
  }} handleDelete={handleDelete} />)
  
  // DELETE ACTION
  const deleteButton = screen.getByTestId('deleteButton');
  userEvent.click(deleteButton);

  await expect(handleDelete).toHaveBeenCalledTimes(1);
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.