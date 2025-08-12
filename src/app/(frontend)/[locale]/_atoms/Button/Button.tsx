import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from '@/utils/tailwindMerge'

// Design tokens from Figma
const designTokens = {
  colors: {
    primary: '#54AAF9',
    onBrand: '#f5f5f5',
    border: '#2c2c2c',
  },
  spacing: {
    sm: '8px', // Space/200
    md: '12px', // Space/300
  },
  radius: {
    md: '8px', // Radius/200
  },
  typography: {
    base: {
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1,
    },
  },
} as const

const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-['Inter'] font-normal text-base leading-none whitespace-nowrap rounded-lg border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          'bg-[#54AAF9] text-[#f5f5f5] border-[#2c2c2c] hover:bg-[#4a9ae5] active:bg-[#3d8bd1]',
        secondary:
          'bg-transparent text-[#54AAF9] border-[#54AAF9] hover:bg-[#54AAF9]/10 active:bg-[#54AAF9]/20',
        outline:
          'bg-transparent text-[#2c2c2c] border-[#2c2c2c] hover:bg-[#2c2c2c] hover:text-[#f5f5f5]',
        ghost:
          'bg-transparent text-[#2c2c2c] border-transparent hover:bg-[#f5f5f5] active:bg-[#e5e5e5]',
        destructive: 'bg-red-500 text-white border-red-500 hover:bg-red-600 active:bg-red-700',
      },
      size: {
        small: 'px-2 py-1.5 text-sm min-h-[32px]',
        medium: 'px-3 py-[12px] text-base min-h-[44px]', // Following Figma specs
        large: 'px-4 py-3 text-lg min-h-[52px]',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Button content */
  children: React.ReactNode
  /** Loading state */
  loading?: boolean
  /** Icon to display before text */
  startIcon?: React.ReactNode
  /** Icon to display after text */
  endIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      children,
      loading = false,
      startIcon,
      endIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && startIcon && startIcon}
        {children}
        {!loading && endIcon && endIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
