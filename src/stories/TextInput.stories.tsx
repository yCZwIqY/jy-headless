import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import TextInput from '../Input/TextInput';

const meta = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    maxLength: {
      control: 'number',
      description: '입력 가능한 최대 문자 수',
    },
    pattern: {
      control: 'text',
      description: '입력 값을 검증할 정규식 패턴',
    },
    disallowPattern: {
      control: 'object',
      description: '허용하지 않을 문자 패턴',
    },
    trimWhitespace: {
      control: 'boolean',
      description: 'blur 시 공백 제거 여부',
    },
    debounceMs: {
      control: 'number',
      description: 'debounce 지연 시간 (ms)',
    },
    throttleMs: {
      control: 'number',
      description: 'throttle 지연 시간 (ms)',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 텍스트 입력
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// 최대 길이 제한
export const WithMaxLength: Story = {
  args: {
    placeholder: '최대 10자까지 입력 가능',
    maxLength: 10,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {value.length} / {args.maxLength}
        </span>
      </div>
    );
  },
};

// 숫자만 입력
export const NumbersOnly: Story = {
  args: {
    placeholder: '숫자만 입력 가능',
    pattern: '^[0-9]*$',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          입력된 값: {value || '없음'}
        </span>
      </div>
    );
  },
};

// 특수문자 불허
export const DisallowSpecialCharacters: Story = {
  args: {
    placeholder: '영문과 숫자만 입력 가능',
    disallowPattern: /^[a-zA-Z0-9]*$/,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          특수문자는 입력할 수 없습니다
        </span>
      </div>
    );
  },
};

// 공백 자동 제거
export const TrimWhitespace: Story = {
  args: {
    placeholder: 'blur 시 앞뒤 공백이 제거됩니다',
    trimWhitespace: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          입력 후 포커스를 해제하면 공백이 제거됩니다
        </span>
      </div>
    );
  },
};

// Debounce 적용
export const WithDebounce: Story = {
  args: {
    placeholder: '입력 후 300ms 후 반영됩니다',
    debounceMs: 300,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onDebouncedChange={setDebouncedValue}
        />
        <div style={{ fontSize: '12px' }}>
          <div style={{ color: '#666' }}>즉시 반영: {value}</div>
          <div style={{ color: '#0066cc' }}>
            Debounced (300ms): {debouncedValue}
          </div>
        </div>
      </div>
    );
  },
};

// Throttle 적용
export const WithThrottle: Story = {
  args: {
    placeholder: '500ms마다 한 번씩만 반영됩니다',
    throttleMs: 500,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const [throttledValue, setThrottledValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onThrottledChange={setThrottledValue}
        />
        <div style={{ fontSize: '12px' }}>
          <div style={{ color: '#666' }}>즉시 반영: {value}</div>
          <div style={{ color: '#0066cc' }}>
            Throttled (500ms): {throttledValue}
          </div>
        </div>
      </div>
    );
  },
};

// 복합 예제: 비밀번호 입력
export const PasswordInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [error, setError] = useState<string>();

    const passwordValidator = (val: string) => {
      if (!val) return true;
      if (val.length < 8) {
        return '비밀번호는 최소 8자 이상이어야 합니다';
      }
      if (!/[A-Z]/.test(val)) {
        return '대문자를 최소 1개 포함해야 합니다';
      }
      if (!/[a-z]/.test(val)) {
        return '소문자를 최소 1개 포함해야 합니다';
      }
      if (!/[0-9]/.test(val)) {
        return '숫자를 최소 1개 포함해야 합니다';
      }
      return true;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          type='password'
          placeholder='비밀번호를 입력하세요'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          validator={passwordValidator}
          onValidate={(valid, err) => {
            setIsValid(valid);
            setError(err);
          }}
          maxLength={20}
          style={{
            borderColor: !isValid ? 'red' : isValid && value ? 'green' : undefined,
          }}
        />
        {!isValid && error && (
          <span style={{ fontSize: '12px', color: 'red' }}>{error}</span>
        )}
        {isValid && value && (
          <span style={{ fontSize: '12px', color: 'green' }}>
            유효한 비밀번호입니다
          </span>
        )}
        <div style={{ fontSize: '11px', color: '#999' }}>
          <div>• 8자 이상 20자 이하</div>
          <div>• 대문자, 소문자, 숫자 각 1개 이상 포함</div>
        </div>
      </div>
    );
  },
};

// 한글 입력 (Composition 이벤트)
export const KoreanInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [isComposing, setIsComposing] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <TextInput
          placeholder='한글을 입력해보세요'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          maxLength={20}
        />
        <div style={{ fontSize: '12px' }}>
          <div style={{ color: '#666' }}>입력 중: {isComposing ? '예' : '아니오'}</div>
          <div style={{ color: '#666' }}>문자 수: {value.length} / 20</div>
        </div>
      </div>
    );
  },
};