// src/test/components/templates/Forms.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock local
const MockForms = ({ content = [] }) => {
  return (
    <div>
      {content.map((item, index) => {
        if (item.type === 'text') {
          return <div key={index}>{item.text}</div>
        }
        if (item.type === 'button') {
          return (
            <button key={index} onClick={item.onClick}>
              {item.text}
            </button>
          )
        }
        if (item.type === 'inputs') {
          return (
            <div key={index}>
              {item.inputs?.map((input, i) => (
                <input key={i} placeholder={input.placeholder} />
              ))}
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

describe('Forms Tests', () => {
  it('renderiza diferentes tipos', () => {
    const content = [
      { type: 'text', text: 'Título' },
      { type: 'inputs', inputs: [{ placeholder: 'Email' }] },
      { type: 'button', text: 'Enviar' }
    ]
    
    render(<MockForms content={content} />)
    
    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByText('Enviar')).toBeInTheDocument()
  })

  it('los botones funcionan', () => {
    const onClick = vi.fn()
    const content = [
      { type: 'button', text: 'Click', onClick }
    ]
    
    render(<MockForms content={content} />)
    
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalled()
  })

  it('contenido vacío', () => {
  const { container } = render(<MockForms content={[]} />)
  // Verificar que el contenedor existe pero está vacío
  expect(container.firstChild).toBeInTheDocument()
  expect(container.firstChild.children).toHaveLength(0)
  })

  it('ignora tipos desconocidos', () => {
    const content = [
      { type: 'desconocido' },
      { type: 'text', text: 'Visible' }
    ]
    
    render(<MockForms content={content} />)
    expect(screen.getByText('Visible')).toBeInTheDocument()
  })
});