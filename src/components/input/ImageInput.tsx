import React, { HTMLAttributes, JSX, ReactNode } from 'react';
import ImagePlusIcon from '../icons/ImagePlusIcon';
import generateHash from '../utils/generateHash';

interface ImageInput extends HTMLAttributes<HTMLInputElement> {
  onFileChange: (url: string) => void;
  defaultElement?: ReactNode | JSX.Element;
  preview: string;
}

const ImageInput = ({
  id = generateHash(),
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
      reader.onload = (fileEvent) => {
        if (fileEvent) {
          onFileChange(fileEvent.target?.result as string);
          reader.readAsDataURL(file as Blob);
        }
      };
    }
    onChange?.(e);
  };

  return (
    <span data-testid={'image-input-wrapper'}>
      <label htmlFor={id}>
        {preview ? (
          <span
            data-testid={'image-input-preview'}
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
        data-testid={'image-input'}
        type="file"
        style={{ display: 'none' }}
        accept={'image/*'}
        onChange={onFileInput}
      />
    </span>
  );
};

export default ImageInput;
