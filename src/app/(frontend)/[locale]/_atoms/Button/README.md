# Button Component

A versatile button component based on Figma designs with multiple variants, sizes, and states. Built with TypeScript, Tailwind CSS, and class-variance-authority for flexible styling.

## Features

- 🎨 **Design System Aligned**: Built directly from Figma design tokens
- 🎯 **Multiple Variants**: Primary, Secondary, Outline, Ghost, Destructive
- 📏 **Three Sizes**: Small, Medium, Large
- 🔧 **Loading States**: Built-in spinner with loading prop
- ♿ **Accessible**: Proper focus states and keyboard navigation
- 🚀 **TypeScript**: Full type safety with variant props
- 📱 **Responsive**: Works across all screen sizes

## Design Tokens from Figma

```typescript
const designTokens = {
  colors: {
    primary: '#54AAF9',      // Brand primary color
    onBrand: '#f5f5f5',      // Text on brand colors
    border: '#2c2c2c',       // Border color
  },
  spacing: {
    sm: '8px',   // Space/200
    md: '12px',  // Space/300
  },
  radius: {
    md: '8px',   // Radius/200
  },
  typography: {
    base: {
      fontFamily: 'Inter',   // Single Line/Body Base
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: 1,
    }
  }
}
```

## Usage

### Basic Usage

```tsx
import { Button } from '@/app/(frontend)/[locale]/_atoms/Button';

function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

### All Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Sizes

```tsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>  {/* Default */}
<Button size="large">Large</Button>
```

### With Icons

```tsx
import { PlusIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

<Button startIcon={<PlusIcon className="h-4 w-4" />}>
  Add Item
</Button>

<Button endIcon={<ChevronRightIcon className="h-4 w-4" />}>
  Continue
</Button>
```

### Loading State

```tsx
<Button loading>Loading...</Button>
```

### Full Width

```tsx
<Button fullWidth>Full Width Button</Button>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `fullWidth` | `boolean` | `false` | Make button full width |
| `loading` | `boolean` | `false` | Show loading spinner |
| `startIcon` | `ReactNode` | - | Icon before text |
| `endIcon` | `ReactNode` | - | Icon after text |
| `disabled` | `boolean` | `false` | Disable button |
| `children` | `ReactNode` | - | Button content |
| `onClick` | `() => void` | - | Click handler |

## E-commerce Examples

### Add to Cart Button

```tsx
<Button 
  variant="primary" 
  size="large"
  startIcon={<PlusIcon className="h-4 w-4" />}
>
  Add to Cart
</Button>
```

### Checkout Button

```tsx
<Button 
  variant="primary" 
  size="large" 
  fullWidth
>
  Proceed to Checkout
</Button>
```

### Delete Product Button

```tsx
<Button variant="destructive" size="small">
  Delete Product
</Button>
```

## Accessibility

- Supports keyboard navigation
- Proper focus indicators
- Screen reader compatible
- Disabled state properly communicated
- Loading state announced to screen readers

## Browser Support

Compatible with all modern browsers that support:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES2017+ JavaScript features
