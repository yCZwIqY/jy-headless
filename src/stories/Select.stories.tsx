import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Select from '../Dropdown/Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Single: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Select value={value}
              onChange={setValue}>
        <Select.Trigger>
          {value[0] ?? '과일을 선택하세요'}
        </Select.Trigger>
        <Select.Options>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='banana'>Banana</Select.Option>
          <Select.Option value='orange'>Orange</Select.Option>
        </Select.Options>
      </Select>
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Select value={value}
              onChange={setValue}
              multiple>
        <Select.Trigger>
          {value.length ? value.join(', ') : '여러 개 선택'}
        </Select.Trigger>
        <Select.Options>
          <Select.Option value='apple'>Apple</Select.Option>
          <Select.Option value='banana'>Banana</Select.Option>
          <Select.Option value='orange'>Orange</Select.Option>
          <Select.Option value='grape'>Grape</Select.Option>
        </Select.Options>
      </Select>
    );
  },
};

export const CustomStyled: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <Select value={value}
              onChange={setValue}
              multiple>
        <Select.Trigger>
          <div
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: 6,
              minWidth: 200,
            }}
          >
            {value.length ? value.join(', ') : 'Custom Trigger'}
          </div>
        </Select.Trigger>
        <Select.Options>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              borderRadius: 6,
              padding: 4,
            }}
          >
            <Select.Option value='apple'>🍎 Apple</Select.Option>
            <Select.Option value='banana'>🍌 Banana</Select.Option>
            <Select.Option value='orange'>🍊 Orange</Select.Option>
          </div>
        </Select.Options>
      </Select>
    );
  },
};
