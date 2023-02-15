import './Button.css'

import { FC, MouseEvent, useRef } from 'react'

import { useHover } from '../../hooks/useHover'

export interface ButtonProps {
  text: string
  type?: 'success' | 'warning' | 'error'
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<ButtonProps> = ({ text, type, onClick }) => {
  const ref = useRef<HTMLButtonElement | null>(null)
  // For testing purpose
  const { isHovered } = useHover(ref)

  return (
    <button
      ref={ref}
      className={[
        'button',
        type ? `button-${type}` : '',
        isHovered ? 'button--hovered' : '',
      ]
        .join(' ')
        .trim()}
      style={{
        opacity: isHovered ? 0.7 : 1,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
