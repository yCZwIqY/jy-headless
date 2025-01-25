import { Meta, StoryObj } from '@storybook/react';
import Accordion from '../src/components/accordion/Accordion';
import React, { useState } from 'react';
import DownArrowIcon from '../src/components/icons/DownArrowIcon';
import UpArrowIcon from '../src/components/icons/UpArrowIcon';

const meta: Meta<typeof Accordion> = {
  title: 'Common/Others/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
} as StoryObj<typeof Accordion>;

export default meta;

export const Default = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Accordion isOpen={isOpen} setIsOpen={setIsOpen}>
        <Accordion.Summary
          icon={isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          Summary
        </Accordion.Summary>
        {isOpen && (
          <Accordion.Detail
            style={{
              backgroundColor: '#f1f3f5',
              padding: '10px 20px',
              borderRadius: '8px',
              color: '#666',
            }}
          >
            Detail
          </Accordion.Detail>
        )}
      </Accordion>
    );
  },
};

export const CustomArrow = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Accordion isOpen={isOpen} setIsOpen={setIsOpen}>
        <Accordion.Summary
          icon={isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
          style={{
            backgroundColor: isOpen ? '#007bff' : '#f8f9fa',
            padding: '12px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            color: isOpen ? 'white' : '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease, color 0.3s ease',
            boxShadow: isOpen ? '0px 2px 5px rgba(0, 123, 255, 0.5)' : 'none',
          }}
        >
          Summary
        </Accordion.Summary>
        {isOpen && (
          <Accordion.Detail
            style={{
              backgroundColor: '#e9ecef',
              padding: '10px 20px',
              borderRadius: '8px',
              marginTop: '8px',
              color: '#495057',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            Detail
          </Accordion.Detail>
        )}
      </Accordion>
    );
  },
};
