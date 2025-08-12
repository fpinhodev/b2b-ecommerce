import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import React from 'react'
import { Button } from './Button'
import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/outline'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile button component based on Figma designs with multiple variants, sizes, and states. Includes design tokens from Figma for consistent styling.',
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
      description: 'Button variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make button full width',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading spinner',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button',
    },
    children: {
      control: { type: 'text' },
      description: 'Button content',
    },
  },
  // Click handler for action logging
  args: { onClick: () => alert('Button clicked!') },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary Variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete Account',
  },
}

// Size Variants
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button',
  },
}

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Medium Button',
  },
}

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
}

// State Variants
export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'Loading...',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
}

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'Full Width Button',
  },
  parameters: {
    layout: 'padded',
  },
}

// With Icons
export const WithStartIcon: Story = {
  args: {
    variant: 'primary',
    children: 'Add Item',
    startIcon: React.createElement(PlusIcon, { className: 'h-4 w-4' }),
  },
}

export const WithEndIcon: Story = {
  args: {
    variant: 'outline',
    children: 'Continue',
    endIcon: React.createElement(ChevronRightIcon, { className: 'h-4 w-4' }),
  },
}

// E-commerce specific examples
export const AddToCart: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Add to Cart',
    startIcon: React.createElement(PlusIcon, { className: 'h-4 w-4' }),
  },
}

export const Checkout: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    fullWidth: true,
    children: 'Proceed to Checkout',
  },
  parameters: {
    layout: 'padded',
  },
}
