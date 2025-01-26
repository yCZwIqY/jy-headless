import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from './Dropdown'; // 해당 컴포넌트의 경로에 맞게 조정
import DownArrowIcon from '../icons/DownArrowIcon'; // 아이콘 경로에 맞게 조정

describe('Dropdown', () => {
  test('renders dropdown and toggles visibility on click', () => {
    render(
      <Dropdown>
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
      </Dropdown>,
    );

    // 기본적으로 옵션은 보이지 않아야 함
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

    // 드롭다운을 클릭하면 옵션이 보이게 되어야 함
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    // 다시 클릭하면 옵션이 사라져야 함
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('selects an option and updates the label', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown onChange={handleChange}>
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
      </Dropdown>,
    );

    // 드롭다운을 열고 'Option 1'을 선택
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option 1'));

    // 'Option 1'이 선택된 후 onChange가 호출되어야 함
    expect(handleChange).toHaveBeenCalledWith('option1');
  });

  test('displays icon position correctly', () => {
    render(
      <Dropdown iconPosition="left">
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
      </Dropdown>,
    );

    // 아이콘이 왼쪽에 표시되어야 함
    expect(screen.getByRole('combobox').firstChild).toContainHTML('<span><svg'); // DownArrowIcon 확인
  });

  test('shows options in the correct position based on optionPosition prop', () => {
    render(
      <Dropdown optionPosition="top">
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
      </Dropdown>,
    );

    // 드롭다운을 클릭한 후 옵션이 위에 표시되어야 함
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Option 1').parentElement).toHaveStyle('top: -100%');
  });
});
