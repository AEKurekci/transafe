import {render, screen} from "@testing-library/react";
import NavButton from "../NavButton";

test('renders Input', () => {
    render(<NavButton label='Test' icon='icon'/>)
    const label = screen.getByText('Test')
    const icon = screen.getByText('icon')

    expect(label).toBeTruthy();
    expect(icon).toBeTruthy();
})