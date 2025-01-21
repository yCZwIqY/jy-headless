import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from '../src/components/input/Input';
import { CallIcon, CloseIcon } from '../src/components/icons';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  layout: 'centered',
} as StoryObj<typeof Input>;

export default meta;

export const Default: StoryObj<typeof Input> = {
  args: {
    containerStyle: {
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};

export const WithPrefix: StoryObj<typeof Input> = {
  args: {
    prefixElement: <CallIcon size={'20px'} />,
    containerStyle: {
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};

export const WithSuffix: StoryObj<typeof Input> = {
  args: {
    suffixElement: <CloseIcon size={'20px'} />,
    containerStyle: {
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};
