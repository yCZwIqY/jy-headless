# Button

`jy-headless` 라이브러리의 기본 `Button` 컴포넌트입니다.  
React의 `<button>` 요소를 확장하여 `debounce`, `loading`, `readOnly` 등 다양한 상태를 처리할 수 있도록 설계되었습니다.

## ✨ 주요 기능

- **Debounce 지원**  
  빠르게 여러 번 클릭하는 것을 방지할 수 있습니다.

- **Loading / Disabled / ReadOnly**  
  버튼의 상태를 명확하게 제어할 수 있습니다.

## 💡 사용법

```tsx
import { Button } from 'jy-headless/buttons/Button';

function App() {
  return (
    <Button
      onClick={() => console.log('clicked')}
      debounce
      loading={false}
      readOnly={false}
      disabled={false}
    >
      Click Me
    </Button>
  );
}
