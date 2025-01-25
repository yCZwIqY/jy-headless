import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Input from '../src/components/input/Input';
import { CallIcon, CloseIcon } from '../src/components/icons';

const meta: Meta<typeof Input> = {
  title: 'Common/Input/Input',
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
    prefixElement: <CallIcon />,
    containerStyle: {
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};

export const WithSuffix: StoryObj<typeof Input> = {
  args: {
    suffixElement: <CloseIcon />,
    containerStyle: {
      outline: '1px solid black',
      borderRadius: '2px',
      padding: '2px',
    },
  },
};

export const WithErrorMsg: StoryObj<typeof Input> = {
  args: {
    suffixElement: <CloseIcon />,
    containerStyle: {
      outline: '1px solid red',
      borderRadius: '2px',
      padding: '2px',
    },
    showError: true,
    error: (
      <div style={{ color: 'red', position: 'absolute', top: '100%' }}>this field is required</div>
    ),
  },
};
