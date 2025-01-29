import React from 'react';
import { render, screen } from '@testing-library/react';
import Input, { InputProps } from './Input';
import { expect, userEvent } from '@storybook/test';

describe('Input Component', () => {
  const defaultProps: InputProps = {
    value: '',
    onChange: jest.fn(),
    maxLength: 10,
    showLimit: true,
    showError: true,
    error: 'This is an error',
    prefixElement: <span>Prefix</span>,
    suffixElement: <span>Suffix</span>,
  };

  it('renders the input element', () => {
    render(<Input {...defaultProps} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders prefix and suffix elements', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByText('Prefix')).toBeInTheDocument();
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('displays the character limit when showLimit is true', () => {
    render(<Input {...defaultProps} value="Test" />);
    expect(screen.getByText('4/10')).toBeInTheDocument();
  });

  it('displays an error message when showError is true', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('does not display an error message when showError is false', () => {
    render(<Input {...defaultProps} showError={false} />);
    expect(screen.queryByText('This is an error')).toBeNull();
  });

  it('applies custom container styles and class names', () => {
    render(
      <Input
        {...defaultProps}
        containerClassName="custom-container"
        containerStyle={{ backgroundColor: 'red' }}
      />,
    );
    const container = screen.getByText('Prefix').parentElement;
    expect(container).toHaveClass('custom-container');
    expect(container).toHaveStyle({ backgroundColor: 'red' });
  });

  it('renders a custom error element when error is a ReactNode', () => {
    render(
      <Input {...defaultProps} error={<span data-testid="custom-error">Custom Error</span>} />,
    );
    expect(screen.getByTestId('custom-error')).toBeInTheDocument();
  });

  it('applies custom input styles and class names', () => {
    render(<Input {...defaultProps} className="custom-input" style={{ color: 'blue' }} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-input');
    expect(inputElement).toHaveStyle({ color: 'blue' });
  });
});
