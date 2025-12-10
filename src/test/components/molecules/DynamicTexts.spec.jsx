// src/test/components/molecules/DynamicTexts.spec.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DynamicTexts from '../../../components/molecules/DynamicTexts' 

describe('DynamicTexts Component', () => {
  
  it('no renderiza nada cuando Texts está vacío', () => {
    const { container } = render(<DynamicTexts Texts={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renderiza un solo texto', () => {
    const Texts = [
      { text: 'Hola mundo', variant: 'p' }
    ]
    
    render(<DynamicTexts Texts={Texts} />)
    
    expect(screen.getByText('Hola mundo')).toBeInTheDocument()
  })

  it('renderiza múltiples textos', () => {
    const Texts = [
      { text: 'Título principal', variant: 'h1' },
      { text: 'Subtítulo', variant: 'h2' },
      { text: 'Contenido del párrafo', variant: 'p' }
    ]
    
    render(<DynamicTexts Texts={Texts} />)
    
    expect(screen.getByText('Título principal')).toBeInTheDocument()
    expect(screen.getByText('Subtítulo')).toBeInTheDocument()
    expect(screen.getByText('Contenido del párrafo')).toBeInTheDocument()
  })
  
});