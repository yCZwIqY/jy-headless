import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckboxList from './CheckboxList';

describe('CheckboxList', () => {
  const setup = (values: any[] = [], onChange = jest.fn(), max?: number) => {
    render(
      <CheckboxList values={values} onChange={onChange} max={max}>
        <CheckboxList.Item value={0}>Option 1</CheckboxList.Item>
        <CheckboxList.Item value={1}>Option 2</CheckboxList.Item>
        <CheckboxList.Item value={2}>Option 3</CheckboxList.Item>
      </CheckboxList>,
    );
    return { onChange };
  };

  it('체크박스 리스트가 렌더링 된다', () => {
    setup();
    expect(screen.getByLabelText('Option 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Option 3')).toBeInTheDocument();
  });

  it('옵션을 클릭하면 onChange가 호출된다', async () => {
    const { onChange } = setup();
    const user = userEvent.setup();

    const option1 = screen.getByLabelText('Option 1');
    await user.click(option1);

    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toEqual([0]);
  });

  it('옵션을 다시 클릭하면 onChange가 호출된다 (체크 해제)', async () => {
    const onChange = jest.fn();
    setup([], onChange);
    const user = userEvent.setup();

    const option1 = screen.getByLabelText('Option 1');
    await user.click(option1); // 체크
    await user.click(option1); // 언체크

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual([]);
  });

  it('최대 선택 개수를 초과하면 선택되지 않는다', async () => {
    const onChange = jest.fn();
    setup([], onChange, 2); // 직접 만든 onChange 넘김
    const user = userEvent.setup();

    const option1 = screen.getByLabelText('Option 1');
    const option2 = screen.getByLabelText('Option 2');
    const option3 = screen.getByLabelText('Option 3');

    await user.click(option1); // 선택 1
    await user.click(option2); // 선택 2
    await user.click(option3); // 선택 3 (초과)

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[0][0]).toEqual([0]);
    expect(onChange.mock.calls[1][0]).toEqual([0, 1]);
  });
});
