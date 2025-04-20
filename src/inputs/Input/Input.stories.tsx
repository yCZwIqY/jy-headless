import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Inputs/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithPrefix: Story = {
  args: {
    prefixElement: <span>@</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    suffixElement: <span>.com</span>,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    prefixElement: <span>@</span>,
    suffixElement: <span>.com</span>,
  },
};

export const ShowLimit: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    return (
      <Input
        showLimit
        maxLength={10}
        wrapperStyle={{
          border: '1px solid black',
          padding: '2px',
        }}
        style={{
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const CustomStyled: Story = {
  args: {
    placeholder: 'Styled Input',
    wrapperClass: ['custom-input-wrapper'],
    wrapperStyle: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      backgroundColor: '#f0f0f0',
    },
    prefixElement: <span style={{ marginRight: '4px' }}>📧</span>,
    suffixElement: <span style={{ marginLeft: '4px' }}>.dev</span>,
  },
};

export const WithThrottle: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [throttledValue, setThrottledValue] = useState('');

    return (
      <div>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onThrottledChange={(e) => setThrottledValue(e.target.value)}
        />
        <div>value: {value}</div>
        <div>throttledValue: {throttledValue}</div>
      </div>
    );
  },
};
