import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import CheckboxList from '../src/components/checkbox/CheckboxList';
import { useState } from 'react';

type Story = StoryObj<typeof CheckboxList>;

const meta: Meta<typeof CheckboxList> = {
  title: 'Common/Checkbox/CheckboxList',
  component: CheckboxList,
  parameters: {
    layout: 'centered',
  },
} as Story;
export default meta;

export const WithId: Story = {
  render: () => {
    const [items, setItems] = useState([]);
    return (
      <div>
        <CheckboxList checkLimit={3} values={items} onCheck={setItems}>
          <CheckboxList.Item id={1}>check 01</CheckboxList.Item>
          <CheckboxList.Item id={2}>check 02</CheckboxList.Item>
          <CheckboxList.Item id={3}>check 03</CheckboxList.Item>
          <CheckboxList.Item id={4}>check 04</CheckboxList.Item>
        </CheckboxList>
        <div>Checked: {items.join(', ')}</div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = await canvas.getAllByRole('checkbox');

    await userEvent.click(checkboxes[0]);
    await userEvent.click(checkboxes[1]);
    await userEvent.click(checkboxes[2]);

    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();

    await userEvent.click(checkboxes[3]);
    expect(checkboxes[3]).not.toBeChecked();
  },
};

export const WithoutId: Story = {
  render: () => {
    const [items, setItems] = useState([]);
    return (
      <div>
        <CheckboxList checkLimit={3} values={items} onCheck={setItems}>
          <CheckboxList.Item>check 01</CheckboxList.Item>
          <CheckboxList.Item>check 02</CheckboxList.Item>
          <CheckboxList.Item>check 03</CheckboxList.Item>
          <CheckboxList.Item>check 04</CheckboxList.Item>
        </CheckboxList>
        <div>Checked: {items.join(', ')}</div>
      </div>
    );
  },
};

export const AllCheck: Story = {
  render: () => {
    const [items, setItems] = useState([]);

    const onAllCheck = (isAll: boolean) => {
      console.log('onAllCheck', isAll);
      if (isAll) {
        setItems([]);
      } else {
        setItems([1, 2, 3, 4]);
      }
    };

    return (
      <div>
        <CheckboxList
          values={items}
          onCheck={setItems}
          showAllCheck
          itemCount={4}
          onAllCheck={onAllCheck}
        >
          <CheckboxList.Item id={1}>check 01</CheckboxList.Item>
          <CheckboxList.Item id={2}>check 02</CheckboxList.Item>
          <CheckboxList.Item id={3}>check 03</CheckboxList.Item>
          <CheckboxList.Item id={4}>check 04</CheckboxList.Item>
        </CheckboxList>
        <div>Checked: {items.join(', ')}</div>
      </div>
    );
  },
};

export const Styled: Story = {
  render: () => {
    const [items, setItems] = useState<string[]>([]);
    return (
      <div>
        <CheckboxList
          style={{
            padding: '16px',
            backgroundColor: '#f3f3f3',
            borderRadius: '8px',
            width: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
          checkLimit={2}
          values={items}
          onCheck={setItems}
        >
          <CheckboxList.Item style={{ color: '#007bff', fontWeight: 'bold', marginLeft: '5px' }}>
            Option 1
          </CheckboxList.Item>
          <CheckboxList.Item style={{ color: '#d22335', fontWeight: 'bold', marginLeft: '5px' }}>
            Option 2
          </CheckboxList.Item>
          <CheckboxList.Item style={{ color: '#53b21b', fontWeight: 'bold', marginLeft: '5px' }}>
            Option 3
          </CheckboxList.Item>
          <CheckboxList.Item
            disabled
            style={{ color: '#727272', fontWeight: 'bold', marginLeft: '5px' }}
          >
            Option 4
          </CheckboxList.Item>
        </CheckboxList>
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#333' }}>
          Checked: {items.join(', ')}
        </div>
      </div>
    );
  },
};
