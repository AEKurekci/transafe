import { render, screen } from '@testing-library/react';
import AuthScreen from "../AuthScreen";

test('renders auth screen appears', () => {
    render(<AuthScreen />);
    const loginTitle = screen.getByText(/Giriş Yap/i);
    const email = screen.getByText(/Email:/i);
    const password = screen.getByText(/Şifre:/i);
    const loginButton = screen.getByRole('button', /Giriş/i);

    expect(loginTitle).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});
