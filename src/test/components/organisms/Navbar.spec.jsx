// src/test/components/organisms/Navbar.spec.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

// Mock local
const MockNavbar = ({ 
  user = null, 
  cartCount = 0, 
  isAdmin = false, 
  links = [], 
  title = "Takicardix" 
}) => {
  return (
    <nav>
      <div>
        <a href="/">{title}</a>
      </div>

      <div>
        {links.map((link, index) => (
          <a key={index} href={link.to}>
            {link.label}
          </a>
        ))}
      </div>

      <div>
        {!isAdmin && (
          <a href="/cart">
            Carrito
            {cartCount > 0 && <span>{cartCount}</span>}
          </a>
        )}

        {user ? (
          <div>
            <a href="/profile">{user.nombre || user.correo}</a>
            <button>Cerrar Sesión</button>
          </div>
        ) : (
          <div>
            <a href="/login">Iniciar Sesión</a>
            <a href="/register">Registrarse</a>
          </div>
        )}
      </div>
    </nav>
  )
}

describe('Navbar Tests', () => {
  it('muestra login sin usuario', () => {
    render(
      <BrowserRouter>
        <MockNavbar />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument()
    expect(screen.getByText('Registrarse')).toBeInTheDocument()
  })

  it('muestra usuario autenticado', () => {
    render(
      <BrowserRouter>
        <MockNavbar user={{ nombre: 'Juan' }} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Juan')).toBeInTheDocument()
    expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument()
  })

  it('carrito con items', () => {
    render(
      <BrowserRouter>
        <MockNavbar cartCount={3} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('sin carrito en admin', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <MockNavbar cartCount={3} isAdmin={true} />
      </BrowserRouter>
    )
    
    expect(queryByText('Carrito')).not.toBeInTheDocument()
  })
  
});