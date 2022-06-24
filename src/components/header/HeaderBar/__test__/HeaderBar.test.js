import { screen } from '@testing-library/react';
import HeaderBar from "../HeaderBar";
import customRender from "../../../../util/customRender";
import * as PageContext from '../../../../store/page-context';

test('renders header bar', () => {
    const mockContext = {
        isLoggedIn: true,
        user: {
            name: 'Definex'
        }
    }
    jest.spyOn(PageContext, 'usePageContext').mockImplementation(() => mockContext)
    customRender(<HeaderBar />, mockContext);
    const loginTitle = screen.getByText(/Transafe/i);
    const welcome = screen.getByText(/Hoşgeldin Definex/i);

    expect(loginTitle).toBeInTheDocument();
    expect(welcome).toBeInTheDocument();
});
