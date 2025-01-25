import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import RadioGroup from '../src/components/radio/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Common/Radio/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const MultiSelect: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup allowMultiSelect style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Clearable: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup clearable style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const MultiSelectClearable: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup
      clearable
      allowMultiSelect
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
    >
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const ReadOnly: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup readOnly style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const Disabled: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup disabled style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};

export const WithErrorMsg: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup
      style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
      showError
      error={
        <div
          style={{
            position: 'absolute',
            top: '100%',
            width: '200px',
            color: 'red',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          This field is required.
        </div>
      }
    >
      <RadioGroup.Item>Option 1</RadioGroup.Item>
      <RadioGroup.Item>Option 2</RadioGroup.Item>
      <RadioGroup.Item>Option 3</RadioGroup.Item>
    </RadioGroup>
  ),
};
