import { render, screen } from '@testing-library/react';
import Input from './Input';
import { userEvent } from '@testing-library/user-event';
import { expect } from '@storybook/test';

describe('Input', () => {
  it('input이 렌더링 된다.', () => {
    render(<Input id="test" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test');
  });

  it('prefix, suffix와 함께 렌더링 된다.', () => {
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

  it('래퍼 스타일과 클래스가 적용된다.', () => {
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

  it('입력시 onChange 이벤트가 호출된다.', async () => {
    const onChange = jest.fn();
    render(<Input id="styled" onChange={onChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(onChange).toHaveBeenCalled();
  });
});
