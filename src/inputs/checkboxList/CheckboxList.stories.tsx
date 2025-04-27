import { Meta, StoryObj } from '@storybook/react';
import CheckboxList from './CheckboxList';
import { useState } from 'react';

const meta: Meta<typeof CheckboxList> = {
  title: 'Inputs/CheckboxList',
  component: CheckboxList,
};

export default meta;

type Story = StoryObj<typeof CheckboxList>;
export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<boolean[]>([]);
    return (
      <CheckboxList values={values} onChange={(values) => setValues(values)}>
        <CheckboxList.Item value={0}>Option 1</CheckboxList.Item>
        <CheckboxList.Item value={1}>Option 2</CheckboxList.Item>
        <CheckboxList.Item value={2}>Option 3</CheckboxList.Item>
        <div>checked: {values.join(', ')}</div>
      </CheckboxList>
    );
  },
};

export const HasMax: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div>
        <div>최대 2개까지 선택 가능합니다</div>
        <CheckboxList max={2} values={values} onChange={(values: string[]) => setValues(values)}>
          <CheckboxList.Item value={'a'}>Option 1</CheckboxList.Item>
          <CheckboxList.Item value={'b'}>Option 2</CheckboxList.Item>
          <CheckboxList.Item value={'c'}>Option 3</CheckboxList.Item>
          <CheckboxList.Item value={'d'}>Option 4</CheckboxList.Item>
          <CheckboxList.Item value={'e'}>Option 5</CheckboxList.Item>
        </CheckboxList>
        <div>checked: {values.join(', ')}</div>
      </div>
    );
  },
};

export const CustomStyled: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ padding: '24px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>
          커스텀 스타일 + Hover/Selected 효과
        </div>
        <CheckboxList
          values={values}
          onChange={(values: string[]) => setValues(values)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {['apple', 'banana', 'cherry'].map((item) => (
            <CheckboxList.Item
              key={item}
              value={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: values.includes(item) ? '#d0ebff' : 'transparent',
                transition: 'background-color 0.2s ease',
                // hover 스타일
                ...(values.includes(item)
                  ? {}
                  : {
                      ':hover': {
                        backgroundColor: '#e0e0e0',
                      },
                    }),
              }}
            >
              {item === 'apple' && '🍎 Apple'}
              {item === 'banana' && '🍌 Banana'}
              {item === 'cherry' && '🍒 Cherry'}
            </CheckboxList.Item>
          ))}
        </CheckboxList>
        <div style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
          선택된 값: {values.join(', ') || '없음'}
        </div>
      </div>
    );
  },
};
