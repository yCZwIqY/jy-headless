import {Meta, StoryObj} from "@storybook/react";
import CommonButton from "./CommonButton.tsx";

const meta: Meta<typeof CommonButton> = {
    title: "Button/CommonButton",
    component: CommonButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {control: 'text', description: 'label'},
        additionalClass: {control: 'text'},
        className: {control: 'text'},
        disabled: {control: 'boolean'}
    },
    args: {
        children: '',
        additionalClass: '',
        className: '',
        disabled: false,
    }
} as StoryObj<typeof CommonButton>;

export default meta;
type Story = StoryObj<typeof CommonButton>;

export const Common: Story = {
   args: {
       children: 'Common'
   }
};

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        disabled: true
    }
};

export const CustomClass: Story = {
    render: () => <CommonButton className={'bg-indigo-500 text-white p-3'}>CustomClass</CommonButton>
};