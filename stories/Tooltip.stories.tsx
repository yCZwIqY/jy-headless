import { Meta, StoryObj } from '@storybook/react';
import Tooltip from '../src/components/tooltip/Tooltip';
import { userEvent, within } from '@storybook/test';
import { expect } from '@storybook/test';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  args: {
    tooltip: 'This is a tooltip',
    position: 'top',
  },
  argTypes: {
    position: { control: 'select', options: ['top', 'left', 'right', 'bottom'] },
  },
};

export default meta;

export const Default: StoryObj<typeof Tooltip> = {
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: '4px' }}>
        Hover me
      </button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.getByRole('button', { name: /hover me/i });

    await userEvent.hover(button);
    await expect(await canvas.findByText(/this is a tooltip/i)).toBeInTheDocument();

    await userEvent.unhover(button);
    await expect(canvas.queryByText(/this is a tooltip/i)).not.toBeInTheDocument();
  },
};

export const CustomStyle: StoryObj<typeof Tooltip> = {
  render: (args) => (
    <Tooltip
      {...args}
      style={{ display: 'inline-block' }}
      tooltip={
        <span
          style={{
            backgroundColor: '#222',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            width: '300px',
          }}
        >
          Custom Styled Tooltip
        </span>
      }
    >
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          borderRadius: '4px',
        }}
      >
        Hover me
      </button>
    </Tooltip>
  ),
};
