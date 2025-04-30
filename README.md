# jy-headless

jy-headless는 React용으로 설계된 현대적이고 경량화된 커스터마이즈 가능한 Headless UI 컴포넌트 라이브러리입니다. 다양한 컴포넌트를 제공하며, 이를 쉽게 스타일링하고 React 애플리케이션에
통합할 수 있습니다. 이 라이브러리는 접근성에 최적화된 비스타일링 컴포넌트를 제공하여, 자신만의 디자인을 만들 수 있도록 돕습니다.

## 특징

- 모듈형 컴포넌트: 버튼, 입력, 모달, 스피너 등 다양한 필수 UI 컴포넌트 제공
- 완전한 커스터마이징 가능: 컴포넌트에 스타일이 적용되지 않아 Tailwind CSS, styled-components 등 원하는 스타일링 방식으로 자유롭게 꾸밀 수 있습니다.
- TypeScript 지원: TypeScript로 구축되어 개발자 경험과 타입 안전성이 향상되었습니다.
- 성능 최적화: Rollup을 사용하여 트리 쉐이킹과 최적화된 번들 사이즈를 구현

## 구현된 컴포넌트

- [Button](src/buttons/Button/Button.md)
- Input
  - [Input](src/inputs/Input/Input.md)
  - [ImageInput](src/inputs/ImageInput/ImageInput.md)
  - [CheckboxList](src/inputs/checkboxList/CheckboxList.md)
- [Dropdown](src/selectors/Dropdown/dropdown.md)
- [Tooltip](src/tooltip/Tooltip/Tooltip.md)


  
## Storybook

[Storybook Demo](https://6795bdd4b570ec0f79b87452-mtshojeytp.chromatic.com/?path=/docs/buttons-button--docs)에서 `jy-headless` 라이브러리의 컴포넌트들을 실시간으로 확인할 수 있습니다.

## 설치

```bash
npm install jy-headless
# 또는
pnpm install jy-headless
# 또는
yarn add jy-headless
```

## 사용법

컴포넌트를 아래와 같이 import하여 사용할 수 있습니다:

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

## 라이선스

MIT
