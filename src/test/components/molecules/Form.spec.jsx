// src/test/components/molecules/Form.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Form from '../../../components/molecules/Form' 

describe('Form Component', () => {
  
  it('renderiza con label', () => {
    render(<Form label="Nombre completo" />)
    
    expect(screen.getByText('Nombre completo')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('pasa las props al Input', () => {
    render(<Form label="Email" type="email" placeholder="Ingresa tu email" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('placeholder', 'Ingresa tu email')
  })

  it('onChange funciona correctamente', () => {
    const handleChange = vi.fn()
    
    render(<Form label="Campo" onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'nuevo valor' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
  
});  