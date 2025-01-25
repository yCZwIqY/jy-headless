import { Meta, StoryObj } from '@storybook/react';
import NumberInput from '../src/components/input/NumberInput';
import React from 'react';
import UpArrowIcon from '../src/components/icons/UpArrowIcon';
import DownArrowIcon from '../src/components/icons/DownArrowIcon';
import { fn } from '@storybook/test';

const meta: Meta<typeof NumberInput> = {
  title: 'Common/Input/NumberInput',
  component: NumberInput,
  argTypes: {
    step: {
      control: 'number',
      description: 'Step value for increasing/decreasing the number',
    },
    min: {
      control: 'number',
      description: 'Minimum value for the input',
    },
    max: {
      control: 'number',
      description: 'Maximum value for the input',
    },
    increaseElement: {
      control: 'reactNode',
      description: 'Custom element to increase the value',
    },
    decreaseElement: {
      control: 'reactNode',
      description: 'Custom element to decrease the value',
    },
    value: {
      control: 'number',
      description: 'Current value of the input',
    },
  },
  args: { onClick: fn() },
} as StoryObj<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    step: 1,
    min: 0,
    max: 10,
    value: 5,
  },
};

export const WithMinMax: Story = {
  args: {
    min: 0,
    max: 10,
    value: 5,
  },
};

export const WithStep: Story = {
  args: {
    step: 2,
    value: 4,
  },
};

export const CustomButtons: Story = {
  args: {
    increaseElement: <UpArrowIcon color={'red'} />,
    decreaseElement: <DownArrowIcon color={'blue'} />,
    value: 5,
  },
};
