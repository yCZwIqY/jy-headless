import { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../src/components/dropdown/Dropdown';
import React, { useState } from 'react';
import Input from '../src/components/input/Input';
import DownArrowIcon from '../src/components/icons/DownArrowIcon';

const meta: Meta<typeof Dropdown> = {
  title: 'Common/input/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  args: {
    defaultValue: 'option1',
    iconPosition: 'right',
    optionPosition: 'down',
  },
  argTypes: {
    optionPosition: {
      control: { type: 'select' },
      options: ['top', 'down'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'none'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Dropdown {...args} value={value} onChange={(newValue) => setValue(newValue)}>
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
        <Dropdown.Item value="option3">Option 3</Dropdown.Item>
      </Dropdown>
    );
  },
};

export const WithCustomStyle: Story = {
  render: (args) => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Dropdown
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        style={{
          display: 'flex',
          width: '150px',
          justifyContent: 'space-between',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
          cursor: 'pointer',
        }}
        optionStyle={{ marginTop: '10px', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
      >
        <Dropdown.Item
          value="option1"
          style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            borderBottom: '1px solid #eee',
          }}
        >
          Option 1
        </Dropdown.Item>
        <Dropdown.Item
          value="option2"
          style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            cursor: 'pointer',
            borderBottom: '1px solid #eee',
          }}
        >
          Option 2
        </Dropdown.Item>
        <Dropdown.Item
          value="option3"
          style={{
            padding: '8px 16px',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
        >
          Option 3
        </Dropdown.Item>
      </Dropdown>
    );
  },
  args: {
    icon: <DownArrowIcon color={'red'} />,
  },
};
