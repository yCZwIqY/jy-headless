import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from '../src/components/button/Button';
import Spinner from '../src/components/spinner/Spinner';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    spinner: {
      control: 'text',
      description: 'Custom spinner element to show when loading',
    },
    prefixElement: {
      control: 'text',
      description: 'Element to display before the button text',
    },
    suffixElement: {
      control: 'text',
      description: 'Element to display after the button text',
    },
    children: {
      control: 'text',
      description: 'Content of the button',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Click Me',
    loading: false,
    style: {
      padding: '10px 20px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
    },
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    prefixElement: <span style={{ marginRight: '8px' }}>🚀</span>,
    suffixElement: <span style={{ marginLeft: '8px' }}>🔥</span>,
    children: 'Launch',
    style: {
      padding: '10px 20px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
    },
  },
};

export const LoadingState: Story = {
  args: {
    children: 'Submitting',
    loading: true,
    spinner: <Spinner color={'white'} size={'1em'} />,
    style: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
    },
  },
};

export const CustomStyled: Story = {
  args: {
    children: 'Custom Button',
    style: {
      padding: '12px 24px',
      backgroundColor: '#17a2b8',
      color: 'white',
      border: '2px solid #117a8b',
      borderRadius: '8px',
      fontWeight: 'bold',
    },
  },
};
