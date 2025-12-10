// src/test/components/atoms/Image.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import Image from '../../../components/atoms/Image'

describe('Image Component', () => {

    it('renderiza la imagen correctamente', () => {
    const testSrc = 'https://example.com/logo.jpg'
    const testAlt = 'Logo de la empresa'

    render(<Image src={testSrc} alt={testAlt} />)
            
    expect(screen.getByAltText('Logo de la empresa')).toBeInTheDocument()
  })

});