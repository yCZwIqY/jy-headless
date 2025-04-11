import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Click me',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    children: 'Click me',
    readOnly: true,
  },
};

export const Loading: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    return (
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1500);
        }}
      >
        {loading ? 'Loading...' : 'Click to Loading'}
      </Button>
    );
  },
};
