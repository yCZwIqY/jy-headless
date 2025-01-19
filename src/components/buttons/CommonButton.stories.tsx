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
        disabled: {control: 'boolean'},
        size: {control: 'select', options: ['sm', 'md', 'lg']},

    },
    args: {
        children: '',
        additionalClass: '',
        className: '',
        disabled: false,
        size: "md"
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

export const AdditionalClass: Story = {
    args: {
        children: 'Additional Class',
        additionalClass: 'text-red-500 text-lg'
    }
};
export const CustomClass: Story = {
    args: {
        children: 'Custom Class',
        className: 'bg-indigo-500 text-white p-3'
    }
};