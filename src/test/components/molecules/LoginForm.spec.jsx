// src/test/components/molecules/LoginForm.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import FormFields from '../../../components/molecules/LoginForm'

describe('FormFields Component', () => {
  
  it('no renderiza nada cuando fields está vacío', () => {
    const { container } = render(
      <FormFields 
        fields={[]} 
        formData={{}} 
        handleChange={vi.fn()} 
      />
    )
    
    expect(container.firstChild).toBeNull()
    expect(screen.queryByRole('textbox')).toBeNull()
  })

  it('renderiza múltiples campos', () => {
    const fields = [
      { name: 'nombre', label: 'Nombre' },
      { name: 'apellido', label: 'Apellido' }
    ]
    
    render(
      <FormFields 
        fields={fields} 
        formData={{ nombre: '', apellido: '' }} 
        handleChange={vi.fn()} 
      />
    )
    
    expect(screen.getAllByRole('textbox')).toHaveLength(2)
  })

});