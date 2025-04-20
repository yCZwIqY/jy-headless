# Tooltip

`jy-headless` 라이브러리의 기본 `Tooltip` 컴포넌트입니다.  
마우스 호버 시 텍스트 또는 컴포넌트를 툴팁 형태로 표시하며, 위치와 커스터마이징이 가능합니다.

## ✨ 주요 기능

- **위치 지정**  
  `top`, `bottom`, `left`, `right` 위치 지정이 가능합니다.

- **화면 밖으로 나가지 않음**  
  툴팁이 뷰포트를 벗어나지 않도록 자동 조정됩니다.

- **스타일 커스터마이징**  
  `Tooltip.Label`에 `style` 또는 `className`을 적용하여 자유롭게 스타일링할 수 있습니다.

- **컴포넌트 분리 구조**  
  `<Tooltip>`과 `<Tooltip.Label>`로 분리되어 사용하며, `Context`로 상태를 공유합니다.

## 💡 사용법

```tsx
import Tooltip from 'jy-headless/Tooltip';

function App() {
  return (
    <Tooltip position="top" style={{ display: 'inline-block' }}>
      Hover me
      <Tooltip.Label style={{ backgroundColor: 'black', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
        툴팁 내용입니다.
      </Tooltip.Label>
    </Tooltip>
  );
}
```

## 🧩 컴포넌트 구조

- `<Tooltip>`: 루트 컴포넌트. 툴팁을 표시할 대상 요소를 감싸며, 마우스 오버 시 툴팁을 보여주는 역할을 함
- `<Tooltip.Label>`: 툴팁의 내용을 표시하는 컴포넌트. `<Tooltip>`의 자식으로 사용되며, 툴팁의 스타일과 내용을 커스터마이징 할 수 있음
