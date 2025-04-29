import { Minus, Plus } from 'lucide-react'

const QuantitySelector = ({
  quantity,
  min,
  max,
  decrement,
  increment,
  handleChange,
  handleBlur,
  disabled,
}: {
  quantity: number | ''
  min: number
  max?: number
  decrement: () => void
  increment: () => void
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: () => void
  disabled?: boolean
}) => {
  return (
    <div className="flex items-center gap-1 rounded border">
      <button
        type="button"
        onClick={decrement}
        disabled={Number(quantity) <= min || disabled}
        className="flex h-[34px] w-[34px] items-center justify-center hover:opacity-80 disabled:opacity-50"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min={min}
        max={max}
        disabled={disabled}
        className="w-[34px] text-center disabled:opacity-50"
      />
      <button
        type="button"
        onClick={increment}
        disabled={(max !== undefined && Number(quantity) >= max) || disabled}
        className="flex h-[34px] w-[34px] items-center justify-center hover:opacity-80 disabled:opacity-50"
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

export default QuantitySelector
