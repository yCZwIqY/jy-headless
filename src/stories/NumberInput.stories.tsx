import type { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import NumberInput from '../Input/NumberInput';

const meta = {
  title: 'Components/Input/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    max: {
      control: 'number',
      description: '입력 가능한 최대 숫자',
    },
    useThousandsSeparator: {
      control: 'boolean',
      description: '천 단위 콤마 구분자 사용 여부',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 숫자 입력
export const Default: Story = {
  args: {
    placeholder: '숫자를 입력하세요',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          입력된 값: {value || '없음'}
        </span>
      </div>
    );
  },
};

// 천 단위 콤마 구분
export const WithThousandsSeparator: Story = {
  args: {
    placeholder: '금액을 입력하세요',
    useThousandsSeparator: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <div style={{ fontSize: '12px' }}>
          <div style={{ color: '#666' }}>표시 값: {value || '없음'}</div>
          <div style={{ color: '#0066cc' }}>
            실제 값: {value ? value.replace(/,/g, '') : '없음'}
          </div>
        </div>
      </div>
    );
  },
};

// 최대값 제한
export const WithMaxValue: Story = {
  args: {
    placeholder: '최대 100까지 입력 가능',
    max: 100,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          최대값: {args.max} (현재: {value || 0})
        </span>
      </div>
    );
  },
};

// 최대값 + 천 단위 구분
export const WithMaxAndSeparator: Story = {
  args: {
    placeholder: '최대 1,000,000까지 입력',
    max: 1000000,
    useThousandsSeparator: true,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const numericValue = value ? Number(value.replace(/,/g, '')) : 0;
    const isNearMax = numericValue > (args.max || 0) * 0.9;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          {...args}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          style={{
            borderColor: isNearMax ? 'orange' : undefined,
          }}
        />
        <div style={{ fontSize: '12px' }}>
          <div style={{ color: isNearMax ? 'orange' : '#666' }}>
            {numericValue.toLocaleString()} / {args.max?.toLocaleString()}
          </div>
          {isNearMax && (
            <div style={{ color: 'orange', marginTop: '4px' }}>
              ⚠️ 최대값에 가까워지고 있습니다
            </div>
          )}
        </div>
      </div>
    );
  },
};

// 가격 입력 예제
export const PriceInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const numericValue = value ? Number(value.replace(/,/g, '')) : 0;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NumberInput
            placeholder='0'
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            useThousandsSeparator
            style={{
              textAlign: 'right',
              fontSize: '16px',
              padding: '8px 12px',
            }}
          />
          <span style={{ fontSize: '16px', fontWeight: 'bold' }}>원</span>
        </div>
        <div
          style={{
            fontSize: '14px',
            color: '#666',
            padding: '8px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          {numericValue > 0 ? `총 ${value}원` : '금액을 입력해주세요'}
        </div>
      </div>
    );
  },
};

// 계산기 스타일
export const CalculatorStyle: Story = {
  render: () => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const result =
      num1 && num2
        ? (
          Number(num1.replace(/,/g, '')) + Number(num2.replace(/,/g, ''))
        ).toLocaleString()
        : '0';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          minWidth: '250px',
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
          간단한 계산기
        </div>
        <NumberInput
          placeholder='첫 번째 숫자'
          value={num1}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNum1(e.target.value)}
          useThousandsSeparator
          style={{ padding: '8px' }}
        />
        <div style={{ textAlign: 'center', color: '#666' }}>+</div>
        <NumberInput
          placeholder='두 번째 숫자'
          value={num2}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNum2(e.target.value)}
          useThousandsSeparator
          style={{ padding: '8px' }}
        />
        <div
          style={{
            marginTop: '8px',
            padding: '12px',
            backgroundColor: '#fff',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#0066cc',
          }}
        >
          = {result}
        </div>
      </div>
    );
  },
};

// 수량 입력 (최대값 있음)
export const QuantityInput: Story = {
  render: () => {
    const [quantity, setQuantity] = useState('1');
    const max = 99;
    const numericValue = quantity ? Number(quantity.replace(/,/g, '')) : 0;

    const increment = () => {
      if (numericValue < max) {
        setQuantity(String(numericValue + 1));
      }
    };

    const decrement = () => {
      if (numericValue > 1) {
        setQuantity(String(numericValue - 1));
      }
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={decrement}
            disabled={numericValue <= 1}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              cursor: numericValue <= 1 ? 'not-allowed' : 'pointer',
              opacity: numericValue <= 1 ? 0.5 : 1,
            }}
          >
            -
          </button>
          <NumberInput
            value={quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(e.target.value)}
            max={max}
            style={{
              width: '80px',
              textAlign: 'center',
              fontSize: '16px',
              padding: '8px',
            }}
          />
          <button
            onClick={increment}
            disabled={numericValue >= max}
            style={{
              padding: '8px 16px',
              fontSize: '16px',
              cursor: numericValue >= max ? 'not-allowed' : 'pointer',
              opacity: numericValue >= max ? 0.5 : 1,
            }}
          >
            +
          </button>
        </div>
        <span style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
          수량: {quantity} (최대 {max}개)
        </span>
      </div>
    );
  },
};

// 대용량 숫자 입력
export const LargeNumberInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const numericValue = value ? Number(value.replace(/,/g, '')) : 0;

    const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          placeholder='바이트 수를 입력하세요'
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          useThousandsSeparator
          max={999999999999}
          style={{ fontSize: '16px', padding: '8px' }}
        />
        <div
          style={{
            fontSize: '12px',
            padding: '8px',
            backgroundColor: '#f0f0f0',
            borderRadius: '4px',
          }}
        >
          <div style={{ color: '#666' }}>입력된 바이트: {value || '0'}</div>
          <div style={{ color: '#0066cc', marginTop: '4px' }}>
            변환된 크기: {formatBytes(numericValue)}
          </div>
        </div>
      </div>
    );
  },
};

// 전화번호 스타일 (숫자만, 구분자 없음)
export const PhoneNumberStyle: Story = {
  render: () => {
    const [value, setValue] = useState('');

    const formatPhoneNumber = (val: string) => {
      const cleaned = val.replace(/\D/g, '');
      if (cleaned.length <= 3) return cleaned;
      if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 7)}-${cleaned.slice(7, 11)}`;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NumberInput
          placeholder='전화번호 (숫자만)'
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const cleaned = e.target.value.replace(/\D/g, '');
            if (cleaned.length <= 11) {
              setValue(cleaned);
            }
          }}
          max={99999999999}
          style={{ fontSize: '16px', padding: '8px' }}
        />
        <div style={{ fontSize: '12px', color: '#666' }}>
          포맷된 번호: {value ? formatPhoneNumber(value) : '-'}
        </div>
      </div>
    );
  },
};