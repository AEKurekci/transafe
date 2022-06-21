import {render, screen} from "@testing-library/react";
import Button from "../Button";

test('renders button', () => {
    render(<Button>Selam</Button>)
    const buttonText = screen.getByRole('button', /Selami/i)

    expect(buttonText).toBeTruthy();
})