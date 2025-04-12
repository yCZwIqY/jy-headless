# Dropdown

`jy-headless` 라이브러리의 기본 `Dropdown` 컴포넌트입니다.  
헤드리스 방식으로 구현되어 있어, 스타일링은 사용자가 자유롭게 커스터마이징할 수 있습니다.

## ✨ 주요 기능

- **제어형 / 비제어형 사용 모두 지원**  
  `isOpen`, `selected`, `toggle`, `select`를 props로 넘겨 제어형으로 사용하거나, 내부 상태를 통해 비제어형으로 사용할 수 있습니다.

- **컴포넌트 분리 구성**  
  `Dropdown.Button`, `Dropdown.Options`, `Dropdown.Option`, `Dropdown.Viewer` 등의 서브 컴포넌트를 조합하여 자유롭게 구조를 구성할 수 있습니다.

- **바깥 클릭으로 자동 닫힘**  
  Dropdown 외부 클릭 시 자동으로 옵션창이 닫힙니다.

## 💡 기본 사용법

```tsx
import Dropdown from 'jy-headless/dropdowns';
import useDropdown from 'jy-headless/hooks/useDropdown';

function App() {
  const { selected, select, isOpen, toggle } = useDropdown('option1');

  return (
    <Dropdown selected={selected} select={select} isOpen={isOpen} toggle={toggle}>
      <Dropdown.Viewer>{selected}</Dropdown.Viewer>
      <Dropdown.Button>{isOpen ? '▼' : '▲'}</Dropdown.Button>
      <Dropdown.Options>
        <Dropdown.Option value="option1">Option 1</Dropdown.Option>
        <Dropdown.Option value="option2">Option 2</Dropdown.Option>
        <Dropdown.Option value="option3">Option 3</Dropdown.Option>
      </Dropdown.Options>
    </Dropdown>
  );
}
```

## 🧩 컴포넌트 구조
- `<Dropdown>` : 루트 컴포넌트, 상태 제공 및 외부 클릭 감지 기능 포함
- `<Dropdown.Viewer>`: 현재 선택된 값을 표시하거나, placeholder를 보여주는 영역
- `<Dropdown.Button>`: 드롭다운을 토글하는 트리거 역할의 버튼
- `<Dropdown.Options>`: 드롭다운 옵션 리스트 (열려있을 때만 렌더링)
- `<Dropdown.Option>`: 개별 선택 가능한 옵션 항목
