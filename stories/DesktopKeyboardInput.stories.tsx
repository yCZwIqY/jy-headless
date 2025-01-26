import { Meta, StoryObj } from '@storybook/react';
import DesktopKeyboardInput from '../src/components/input/DesktopKeyboardInput';
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
