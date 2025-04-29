'use client'

import React, { useEffect, useState } from 'react'
import { useDebounce } from '../../_utils/useDebounce'
import QuantitySelector from './QuantitySelector'

const Quantity = ({
  defaultValue = 1,
  min = 1,
  max,
  onChange,
  disabled = false,
}: {
  defaultValue?: number | ''
  min: number
  max?: number
  onChange: (quantity: number) => void
  disabled?: boolean
}) => {
  const [quantity, setQuantity] = useState(defaultValue)
  const quantityDebounced = useDebounce(quantity)

  useEffect(() => {
    if (Number.isNaN(quantityDebounced) || quantityDebounced === '') return
    onChange(Number(quantityDebounced))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityDebounced])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value)
    if (Number.isNaN(newQuantity)) return

    // If the input is empty, set it to the default value
    if (newQuantity === 0) {
      setQuantity('')
      return
    }

    // Ensure the quantity is within bounds
    const boundedQuantity = Math.max(min, max ? Math.min(newQuantity, max) : newQuantity)
    setQuantity(boundedQuantity)
  }

  const handleBlur = () => {
    const isEmptyValue = quantity === ''
    // If the input is empty, set it to the default value
    const newQuantity = isEmptyValue ? Number(defaultValue) : Number(quantity)
    if (isEmptyValue) setQuantity(newQuantity)
    // onChange(newQuantity)
  }

  const increment = () => {
    if (max && Number(quantity) >= max) return
    const newQuantity = Number(quantity) + 1
    setQuantity(newQuantity)
    // onChange(newQuantity)
  }

  const decrement = () => {
    if (Number(quantity) <= min) return
    const newQuantity = Number(quantity) - 1
    setQuantity(newQuantity)
    // onChange(newQuantity)
  }

  return (
    <QuantitySelector
      quantity={quantity}
      decrement={decrement}
      increment={increment}
      handleChange={handleChange}
      handleBlur={handleBlur}
      min={min}
      max={max}
      disabled={disabled}
    />
  )
}

export default Quantity
