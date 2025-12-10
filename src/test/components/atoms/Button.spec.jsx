// src/test/components/atoms/Button.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Button from '../../../components/atoms/Button'

describe('Button Component', () => {

  it('renderiza el botón correctamente con el texto proporcionado', () => {
    render(<Button text="Haz click" />)
    expect(screen.getByText('Haz click')).toBeInTheDocument()
  })

  it('llama a la función onClick cuando se hace clic en el botón', () => {
    const handleClick = vi.fn()
    render(<Button text="Haz click" onClick={handleClick} />)
    fireEvent.click(screen.getByText('Haz click'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deshabilita el botón cuando la prop disabled es true', () => {
    render(<Button text="No puedes hacer click" disabled={true} />)
    expect(screen.getByText('No puedes hacer click')).toBeDisabled()
  })

});