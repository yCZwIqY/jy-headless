import { Meta, StoryObj } from '@storybook/react';
import ImageInput, { ImageInputContext } from './ImageInput';
import { useContext, useState } from 'react';

const meta: Meta<typeof ImageInput> = {
  title: 'Inputs/Image Input',
  component: ImageInput,
};

export default meta;
type Story = StoryObj<typeof ImageInput>;

export const Default: Story = {
  render: () => {
    const [image, setImage] = useState<File | null>(null);
    return (
      <ImageInput id="default-image" value={image} onChange={setImage}>
        {!image && (
          <ImageInput.Uploader
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 180,
              height: 180,
              border: '2px dashed gray',
              borderRadius: 8,
              textAlign: 'center',
              lineHeight: '200px',
              cursor: 'pointer',
            }}
          >
            이미지 업로드
          </ImageInput.Uploader>
        )}
        <ImageInput.Preview
          style={{ display: 'block', marginTop: 10, width: 200, height: 'auto' }}
        />
      </ImageInput>
    );
  },
};

const DropUploader = () => {
  const { dragOver } = useContext(ImageInputContext);
  return (
    <ImageInput.Uploader
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 180,
        height: 180,
        border: '2px dashed #3b82f6',
        borderRadius: 8,
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: dragOver ? '#f0f8ff' : '#ffffff',
      }}
    >
      <div>
        드래그 또는 클릭해서
        <br /> 업로드
      </div>
    </ImageInput.Uploader>
  );
};
export const WithDragAndDrop: Story = {
  render: () => {
    const [image, setImage] = useState<File | null>(null);
    return (
      <ImageInput id="drag-image" value={image} onChange={setImage} draggable>
        {!image && <DropUploader />}
        <ImageInput.Preview
          style={{ display: 'block', marginTop: 10, width: 200, height: 'auto' }}
        />
      </ImageInput>
    );
  },
};
