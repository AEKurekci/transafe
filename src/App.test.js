import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initial authentication screen appears', () => {
  render(<App />);
  const title = screen.getByText(/Transafe/i);
  const loginTitle = screen.getByText(/Giriş Yap/i);
  const email = screen.getByText(/Email:/i);
  const password = screen.getByText(/Şifre:/i);
  const loginButton = screen.getByRole('button', /Giriş/i);

  expect(title).toBeInTheDocument();
  expect(loginTitle).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});
