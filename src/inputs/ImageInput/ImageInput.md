# ImageInput

`jy-headless` 라이브러리의 이미지 업로드 컴포넌트입니다.  
클릭, 드래그 앤 드롭 업로드와 미리보기, 커스터마이징을 지원합니다.

---

## ✨ 주요 기능

- 클릭 & 드래그 앤 드롭 업로드
- 이미지 미리보기 지원
- 커스텀 스타일링
- 허용 확장자 지정 가능 (`jpeg`, `png` 등)

---

## 💡 사용법

```tsx
import { useState } from 'react';
import ImageInput from 'jy-headless/inputs/ImageInput';

function App() {
  const [image, setImage] = useState<File | null>(null);

  return (
    <ImageInput
      id="profile"
      value={image}
      onChange={(file) => setImage(file)}
      accepts={['jpeg', 'png']}
      draggable
    >
      <ImageInput.Uploader
        style={{
          width: 200,
          height: 200,
          border: '2px dashed #ccc',
          borderRadius: 12,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        클릭 또는 드래그해서 업로드
      </ImageInput.Uploader>
      <ImageInput.Preview
        style={{
          display: 'block',
          marginTop: 12,
          width: 200,
          height: 'auto',
        }}
      />
    </ImageInput>
  );
}
```

## 🧩 컴포넌트 구조

- `<ImageInput>`: 루트 컴포넌트. 파일 입력, 드래그 앤 드롭, 이미지 미리보기 상태를 관리
- `<ImageInput.Uploader>`: 클릭 또는 드래그로 파일을 업로드할 수 있는 영역. 내부적으로 `<label>`을 사용
- `<ImageInput.Preview>`: 업로드된 이미지의 미리보기를 표시하는 컴포넌트
