import { Meta, StoryObj } from '@storybook/react';
import Modal from '../src/components/modal/Modal';
import React from 'react';
import { Button, CloseIcon } from '../src';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal/Modal',
  component: Modal,
  layout: ['centered'],
} as StoryObj<typeof Modal>;

export default meta;

export const Default = {
  args: {
    opener: <Button>open dialog</Button>,
    targetSelector: '#storybook-docs',
    children: (
      <Modal.Overlay>
        <div
          style={{
            width: '500px',
            backgroundColor: 'white',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3>Modal Header</h3>
          <p>Modal body</p>
          <Modal.Closer prefixElement={<CloseIcon />} style={{ all: 'unset' }}></Modal.Closer>
        </div>
      </Modal.Overlay>
    ),
  },
};
