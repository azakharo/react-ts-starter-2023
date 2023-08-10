import type { Meta, StoryObj } from '@storybook/react';

import UserInitials from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'UIKit/UserInitials',
  component: UserInitials,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   bgColor: { control: 'color' },
  // },
} satisfies Meta<typeof UserInitials>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'Alexey Zakharov',
  },
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 48,
  },
};
