import { Meta, StoryObj } from '@storybook/react';
import Tab from '../src/components/tabs/Tab';
import React, { useState } from 'react';

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
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            ...(currentTab === 'tab1' && { fontWeight: 'bold', color: '#007BFF' }),
          }}
        >
          Tab 1
        </Tab.Item>
        <Tab.Item
          tabId="tab2"
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            ...(currentTab === 'tab2' && { fontWeight: 'bold', color: '#007BFF' }),
          }}
        >
          Tab 2
        </Tab.Item>
        <Tab.Item
          tabId="tab3"
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            ...(currentTab === 'tab3' && { fontWeight: 'bold', color: '#007BFF' }),
          }}
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
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            ...(currentTab === 'tab1' && {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#007BFF',
              borderRadius: '4px',
            }),
          }}
        >
          Custom Tab 1
        </Tab.Item>
        <Tab.Item
          tabId="tab2"
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            ...(currentTab === 'tab2' && {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#007BFF',
              borderRadius: '4px',
            }),
          }}
        >
          Custom Tab 2
        </Tab.Item>
        <Tab.Item
          tabId="tab3"
          style={{
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            ...(currentTab === 'tab3' && {
              fontWeight: 'bold',
              color: 'white',
              backgroundColor: '#007BFF',
              borderRadius: '4px',
            }),
          }}
        >
          Custom Tab 3
        </Tab.Item>
      </Tab>
    );
  },
};
