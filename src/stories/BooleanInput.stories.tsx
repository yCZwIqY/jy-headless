import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BooleanInput } from '../Input';

const meta = {
  title: 'Components/Input/BooleanInput',
  component: BooleanInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['checkbox', 'switch'],
      description: '입력 UI 형태',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    switchWidth: {
      control: 'number',
      description: '스위치 너비(px)',
    },
    switchHeight: {
      control: 'number',
      description: '스위치 높이(px)',
    },
    thumbSize: {
      control: 'number',
      description: 'thumb 크기(px)',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
} satisfies Meta<typeof BooleanInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checkbox: Story = {
  args: {
    variant: 'checkbox',
    label: '약관에 동의합니다',
  },
};

export const Switch: Story = {
  args: {
    variant: 'switch',
    label: '알림 받기',
  },
};

export const ControlledSwitch: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <BooleanInput
          {...args}
          variant='switch'
          label='다크모드'
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          현재 상태: {checked ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    variant: 'switch',
    label: '비활성 스위치',
    disabled: true,
    defaultChecked: true,
  },
};

export const CustomSizeSwitch: Story = {
  args: {
    variant: 'switch',
    label: '커스텀 크기',
    switchWidth: 64,
    switchHeight: 34,
    thumbSize: 26,
  },
};
