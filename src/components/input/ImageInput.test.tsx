import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ImageInput from './ImageInput';
import Input, { InputProps } from './Input';
import React from 'react';
import { expect, userEvent } from '@storybook/test';

describe('ImageInput Component', () => {
  it('should render the default element when no preview is provided', () => {
    render(<ImageInput preview="" onFileChange={() => {}} />);
    expect(screen.getByTestId('image-input-wrapper')).toBeInTheDocument();
  });
  //
  it('should display a preview image when a file is selected', async () => {
    const mockFile = new File(['file content'], 'image.png', { type: 'image/png' });
    const fileReaderSpy = jest
      .spyOn(FileReader.prototype, 'readAsDataURL')
      .mockImplementation(function () {
        this.onload?.();
      });
    const onFileChangeMock = jest.fn();

    render(<ImageInput preview="" onFileChange={onFileChangeMock} />);

    const input = screen.getByTestId('image-input') as HTMLInputElement;
    await userEvent.upload(input, mockFile);
    // 파일이 선택되었을 때 onFileChange가 호출되었는지 확인
    await waitFor(() => expect(onFileChangeMock).toHaveBeenCalledWith(expect.any(String)));

    // 미리보기 이미지가 표시되는지 확인
    expect(screen.getByTestId('image-input-preview')).toBeInTheDocument();

    // FileReader가 호출되었는지 확인
    expect(fileReaderSpy).toHaveBeenCalled();

    fileReaderSpy.mockRestore();
  });

  it('should render the default element when preview is empty', () => {
    render(
      <ImageInput preview="" onFileChange={() => {}} defaultElement={<div>Default Element</div>} />,
    );

    expect(screen.getByText('Default Element')).toBeInTheDocument();
  });
});
