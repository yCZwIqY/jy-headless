# CheckboxList

`jy-headless` 라이브러리의 기본 `CheckboxList` 컴포넌트입니다.  
헤드리스 방식으로 구현되어 있어, 스타일링은 사용자가 자유롭게 커스터마이징할 수 있습니다.

## ✨ 주요 기능

- **다중 선택 지원**  
  여러 항목을 동시에 선택할 수 있으며, 선택된 값들을 배열 형태로 관리합니다.

- **선택 최대 개수 제한 가능**  
  `max` 속성을 통해 선택할 수 있는 항목의 최대 개수를 설정할 수 있습니다.

- **컴포넌트 분리 구성**  
  `CheckboxList.Item`을 사용하여 옵션 항목을 자유롭게 구성할 수 있습니다.

- **컨트롤 가능 컴포넌트**  
  `values`와 `onChange`를 통해 완전히 제어형(Controlled)으로 동작합니다.

## 💡 기본 사용법

```tsx
import CheckboxList from 'jy-headless/checkboxs';
import { useState } from 'react';

function App() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <CheckboxList values={values} onChange={setValues}>
      <CheckboxList.Item value="apple">Apple</CheckboxList.Item>
      <CheckboxList.Item value="banana">Banana</CheckboxList.Item>
      <CheckboxList.Item value="cherry">Cherry</CheckboxList.Item>
    </CheckboxList>
  );
}
```

## 💡 최대 선택 개수 제한 사용법
```tsx
function App() {
  const [values, setValues] = useState<string[]>([]);

  return (
    <div>
      <p>최대 2개까지 선택할 수 있습니다</p>
      <CheckboxList values={values} onChange={setValues} max={2}>
        <CheckboxList.Item value="apple">Apple</CheckboxList.Item>
        <CheckboxList.Item value="banana">Banana</CheckboxList.Item>
        <CheckboxList.Item value="cherry">Cherry</CheckboxList.Item>
        <CheckboxList.Item value="date">Date</CheckboxList.Item>
      </CheckboxList>
      <p>선택된 값: {values.join(', ')}</p>
    </div>
  );
}

```

## 🧩 컴포넌트 구조

- `<CheckboxList>`: 루트 컴포넌트, 선택된 값과 변경 핸들러를 전달합니다.
- `<CheckboxList.Item>`: 개별 체크박스 항목을 나타냅니다.
