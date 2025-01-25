import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from '../src/components/radio/RadioGroup';
import { fn } from '@storybook/test';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/Radio/RadioGroup',
  component: RadioGroup,
  layout: ['centered'],
  args: { onClick: fn() },
} as StoryObj<typeof RadioGroup>;

export default meta;

export const Default = {
  render: () => (
    <RadioGroup>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const MultiSelect = {
  render: () => (
    <RadioGroup allowMultiSelect>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Clearable = {
  render: () => (
    <RadioGroup clearable>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const MultiSelectClearable = {
  render: () => (
    <RadioGroup clearable allowMultiSelect>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const ReadOnly = {
  render: () => (
    <RadioGroup readOnly>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Disabled = {
  render: () => (
    <RadioGroup disabled>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const WithErrorMsg = {
  render: () => (
    <RadioGroup showError error={<div style={{ color: 'red' }}>this field is required</div>}>
      <RadioGroup.Item>1</RadioGroup.Item>
      <RadioGroup.Item>2</RadioGroup.Item>
      <RadioGroup.Item>3</RadioGroup.Item>
    </RadioGroup>
  ),
};
