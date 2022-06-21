import {render, screen} from "@testing-library/react";
import Input from "../Input";

test('renders Input', () => {
    render(<Input label='Name' inputConfig={{id: 'test'}}/>)
    const name = screen.getByLabelText('Name')

    expect(name).toBeTruthy();
})