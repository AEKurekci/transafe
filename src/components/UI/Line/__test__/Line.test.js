import {render, screen} from "@testing-library/react";
import Line from "../Line";

test('renders Input', () => {
    render(<Line/>)
    const name = screen.getByText('>')

    expect(name).toBeTruthy();
})