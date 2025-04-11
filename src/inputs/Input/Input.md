# Input

`jy-headless` 라이브러리의 기본 `Input` 컴포넌트입니다.  
HTML `<input>` 요소를 확장하여 prefix/suffix 엘리먼트, 커스텀 스타일 및 클래스 적용이 가능하도록 설계되었습니다.

## ✨ 주요 기능

- **Prefix / Suffix Element**  
  인풋 앞뒤로 아이콘, 라벨 등 원하는 컴포넌트를 삽입할 수 있습니다.

- **스타일 / 클래스 커스터마이징**  
  `wrapperStyle`, `wrapperClass`를 통해 외부 래퍼 요소에 스타일 및 클래스를 자유롭게 적용할 수 있습니다.

- **Throttling 지원**  
  `useThrottle`을 `true`로 설정하면, `onChange` 호출 빈도를 제한할 수 있습니다.  
  입력이 너무 자주 발생하는 상황에서도 성능을 최적화할 수 있습니다.

## 💡 사용법

```tsx
import { Input } from 'jy-headless/inputs/Input';

function App() {
  return (
    <Input
      id="email"
      prefixElement={<span>@</span>}
      suffixElement={<span>.com</span>}
      wrapperClass="border px-2 py-1 rounded"
      wrapperStyle={{ backgroundColor: '#f9f9f9' }}
      placeholder="yourname"
      onChange={(e) => console.log(e.target.value)}
      useThrottle
      throttleDelay={300}
    />
  );
}
