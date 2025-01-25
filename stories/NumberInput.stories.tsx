import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CallIcon, CloseIcon } from '../src/components/icons';
import NumberInput from '../src/components/input/NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Common/Input/NumberInput',
  component: NumberInput,
  layout: 'centered',
} as StoryObj<typeof NumberInput>;

export default meta;

export const Default: StoryObj<typeof NumberInput> = {
  args: {
    style: {
      margin: '0 5px',
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};
