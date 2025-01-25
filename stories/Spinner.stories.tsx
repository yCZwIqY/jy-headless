import { Meta, StoryObj } from '@storybook/react';
import Spinner from '../src/components/spinner/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Common/Others/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
  },
} as StoryObj<typeof Spinner>;

export default meta;

export const Default = {
  args: {
    // tabs: ,
  },
};
