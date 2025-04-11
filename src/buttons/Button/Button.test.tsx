// __tests__/Button.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';

jest.useFakeTimers();

describe('Button', () => {
  it('fires onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('debounces onClick when debounce prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} debounce>
        Click
      </Button>,
    );

    const btn = screen.getByText('Click');
    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);

    // 아직 호출되지 않음
    expect(handleClick).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );

    const btn = screen.getByText('Disabled');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is disabled when loading prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} loading>
        Loading...
      </Button>,
    );

    const btn = screen.getByText('Loading...');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('is disabled when readOnly prop is true', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} readOnly>
        ReadOnly
      </Button>,
    );

    const btn = screen.getByText('ReadOnly');
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
