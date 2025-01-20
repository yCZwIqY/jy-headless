import {Meta, StoryObj} from "@storybook/react";
import BaseButton from "./BaseButton.tsx";
import {PlusIcon} from "../icons";

const meta: Meta<typeof BaseButton> = {
    title: "Button/BaseButton",
    component: BaseButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {control: 'select', options: ['sm', 'md', 'lg']},
        variant: {control: 'select', options: ['primary', 'secondary', 'tertiary']},
        children: {control: 'text', description: 'label'},
        disabled: {control: 'boolean'},
        loading: {control: 'boolean'},
        additionalClass: {control: 'text'},
        className: {control: 'text'},
        isCircular: {control: 'boolean'}
    },
    args: {
        disabled: false,
        size: "md",
        variant: "primary"
    }
} as StoryObj<typeof BaseButton>;

export default meta;
type Story = StoryObj<typeof BaseButton>;

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

export const Loading: Story = {
    args: {
        children: 'Loading',
        loading: true
    }
};


export const SquareIcon: Story = {
    args: {
        children: <PlusIcon size={'80px'} color={'white'}/>,
        isCircular: true
    }
};

export const CustomClass: Story = {
    args: {
        children: 'Custom Class',
        className: 'bg-indigo-500 text-red p-3'
    }
};