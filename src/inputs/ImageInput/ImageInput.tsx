import {
  ChangeEvent,
  createContext,
  DragEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ImageAttribute,
  ImageInputContextData,
  ImageInputProps,
  ImageType,
  LabelAttribute,
} from '../../types';

export const ImageInputContext = createContext<ImageInputContextData | null>(null);

const getAccepts = (accepts: ImageType[]) => {
  return accepts && accepts.length > 0 ? accepts.map((it) => `image/${it}`).join() : 'image/*';
};

const ImageInputRoot = ({
  accepts,
  id,
  value,
  draggable = false,
  onChange,
  children,
  ...props
}: ImageInputProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);
  const inputId = [id, 'image-input'].join('-');

  useEffect(() => {
    if (!value) setPreviewUrl('');
  }, [value]);

  const setImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl((e.target as FileReader).result as string);
    };

    reader.readAsDataURL(file);
  };
  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(file);
    onChange?.(file);
  };

  const onDrop = (e: DragEvent<HTMLSpanElement>) => {
    if (!draggable) return;
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImagePreview(file);
      onChange?.(file);
    }
  };

  const onDragOver = (e: DragEvent) => {
    if (!draggable) return;
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  return (
    <span
      {...props}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        data-testid={inputId}
        id={inputId}
        type={'file'}
        accept={getAccepts(accepts ?? [])}
        onChange={onImageChange}
        style={{ display: 'none' }}
      />
      <ImageInputContext.Provider value={{ id: inputId, previewUrl, dragOver }}>
        {children}
      </ImageInputContext.Provider>
    </span>
  );
};

const ImageInputUploader = ({ children, ...props }: LabelAttribute) => {
  const context = useContext(ImageInputContext);
  if (!context) {
    throw new Error('ImageInput.* 컴포넌트는 ImageInput 내에서만 사용해야 합니다.');
  }
  const { id } = context;

  return (
    <label htmlFor={id ?? ''} {...props}>
      {children}
    </label>
  );
};
const ImageInputPreview = ({ src: defaultSrc, ...props }: ImageAttribute) => {
  const context = useContext(ImageInputContext);
  if (!context) {
    throw new Error('ImageInput.* 컴포넌트는 ImageInput 내에서만 사용해야 합니다.');
  }
  const { previewUrl } = context;
  return <img {...props} src={previewUrl ?? defaultSrc ?? ''} />;
};

const ImageInput = Object.assign(ImageInputRoot, {
  Preview: ImageInputPreview,
  Uploader: ImageInputUploader,
});

export default ImageInput;
