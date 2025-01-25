import { Meta, StoryObj } from '@storybook/react';
import Tab from '../src/components/tabs/Tab';
import { useState } from 'react';
import React from 'react';

const meta: Meta<typeof Tab> = {
  title: 'Common/Others/Tab',
  component: Tab,
  layout: ['centered'],
} as StoryObj<typeof Tab>;

export default meta;

export const Default: StoryObj<typeof Tab> = {
  render: () => {
    const [currentTab, setCurrentTab] = useState('tab1');

    return (
      <Tab
        currentTab={currentTab}
        onChangeTab={(id) => setCurrentTab(id)}
        style={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <Tab.Item
          tabId="tab1"
          activeStyle={{ fontWeight: 'bold', color: '#007BFF' }}
          style={{ cursor: 'pointer', padding: '4px 8px' }}
        >
          Tab 1
        </Tab.Item>
        <Tab.Item
          tabId="tab2"
          activeStyle={{ fontWeight: 'bold', color: '#007BFF' }}
          style={{ cursor: 'pointer', padding: '4px 8px' }}
        >
          Tab 2
        </Tab.Item>
        <Tab.Item
          tabId="tab3"
          activeStyle={{ fontWeight: 'bold', color: '#007BFF' }}
          style={{ cursor: 'pointer', padding: '4px 8px' }}
        >
          Tab 3
        </Tab.Item>
      </Tab>
    );
  },
};

export const WithCustomStyles: StoryObj<typeof Tab> = {
  render: () => {
    const [currentTab, setCurrentTab] = useState('tab1');

    return (
      <Tab
        currentTab={currentTab}
        onChangeTab={(id) => setCurrentTab(id)}
        style={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          borderBottom: '2px solid #333',
        }}
      >
        <Tab.Item
          tabId="tab1"
          activeStyle={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#007BFF',
            borderRadius: '4px',
          }}
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
          }}
        >
          Custom Tab 1
        </Tab.Item>
        <Tab.Item
          tabId="tab2"
          activeStyle={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#007BFF',
            borderRadius: '4px',
          }}
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
          }}
        >
          Custom Tab 2
        </Tab.Item>
        <Tab.Item
          tabId="tab3"
          activeStyle={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#007BFF',
            borderRadius: '4px',
          }}
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
          }}
        >
          Custom Tab 3
        </Tab.Item>
      </Tab>
    );
  },
};
