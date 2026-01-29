import { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# Popover

마우스 호버 시 타겟 요소 주변에 추가 정보를 표시하는 컴포넌트입니다.

## 주요 기능

- **8방향 배치**: 상단(좌/중앙/우), 하단(좌/중앙/우), 좌측, 우측 총 8가지 방향으로 팝오버를 배치할 수 있습니다.
- **Portal 렌더링**: DOM 트리 구조와 무관하게 document.body에 렌더링되어 z-index 이슈를 방지합니다.
- **자동 위치 계산**: 타겟 요소의 위치와 크기를 기반으로 팝오버의 위치를 자동으로 계산합니다.
- **마우스 인터랙션**: 마우스를 올리면 표시되고, 벗어나면 자동으로 숨겨집니다.

## 사용 예시

\`\`\`tsx
<Popover 
  direction="top-center" 
  popover={<div>추가 정보</div>}
>
  <button>호버해보세요</button>
</Popover>
\`\`\`

## Props

- **children**: 팝오버를 트리거할 타겟 요소
- **popover**: 팝오버에 표시될 콘텐츠
- **direction**: 팝오버가 표시될 방향 (기본값: 'top')
- **gap**: 타겟 요소와 팝오버 사이의 간격 (px, 기본값: 0)
- **key**: Portal의 고유 식별자 (선택사항)
        `,
      },
    },
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

type Story = StoryObj<typeof Popover>;

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
      <Popover {...args} popover={'top-left'} direction={'top-left'} />
      <Popover {...args} popover={'top-center / top'} direction={'top-center'} />
      <Popover {...args} popover={'top-right'} direction={'top-right'} />
      <Popover {...args} popover={'left'} direction={'left'} />
      <span />
      <Popover {...args} popover={'right'} direction={'right'} />
      <Popover {...args} popover={'bottom-left'} direction={'bottom-left'} />
      <Popover {...args} popover={'bottom-center / bottom'} direction={'bottom-center'} />
      <Popover {...args} popover={'bottom-right'} direction={'bottom-right'} />
    </div>
  ),
};
