import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from '../src/components/input/Input';

const meta: Meta<typeof Input> = {
  title: 'Common/Input/Input',
  component: Input,
  argTypes: {
    showLimit: {
      control: 'boolean',
      description: 'Whether to show the character limit',
    },
    prefixElement: {
      control: 'text',
      description: 'Prefix element to be displayed inside the input',
    },
    suffixElement: {
      control: 'text',
      description: 'Suffix element to be displayed inside the input',
    },
    showError: {
      control: 'boolean',
      description: 'Whether to display the error message',
    },
    error: {
      control: 'text',
      description: 'Error message or ReactNode to be displayed',
    },
    maxLength: {
      control: 'number',
      description: 'Maximum length of the input value',
    },
    value: {
      control: 'text',
      description: 'Current value of the input',
    },
  },
} as StoryObj<typeof Input>;

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    showLimit: false,
    placeholder: 'Type something...',
    maxLength: 20,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    prefixElement: <span style={{ marginRight: '4px' }}>$</span>,
    suffixElement: <span style={{ marginLeft: '4px' }}>USD</span>,
    placeholder: 'Enter amount',
    showLimit: true,
    maxLength: 10,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your email',
    showError: true,
    error: 'Invalid email address',
  },
};

export const WithLimit: Story = {
  args: {
    placeholder: 'Type something...',
    maxLength: 30,
    showLimit: true,
  },
};

export const CustomStyled: Story = {
  args: {
    placeholder: 'Custom styled input',
    containerStyle: { border: '1px solid #007BFF', padding: '8px', borderRadius: '8px' },
    style: { padding: '4px', width: '100%' },
  },
};
