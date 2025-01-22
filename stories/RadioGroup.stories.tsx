import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from '../src/components/radio/RadioGroup';
import { fn } from '@storybook/test';

const meta: Meta<typeof RadioGroup> = {
  title: 'Radio/RadioGroup',
  component: RadioGroup,
  layout: ['centered'],
  args: { onClick: fn() },
} as StoryObj<typeof RadioGroup>;

export default meta;

export const Default = {
  args: {
    title: <div>Radio Group</div>,
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
  },
};

export const MultiSelect = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    allowMultiSelect: true,
  },
};

export const Clearable = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    clearable: true,
  },
};

export const MultiSelectClearable = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    clearable: true,
    allowMultiSelect: true,
  },
};

export const ReadOnly = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    readOnly: true,
  },
};

export const Disabled = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    disabled: true,
  },
};

export const WithErrorMsg = {
  args: {
    children: (
      <>
        <RadioGroup.Item>1</RadioGroup.Item>
        <RadioGroup.Item>2</RadioGroup.Item>
        <RadioGroup.Item>3</RadioGroup.Item>
      </>
    ),
    error: <div style={{ color: 'red' }}>this field is required</div>,
  },
};
