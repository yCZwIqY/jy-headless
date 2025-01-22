import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioInput from '../src/components/radio/RadioInput';

const meta: Meta<typeof RadioInput> = {
  title: 'Radio/RadioInput',
  component: RadioInput,
  layout: ['centered'],
} as StoryObj<typeof RadioInput>;

export default meta;

export const Default = {
  args: {
    children: 'label',
  },
};

export const Clearable = {
  args: {
    children: 'label',
    clearable: true,
  },
};

export const ReadOnly = {
  args: {
    children: 'label',
    readOnly: true,
  },
};

export const Disabled = {
  args: {
    children: 'label',
    disabled: true,
  },
};

export const WithErrorMsg = {
  args: {
    children: 'label',
    showError: true,
    error: <div style={{ color: 'red' }}>this field is required</div>,
  },
};
