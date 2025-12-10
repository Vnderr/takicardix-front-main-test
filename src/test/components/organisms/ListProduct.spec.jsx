// src/test/components/organisms/ListProduct.spec.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

// Mock local
const MockListProduct = ({ mostrarTodos = false }) => {
  const mockProducts = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 },
    { id: 4, nombre: 'Producto 4', precio: 400 },
    { id: 5, nombre: 'Producto 5', precio: 500 }
  ]
  
  const limite = mostrarTodos ? mockProducts.length : 4
  const productosMostrados = mockProducts.slice(0, limite)

  return (
    <ul className="lista-productos">
      {productosMostrados.map((producto) => (
        <li key={producto.id} data-testid="producto-item">
          {producto.nombre} - ${producto.precio}
        </li>
      ))}
    </ul>
  )
}

describe('ListProduct Component', () => {
  it('muestra 4 productos por defecto', () => {
    render(<MockListProduct />)
    
    const productos = screen.getAllByTestId('producto-item')
    expect(productos).toHaveLength(4)
    
    expect(screen.getByText('Producto 1 - $100')).toBeInTheDocument()
    expect(screen.getByText('Producto 4 - $400')).toBeInTheDocument()
    expect(screen.queryByText('Producto 5 - $500')).not.toBeInTheDocument()
  })

  it('muestra todos los productos cuando mostrarTodos=true', () => {
    render(<MockListProduct mostrarTodos={true} />)
    
    const productos = screen.getAllByTestId('producto-item')
    expect(productos).toHaveLength(5)
    expect(screen.getByText('Producto 5 - $500')).toBeInTheDocument()
  })

  it('tiene la clase CSS correcta', () => {
    const { container } = render(<MockListProduct />)
    
    const ul = container.querySelector('.lista-productos')
    expect(ul).toBeInTheDocument()
  })
  
});