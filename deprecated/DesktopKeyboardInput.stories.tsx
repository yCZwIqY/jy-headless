import { Meta, StoryObj } from '@storybook/react';
import DesktopKeyboardInput from './DesktopKeyboardInput';
import { CSSProperties } from 'react';

const meta: Meta<typeof DesktopKeyboardInput> = {
  title: 'Common/Input/DesktopKeyboardInput',
  component: DesktopKeyboardInput,
  layout: 'centered',
} as StoryObj<typeof DesktopKeyboardInput>;

export default meta;

type Story = StoryObj<typeof DesktopKeyboardInput>;

const cellStyle: CSSProperties = {
  height: '45px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  backgroundColor: 'lightgray',
  padding: '3px',
  textAlign: 'center',
  fontSize: '11px',
};
export const Default: Story = {
  args: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    cellStyle: cellStyle,
    activeCellStyle: {
      ...cellStyle,
      backgroundColor: 'darkgrey',
    },
    onKeyUp: (e) => {
      console.log(e);
    },
  },
};

export const WithoutFunctionKeys: Story = {
  args: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    cellStyle: cellStyle,
    activeCellStyle: {
      ...cellStyle,
      backgroundColor: 'darkgrey',
    },
    hasFunction: false,
    onKeyUp: (e) => {
      console.log(e);
    },
  },
};

export const RoundedStyle: Story = {
  args: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    cellStyle: {
      height: '45px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '25px', // 둥근 모서리 스타일
      backgroundColor: 'lightblue',
      padding: '3px',
      textAlign: 'center',
      fontSize: '11px',
    },
    activeCellStyle: {
      height: '45px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '25px', // 둥근 모서리 스타일
      backgroundColor: 'darkblue',
      padding: '3px',
      textAlign: 'center',
      fontSize: '11px',
      color: 'white',
    },
    onKeyUp: (e) => {
      console.log(e);
    },
  },
};

export const SquareStyle: Story = {
  args: {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
    },
    cellStyle: {
      height: '45px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '0', // 직선 모서리 스타일
      backgroundColor: 'lightgreen',
      padding: '3px',
      textAlign: 'center',
      fontSize: '11px',
    },
    activeCellStyle: {
      height: '45px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '0', // 직선 모서리 스타일
      backgroundColor: 'darkgreen',
      padding: '3px',
      textAlign: 'center',
      fontSize: '11px',
    },
    onKeyUp: (e) => {
      console.log(e);
    },
  },
};
