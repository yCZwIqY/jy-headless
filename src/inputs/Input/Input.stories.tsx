import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

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
