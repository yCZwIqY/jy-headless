import { render, screen } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders input with given id', () => {
    render(<Input id="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test');
  });

  it('renders prefix and suffix elements if provided', () => {
    render(
      <Input
        id="with-elements"
        prefixElement={<span data-testid="prefix">Prefix</span>}
        suffixElement={<span data-testid="suffix">Suffix</span>}
      />,
    );

    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('applies wrapper style and class correctly', () => {
    render(
      <Input
        id="styled"
        wrapperClass={['custom-wrapper']}
        wrapperStyle={{ backgroundColor: 'red' }}
      />,
    );

    const wrapper = screen.getByTestId('input-wrapper');
    expect(wrapper).toHaveClass('custom-wrapper');
    expect(wrapper).toHaveAttribute('id', 'styled-input-wrapper');
    expect(wrapper).toHaveStyle({ backgroundColor: 'red' });
  });
});
