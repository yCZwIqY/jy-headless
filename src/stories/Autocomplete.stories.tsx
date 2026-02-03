import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Autocomplete } from '../Autocomplete';

const meta: Meta<typeof Autocomplete> = {
  title: 'Components/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

const OPTIONS = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'peach', label: 'Peach' },
];

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Autocomplete value={value}
                    onChange={setValue}>
        <Autocomplete.Input
          placeholder='과일 검색...'
          style={{
            padding: '8px 12px',
            width: 220,
            border: '1px solid #ccc',
            borderRadius: 6,
          }}
        />
        <Autocomplete.Options
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 6,
            marginTop: 4,
            overflow: 'hidden',
          }}
        >
          {OPTIONS.map((o) => (
            <Autocomplete.Option
              key={o.value}
              value={o.value}
              label={o.label}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
              }}
            />
          ))}
        </Autocomplete.Options>
      </Autocomplete>
    );
  },
};

export const ControlledInput: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);
    const [input, setInput] = useState('');

    return (
      <Autocomplete
        value={value}
        onChange={setValue}
        inputValue={input}
        onInputChange={setInput}
      >
        <Autocomplete.Input
          placeholder='controlled input...'
          style={{
            padding: '8px 12px',
            width: 220,
            border: '1px solid #ccc',
            borderRadius: 6,
          }}
        />
        <Autocomplete.Options
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 6,
          }}
        >
          {OPTIONS.map((o) => (
            <Autocomplete.Option
              key={o.value}
              value={o.value}
              label={o.label}
              style={{ padding: 8 }}
            />
          ))}
        </Autocomplete.Options>
      </Autocomplete>
    );
  },
};

export const CustomStyled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>(null);

    return (
      <Autocomplete value={value}
                    onChange={setValue}>
        <Autocomplete.Input
          placeholder='🍓 과일을 골라보세요'
          style={{
            padding: '10px 14px',
            width: 260,
            border: '2px solid #6366f1',
            borderRadius: 12,
            outline: 'none',
          }}
        />
        <Autocomplete.Options
          style={{
            background: '#111',
            color: '#fff',
            borderRadius: 12,
            marginTop: 6,
            padding: 6,
          }}
        >
          {OPTIONS.map((o) => (
            <Autocomplete.Option
              key={o.value}
              value={o.value}
              label={o.label}
              style={{
                padding: '10px 12px',
                borderRadius: 8,
              }}
            >
              🍇 {o.label}
            </Autocomplete.Option>
          ))}
        </Autocomplete.Options>
      </Autocomplete>
    );
  },
};
