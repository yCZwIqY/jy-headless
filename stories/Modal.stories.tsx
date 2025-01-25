import { Meta, StoryObj } from '@storybook/react';
import Modal from '../src/components/modal/Modal';
import React from 'react';
import { Button, CloseIcon } from '../src';

const meta: Meta<typeof Modal> = {
  title: 'Common/Modal/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Modal>;

export default meta;

export const Default: StoryObj<typeof Modal> = {
  args: {
    opener: (
      <Button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Open Modal
      </Button>
    ),
    targetSelector: '#storybook-docs',
    children: (
      <Modal.Overlay>
        <div
          style={{
            width: '500px',
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Modal Header</h3>
          <p style={{ fontSize: '16px', marginBottom: '20px', color: '#666' }}>
            This is the modal body content. You can place any content here.
          </p>
          <Modal.Closer
            prefixElement={<CloseIcon />}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
              backgroundColor: '#FF4D4F',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Close Modal
          </Modal.Closer>
        </div>
      </Modal.Overlay>
    ),
  },
};
