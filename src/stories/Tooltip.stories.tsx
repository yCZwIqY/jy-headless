import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../Tooltip/Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      description: '팝오버가 표시될 방향을 지정합니다.',
      control: 'select',
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
    },
    children: {
      description: '팝오버를 트리거할 타겟 요소입니다.',
    },
    popover: {
      description: '팝오버에 표시될 콘텐츠입니다.',
    },
    gap: {
      description: '타겟 요소와 팝오버 사이의 간격(px)입니다.',
      control: 'number',
    },
    key: {
      description: 'Portal의 고유 식별자입니다. 여러 팝오버를 구분할 때 사용합니다.',
    },
  },
  args: {
    targetId: 'storybook-root',
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Direction: Story = {
  name: '방향별 배치',
  parameters: {
    docs: {
      description: {
        story: '팝오버를 8가지 방향으로 배치한 예시입니다. 각 버튼에 마우스를 올려보세요.',
      },
    },
  },
  args: {
    children: (
      <div
        style={{
          padding: '4px',
          border: '1px solid black',
          textAlign: 'center',
          borderRadius: '8px',
        }}
      >
        팝오버 테스트
      </div>
    ),
  },
  render: (args) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
      <Tooltip {...args} popover={'top-left'} direction={'top-left'} />
      <Tooltip {...args} popover={'top-center / top'} direction={'top-center'} />
      <Tooltip {...args} popover={'top-right'} direction={'top-right'} />
      <Tooltip {...args} popover={'left'} direction={'left'} />
      <span />
      <Tooltip {...args} popover={'right'} direction={'right'} />
      <Tooltip {...args} popover={'bottom-left'} direction={'bottom-left'} />
      <Tooltip {...args} popover={'bottom-center / bottom'} direction={'bottom-center'} />
      <Tooltip {...args} popover={'bottom-right'} direction={'bottom-right'} />
    </div>
  ),
};
