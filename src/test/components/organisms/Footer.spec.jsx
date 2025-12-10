// src/test/components/organisms/Footer.spec.jsx
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../../../components/organisms/Footer'

describe('Footer', () => {
  it('muestra nombre de la marca', () => {
    render(<Footer />)
    expect(screen.getByText('Takicardix')).toBeInTheDocument()
  })

  it('muestra información de contacto', () => {
    render(<Footer />)
    expect(screen.getByText('Email: contacto@takicardix.cl')).toBeInTheDocument()
    expect(screen.getByText('Teléfono: +56 9 1234 5678')).toBeInTheDocument()
  })

  it('muestra copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2025 Takicardix/)).toBeInTheDocument()
  })

  it('tiene estructura de footer', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
  
});