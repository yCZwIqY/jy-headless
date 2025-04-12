import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  const fruits = ['Apple', 'Banana', 'Orange'];

  const setup = () => {
    const select = jest.fn();
    const toggle = jest.fn();
    const selected = 'Apple';
    const isOpen = true;

    render(
      <Dropdown selected={selected} select={select} isOpen={isOpen} toggle={toggle}>
        <Dropdown.Viewer>{selected}</Dropdown.Viewer>
        <Dropdown.Button>▼</Dropdown.Button>
        <Dropdown.Options>
          {fruits.map((fruit) => (
            <Dropdown.Option key={fruit} value={fruit}>
              {fruit}
            </Dropdown.Option>
          ))}
        </Dropdown.Options>
      </Dropdown>,
    );

    return { select, toggle };
  };

  it('dropdown이 렌더링 된다.', () => {
    setup();
    expect(screen.getByRole('viewer')).toHaveTextContent('Apple');
    expect(screen.getByText('▼')).toBeInTheDocument();
  });

  it('옵션을 클릭시 select 콜백이 호출된다', () => {
    const { select } = setup();
    const option = screen.getByText('Banana');
    fireEvent.click(option);
    expect(select).toHaveBeenCalledWith('Banana');
  });

  it('버튼 클릭 시 toggle 콜백이 호출된다', () => {
    const { toggle } = setup();
    const button = screen.getByText('▼');
    fireEvent.click(button);
    expect(toggle).toHaveBeenCalled();
  });
});
