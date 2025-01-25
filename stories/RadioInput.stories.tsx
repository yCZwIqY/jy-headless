import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioInput from '../src/components/radio/RadioInput';

const meta: Meta<typeof RadioInput> = {
  title: 'Common/Radio/RadioInput',
  component: RadioInput,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof RadioInput> = {
  args: {
    children: 'Default Label',
  },
};

export const Clearable: StoryObj<typeof RadioInput> = {
  args: {
    children: 'Clearable Label',
    clearable: true,
  },
};

export const ReadOnly: StoryObj<typeof RadioInput> = {
  args: {
    children: 'Read-Only Label',
    readOnly: true,
  },
};

export const Disabled: StoryObj<typeof RadioInput> = {
  args: {
    children: 'Disabled Label',
    disabled: true,
  },
};

export const WithErrorMsg: StoryObj<typeof RadioInput> = {
  args: {
    children: 'Label with Error',
    showError: true,
    error: (
      <div
        style={{
          marginTop: '8px',
          color: 'red',
          fontSize: '14px',
          fontWeight: 'bold',
        }}
      >
        This field is required.
      </div>
    ),
  },
};
