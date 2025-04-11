import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
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
