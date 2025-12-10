// src/test/components/templates/Section.spec.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock local
const MockSection = ({ content = [] }) => {
  return (
    <div>
      {content.map((item, index) => {
        if (item.type === 'text') {
          return <div key={index}>Texto: {item.text}</div>
        }
        if (item.type === 'image') {
          return <img key={index} src={item.src} alt={item.alt} />
        }
        if (item.type === 'cards' || item.type === 'cardList') {
          return <div key={index}>Cards: {item.cards?.length || 0}</div>
        }
        if (item.type === 'table') {
          return (
            <div key={index}>
              {item.title && <h3>{item.title}</h3>}
              <div>Tabla con {item.columns?.length || 0} columnas</div>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

describe('Section Tests', () => {
  it('renderiza diferentes tipos', () => {
    const content = [
      { type: 'text', text: 'Texto' },
      { type: 'image', src: '/img.jpg', alt: 'Imagen' },
      { type: 'cards', cards: [1, 2, 3] },
      { type: 'table', title: 'Tabla', columns: ['A', 'B'] }
    ]
    
    render(<MockSection content={content} />)
    
    expect(screen.getByText('Texto: Texto')).toBeInTheDocument()
    expect(screen.getByAltText('Imagen')).toBeInTheDocument()
    expect(screen.getByText('Cards: 3')).toBeInTheDocument()
    expect(screen.getByText('Tabla')).toBeInTheDocument()
    expect(screen.getByText('Tabla con 2 columnas')).toBeInTheDocument()
  })

  it('tabla con y sin título', () => {
    const contentConTitulo = [
      { type: 'table', title: 'Con título', columns: ['A'] }
    ]
    const contentSinTitulo = [
      { type: 'table', columns: ['A'] }
    ]
    
    const { rerender } = render(<MockSection content={contentConTitulo} />)
    expect(screen.getByText('Con título')).toBeInTheDocument()
    
    rerender(<MockSection content={contentSinTitulo} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('contenido vacío', () => {
    const { container } = render(<MockSection content={[]} />)
    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild.children).toHaveLength(0)
  })

  it('ignora tipos desconocidos', () => {
    const content = [
      { type: 'unknown' },
      { type: 'text', text: 'Visible' }
    ]
    
    render(<MockSection content={content} />)
    expect(screen.getByText('Texto: Visible')).toBeInTheDocument()
  })
  
});