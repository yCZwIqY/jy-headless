import React, { HTMLAttributes, ReactNode } from 'react';
import ImagePlusIcon from '../icons/ImagePlusIcon';

interface ImageInput extends HTMLAttributes<HTMLInputElement> {
  onFileChange: (url: string) => void;
  defaultElement?: ReactNode;
  preview: string;
}

const ImageInput = ({
  id = crypto.randomUUID(),
  preview,
  defaultElement = (
    <ImagePlusIcon
      style={{ borderRadius: '10px' }}
      bgColor={'#cecece'}
      color={'#919191'}
      size={'120px'}
    />
  ),
  onFileChange,
  onChange,
  style,
  className,
  children,
}: ImageInput) => {
  const onFileInput = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        onFileChange(e.target?.result as string);
      };
    }
    onChange(e);
    reader.readAsDataURL(file as Blob);
  };

  return (
    <span>
      <label htmlFor={id}>
        {preview ? (
          <span
            role={'img'}
            style={{
              display: 'inline-block',
              background: `url(${preview}) no-repeat center/cover`,
              ...style,
            }}
            className={className}
          >
            {children}
          </span>
        ) : (
          defaultElement
        )}
      </label>
      <input
        id={id}
        type="file"
        style={{ display: 'none' }}
        accept={'image/*'}
        onChange={onFileInput}
      />
    </span>
  );
};

export default ImageInput;
