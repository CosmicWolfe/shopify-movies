import { render, screen } from '@testing-library/react';
import App from './App';

it('renders shoppies', () => {
  render(<App />);
  const linkElement = screen.getByText(/Shoppies/i);
  expect(linkElement).toBeInTheDocument();
});
