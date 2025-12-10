// src/test/components/atoms/InputFile.spec.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InputFile from "../../../components/atoms/InputFile";

describe("InputFile", () => {
  it('renderiza el input file', () => {
    render(<InputFile onChange={() => {}} />)
    const input = document.querySelector('input[type="file"]')
        
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'file')
    expect(input).toHaveAttribute('accept', 'image/*')
  })

  it('se deshabilita correctamente', () => {
    render(<InputFile onChange={() => {}} disabled={true} />)
    
    expect(screen.getByText('Subiendo...')).toBeInTheDocument()
    expect(screen.queryByText('Seleccionar imagen')).not.toBeInTheDocument()
  })

  it('muestra texto normal cuando no está disabled', () => {
    render(<InputFile onChange={() => {}} />)
    
    expect(screen.getByText('Seleccionar imagen')).toBeInTheDocument()
  })

  it('llama a onChange al seleccionar archivo', () => {
    const handleChange = vi.fn()
    const { container } = render(<InputFile onChange={handleChange} />)
    
    const input = container.querySelector('input[type="file"]')
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    
    fireEvent.change(input, { target: { files: [file] } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
  
}); 