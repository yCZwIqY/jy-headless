import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import useDropdown from '../../hooks/useDropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Selectors/Dropdown',
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const { selected, select, isOpen, toggle } = useDropdown('option1');
    return (
      <Dropdown selected={selected} select={select} isOpen={isOpen} toggle={toggle}>
        <Dropdown.Viewer>{selected}</Dropdown.Viewer>
        <Dropdown.Button> {isOpen ? '▼' : '▲'}</Dropdown.Button>
        <Dropdown.Options>
          <Dropdown.Option value="option1">Option 1</Dropdown.Option>
          <Dropdown.Option value="option2">Option 2</Dropdown.Option>
          <Dropdown.Option value="option3">Option 3</Dropdown.Option>
        </Dropdown.Options>
      </Dropdown>
    );
  },
};

export const CustomStyled: Story = {
  render: () => {
    const { selected, select, isOpen, toggle } = useDropdown();
    return (
      <Dropdown selected={selected} select={select} isOpen={isOpen} toggle={toggle}>
        <Dropdown.Button
          style={{
            padding: '10px',
            background: '#1e40af',
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {selected ?? 'Select a fruit'}
        </Dropdown.Button>

        <Dropdown.Options
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            marginTop: '4px',
            zIndex: 10,
          }}
        >
          {['Apple', 'Banana', 'Orange', 'Peach'].map((fruit) => (
            <Dropdown.Option
              key={fruit}
              value={fruit}
              style={{
                padding: '10px',
                cursor: 'pointer',
                background: selected === fruit ? '#e0f2fe' : 'white',
              }}
            >
              {fruit}
            </Dropdown.Option>
          ))}
        </Dropdown.Options>
      </Dropdown>
    );
  },
};
