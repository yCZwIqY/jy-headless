import { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-center',
        'top',
        'top-right',
        'left',
        'right',
        'bottom-left',
        'bottom',
        'bottom-center',
        'bottom-right',
      ],
      description: '툴팁이 나타날 방향을 설정합니다.',
    },
    children: {
      control: { type: 'text' },
      description: '툴팁을 트리거하는 요소입니다.',
    },
    popover: {
      control: { type: 'text' },
      description: '툴팁 내부에 표시될 내용입니다.',
    },
    rootId: {
      control: { type: 'text' },
      description: '포탈을 렌더링할 DOM 노드의 ID입니다. 기본값은 "root"입니다.',
    },
    domNode: {
      control: { type: 'object' },
      description: '포탈을 렌더링할 DOM 노드입니다. rootId보다 우선합니다.',
    },
    key: {
      control: { type: 'text' },
      description: 'React Portal의 key 속성입니다.',
    },
  },
  args: {
    rootId: 'storybook-root',
  },
};

// 스토리 한글로 작성

export default meta;

type Story = StoryObj<typeof Popover>;

export const Top: Story = {
  args: {
    direction: 'top',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const Bottom: Story = {
  args: {
    direction: 'bottom',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const Left: Story = {
  args: {
    direction: 'left',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const Right: Story = {
  args: {
    direction: 'right',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const TopLeft: Story = {
  args: {
    direction: 'top-left',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const TopCenter: Story = {
  args: {
    direction: 'top-center',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const TopRight: Story = {
  args: {
    direction: 'top-right',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const BottomLeft: Story = {
  args: {
    direction: 'bottom-left',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const BottomCenter: Story = {
  args: {
    direction: 'bottom-center',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};

export const BottomRight: Story = {
  args: {
    direction: 'bottom-right',
    children: <button>마우스를 올리면 툴팁이 나타납니다.</button>,
    popover: (
      <div style={{ padding: '10px', border: '1px solid black', background: 'white' }}>
        툴팁 내용입니다.
      </div>
    ),
  },
};
