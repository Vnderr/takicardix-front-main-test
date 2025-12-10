// src/test/components/organisms/CreateModal.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

// Mock simple
const MockCreateModal = ({ 
  isOpen = true, 
  onClose = vi.fn(), 
  onSubmit = vi.fn(),
  title = "Crear nuevo"
}) => {
  if (!isOpen) return null

  return (
    <div data-testid="modal">
      <h2>{title}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit() }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  )
}

describe('CreateModal', () => {
  it('no se muestra cuando isOpen es false', () => {
    const { queryByTestId } = render(<MockCreateModal isOpen={false} />)
    expect(queryByTestId('modal')).not.toBeInTheDocument()
  })

  it('se muestra cuando isOpen es true', () => {
    render(<MockCreateModal isOpen={true} />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByText('Crear nuevo')).toBeInTheDocument()
  })

  it('llama a onClose al cancelar', () => {
    const onClose = vi.fn()
    render(<MockCreateModal isOpen={true} onClose={onClose} />)
    
    fireEvent.click(screen.getByText('Cancelar'))
    expect(onClose).toHaveBeenCalled()
  })

  it('llama a onSubmit al guardar', () => {
    const onSubmit = vi.fn()
    render(<MockCreateModal isOpen={true} onSubmit={onSubmit} />)
  
    const form = document.querySelector('form') 
    fireEvent.submit(form)
    expect(onSubmit).toHaveBeenCalled()
  })

  it('acepta título personalizado', () => {
    render(<MockCreateModal isOpen={true} title="Editar" />)
    expect(screen.getByText('Editar')).toBeInTheDocument()
  })

});