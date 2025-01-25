import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button'; // Button 컴포넌트 파일 경로에 맞게 수정
import { expect } from '@storybook/test'; // Spinner 컴포넌트 파일 경로에 맞게 수정

describe('Button component', () => {
  // 1. 버튼이 제대로 렌더링 되는지 확인
  it('renders the button with children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // 2. loading이 true일 때 spinner가 렌더링되는지 확인
  it('renders a spinner when loading is true', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByTestId('spinner')).toBeInTheDocument(); // Spinner에 testid="spinner" 추가 필요
  });

  // 3. loading이 false일 때 children이 렌더링되는지 확인
  it('renders children when loading is false', () => {
    render(<Button loading={false}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  // 4. prefixElement가 제대로 렌더링되는지 확인
  it('renders prefixElement correctly', () => {
    render(<Button prefixElement={<span>Prefix</span>}>Click me</Button>);
    expect(screen.getByText('Prefix')).toBeInTheDocument();
  });

  // 5. suffixElement가 제대로 렌더링되는지 확인
  it('renders suffixElement correctly', () => {
    render(<Button suffixElement={<span>Suffix</span>}>Click me</Button>);
    expect(screen.getByText('Suffix')).toBeInTheDocument();
  });

  // 6. 버튼 클릭 이벤트 확인
  it('fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
