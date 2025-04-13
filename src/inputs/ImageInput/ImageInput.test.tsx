import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageInput from './ImageInput';

describe('ImageInput', () => {
  it('업로더와 프리뷰가 렌더링 된다.', () => {
    render(
      <ImageInput id="img-test">
        <ImageInput.Uploader data-testid="uploader">업로드</ImageInput.Uploader>
        <ImageInput.Preview data-testid="preview" />
      </ImageInput>,
    );

    expect(screen.getByTestId('uploader')).toBeInTheDocument();
    expect(screen.getByTestId('preview')).toBeInTheDocument();
  });

  it('input[type=file]이 숨겨진 채로 렌더링 된다.', () => {
    render(<ImageInput id="hidden" />);
    const input = screen.getByTestId('hidden-image-input');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveStyle({ display: 'none' });
  });

  it('onChange가 이미지 선택 시 호출된다.', async () => {
    const onChange = jest.fn();
    render(<ImageInput id="select-test" onChange={onChange} />);
    const input = screen.getByTestId('select-test-image-input');

    const file = new File(['hello'], 'hello.png', { type: 'image/png' });
    await userEvent.upload(input, file);

    expect(onChange).toHaveBeenCalledWith(file);
  });

  it('드래그 앤 드롭 시 이미지가 업로드되고 onChange가 호출된다.', () => {
    const onChange = jest.fn();
    render(<ImageInput id="drop-test" onChange={onChange} draggable />);

    const dropZone = screen.getByTestId('drop-test-image-input').parentElement!;
    const file = new File(['dummy'], 'image.png', { type: 'image/png' });

    const data = {
      dataTransfer: {
        files: [file],
        items: [
          {
            kind: 'file',
            type: 'image/png',
            getAsFile: () => file,
          },
        ],
      },
      preventDefault: jest.fn(),
    };

    fireEvent.dragOver(dropZone, data as any);
    fireEvent.drop(dropZone, data as any);

    expect(onChange).toHaveBeenCalledWith(file);
  });
});
