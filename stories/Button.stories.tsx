import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Button from '../src/components/button/Button';
import { HomeIcon } from '../src/components/icons';
import SearchIcon from '../src/components/icons/SearchIcon';

const meta: Meta<typeof Button> = {
  title: 'Common/Button/Button',
  component: Button,
  layout: ['centered'],
} as StoryObj<typeof Button>;

export default meta;

export const Default = {
  args: {
    children: 'button',
  },
};

export const Loading = {
  args: {
    children: 'button',
    loading: true,
  },
};

export const WithPrefix = {
  args: {
    prefixElement: <HomeIcon />,
    children: 'Home',
  },
};

export const WithSuffix = {
  args: {
    suffixElement: <SearchIcon />,
    children: 'Search',
  },
};
