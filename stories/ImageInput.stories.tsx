import { Meta, StoryObj } from '@storybook/react';
import ImageInput from '../src/components/input/ImageInput';
import React, { useState } from 'react';

const meta: Meta<typeof ImageInput> = {
  title: 'Common/Input/ImageInput',
  component: ImageInput,
} as StoryObj<typeof ImageInput>;

export default meta;

type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {
  args: {
    preview: '',
  },
};

export const WithCustomDefaultInput: Story = {
  render: (args) => {
    const [preview, setPreview] = useState<string>('');

    const handleFileChange = (url: string) => {
      setPreview(url);
    };

    return <ImageInput {...args} preview={preview} onFileChange={handleFileChange} />;
  },
  args: {
    defaultElement: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '120px',
          height: '120px',
          backgroundColor: '#cecece',
          borderRadius: '10px',
        }}
      >
        <span style={{ color: '#919191', fontSize: '24px' }}>+</span>
      </div>
    ),
    preview: '',
  },
};
