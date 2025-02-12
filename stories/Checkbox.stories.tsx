import { Meta, StoryObj } from '@storybook/react';
import Checkbox from '../src/components/checkbox/Checkbox';
import { expect, userEvent, within } from '@storybook/test';

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: 'Common/Checkbox/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
} as Story;
export default meta;

export const Default: Story = {
  args: {
    children: 'check me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.getByRole('checkbox', {});
    const label = await canvas.getByRole('label', { name: 'check me' });

    // checkbox 클릭 시
    await userEvent.click(checkbox);
    await expect(await checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(await checkbox).not.toBeChecked();

    // 라벨 클릭시
    await userEvent.click(label);
    await expect(await checkbox).toBeChecked();
    await userEvent.click(label);
    await expect(await checkbox).not.toBeChecked();
  },
};
