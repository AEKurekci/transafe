import {render, screen} from "@testing-library/react";
import Card from "../Card";
import Button from "../../Buttons/Button";

test('renders button', () => {
    render(<Card><Button>Selam</Button></Card>)
    const buttonText = screen.getByRole('button', {name: 'Selam'})

    expect(buttonText).toBeTruthy();
})