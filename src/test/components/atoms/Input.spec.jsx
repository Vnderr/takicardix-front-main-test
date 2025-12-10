// src/test/components/atoms/Input.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from '../../../components/atoms/Input'

describe('Input Component', () => {

  it('renderiza input de texto', () => {
    render(<Input placeholder="Nombre" />)
    expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument()
  })
  
  it('llama a onChange al escribir', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    fireEvent.change(screen.getByRole('textbox'), { 
      target: { value: 'test' } 
    })
    
    expect(handleChange).toHaveBeenCalled()
  })

  it('se deshabilita correctamente', () => {
    render(<Input disabled={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
  
});