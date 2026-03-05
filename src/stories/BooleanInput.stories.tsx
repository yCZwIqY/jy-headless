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
    switchActiveColor: {
      control: 'color',
      description: '스위치 활성 배경색',
    },
    switchInactiveColor: {
      control: 'color',
      description: '스위치 비활성 배경색',
    },
    switchThumbColor: {
      control: 'color',
      description: '스위치 기본 thumb 색상',
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

export const CustomSwitchColors: Story = {
  args: {
    variant: 'switch',
    label: '색상 커스텀',
    switchActiveColor: '#4a4a4a',
    switchInactiveColor: '#d6d6d6',
  },
};

export const CustomSwitchThumbColor: Story = {
  args: {
    variant: 'switch',
    label: 'thumb 색상 커스텀',
    switchThumbColor: '#1f1f1f',
  },
};

export const CustomSwitchThumb: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <BooleanInput
        {...args}
        variant='switch'
        label='thumb 대체'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        switchWidth={56}
        switchHeight={30}
        thumbSize={26}
        switchThumb={({ checked: isChecked }) => (
          <span
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              backgroundColor: isChecked ? '#151515' : '#f5f5f5',
              color: isChecked ? '#ffffff' : '#5f5f5f',
              border: '1px solid #c9c9c9',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {isChecked ? 'ON' : 'OFF'}
          </span>
        )}
      />
    );
  },
};

export const CustomCheckboxInput: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);

    return (
      <BooleanInput
        {...args}
        variant='checkbox'
        label='커스텀 체크박스'
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        checkboxInput={({ checked: isChecked, disabled }) => (
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 4,
              border: `1px solid ${disabled ? '#bababa' : '#777'}`,
              backgroundColor: isChecked ? '#585858' : '#ffffff',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              lineHeight: 1,
              transition: 'all 0.2s ease',
            }}
          >
            {isChecked ? '✓' : ''}
          </span>
        )}
      />
    );
  },
};
