import { Meta, StoryObj } from '@storybook/react';
import Tab from '../src/components/tabs/Tab';

const meta: Meta<typeof Tab> = {
  title: 'Common/Others/Tab',
  component: Tab,
  layout: ['centered'],
} as StoryObj<typeof Tab>;

export default meta;

export const Default = {
  args: {},
};
