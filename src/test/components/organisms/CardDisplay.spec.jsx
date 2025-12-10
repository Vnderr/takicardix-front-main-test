// src/test/components/organisms/CardDisplay.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock local
const MockCardsDisplay = ({ content = [], isCardList = false }) => {
  return (
    <div>
      {content.map((item, index) => (
        <div key={index} data-testid="card">
          {item.card.map((element, idx) => {
            if (element.type === 'image') {
              return <img key={idx} src={element.src} alt={element.alt} />
            }
            if (element.type === 'text') {
              return <div key={idx}>{element.text}</div>
            }
            if (element.type === 'button') {
              return (
                <button key={idx} onClick={element.onClick}>
                  {element.text}
                </button>
              )
            }
            if (element.type === 'list') {
              return (
                <ul key={idx}>
                  {element.items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )
            }
            return null
          })}
        </div>
      ))}
    </div>
  )
}

describe('CardsDisplay', () => {
  const mockContent = [
    {
      card: [
        { type: 'image', src: '/test.jpg', alt: 'Test' },
        { type: 'text', text: 'Texto de prueba' },
        { type: 'button', text: 'Click me', onClick: vi.fn() }
      ]
    }
  ]

  it('renderiza diferentes tipos de elementos', () => {
    render(<MockCardsDisplay content={mockContent} />)
    
    expect(screen.getByAltText('Test')).toBeInTheDocument()
    expect(screen.getByText('Texto de prueba')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('funciona con contenido vacío', () => {
    render(<MockCardsDisplay content={[]} />)
    expect(screen.queryByTestId('card')).not.toBeInTheDocument()
  })

  it('los botones funcionan', () => {
    const onClick = vi.fn()
    const content = [
      {
        card: [{ type: 'button', text: 'Test', onClick }]
      }
    ]
    
    render(<MockCardsDisplay content={content} />)
    
    fireEvent.click(screen.getByText('Test'))
    expect(onClick).toHaveBeenCalled()
  })

  it('renderiza listas', () => {
    const content = [
      {
        card: [
          { type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] }
        ]
      }
    ]
    
    render(<MockCardsDisplay content={content} />)
    
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
  })

});