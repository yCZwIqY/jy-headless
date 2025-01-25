import { Meta, StoryObj } from '@storybook/react';
import Modal from '../src/components/modal/Modal';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal/Modal',
  component: Modal,
  layout: ['centered'],
} as StoryObj<typeof Modal>;

export default meta;

export const Default = {
  args: {
    children: 'button',
  },
};
