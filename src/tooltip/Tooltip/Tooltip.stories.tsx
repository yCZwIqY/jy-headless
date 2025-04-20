import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => {
    return (
      <Tooltip
        position="top"
        style={{ margin: '100px', width: '100px', backgroundColor: '#eee', textAlign: 'center' }}
      >
        Top
        <Tooltip.Label
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Tooltip on top
        </Tooltip.Label>
      </Tooltip>
    );
  },
};

export const Bottom: Story = {
  render: () => {
    return (
      <Tooltip
        position="bottom"
        style={{ margin: '100px', width: '100px', backgroundColor: '#eee', textAlign: 'center' }}
      >
        Bottom
        <Tooltip.Label
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Tooltip at bottom
        </Tooltip.Label>
      </Tooltip>
    );
  },
};

export const Left: Story = {
  render: () => {
    return (
      <Tooltip
        position="left"
        style={{ margin: '100px', width: '100px', backgroundColor: '#eee', textAlign: 'center' }}
      >
        Left
        <Tooltip.Label
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Tooltip on left
        </Tooltip.Label>
      </Tooltip>
    );
  },
};
export const Right: Story = {
  render: () => {
    return (
      <Tooltip
        position="right"
        style={{ margin: '100px', width: '100px', backgroundColor: '#eee', textAlign: 'center' }}
      >
        Right
        <Tooltip.Label
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
          }}
        >
          Tooltip on right
        </Tooltip.Label>
      </Tooltip>
    );
  },
};

export const CustomTooltip: Story = {
  render: () => {
    return (
      <Tooltip
        position="top"
        style={{
          width: '120px',
          backgroundColor: '#f0f0f0',
          padding: '12px',
          borderRadius: '8px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        custom tooltip
        <Tooltip.Label
          style={{
            backgroundColor: '#1e1e1e',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          🎯 styled tooltip label
        </Tooltip.Label>
      </Tooltip>
    );
  },
};

export const LongTooltip = {
  render: () => {
    return (
      <Tooltip
        position="top"
        style={{ margin: '200px', width: '100px', backgroundColor: '#eee', textAlign: 'center' }}
      >
        Hover me
        <Tooltip.Label
          style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '10px',
            borderRadius: '6px',
            width: '200px',
            fontSize: '14px',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
          }}
        >
          이 툴팁은 아주 길고, 길어도 부모 요소가 함께 늘어나지 않아! 바닥 기준으로 툴팁이 떠있지롱
          🎈
        </Tooltip.Label>
      </Tooltip>
    );
  },
};
