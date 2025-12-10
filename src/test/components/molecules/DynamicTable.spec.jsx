// src/test/components/molecules/DynamicTable.spec.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DynamicTable from '../../../components/molecules/DynamicTable' 

describe('DynamicTable Component', () => {
  
  it('muestra mensaje cuando no hay datos', () => {
    render(<DynamicTable data={[]} columns={['Nombre', 'Edad']} />)
    
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('renderiza tabla con datos', () => {
    const columns = ['Producto', 'Precio', 'Cantidad']
    const data = [
      ['Monster', 2500, 3],
      ['Red Bull', 2000, 5],
    ]
    
    render(<DynamicTable columns={columns} data={data} />)
    
    // Verificar que la tabla existe
    expect(screen.getByRole('table')).toBeInTheDocument()
    
    // Verificar los encabezados
    expect(screen.getByText('Producto')).toBeInTheDocument()
    expect(screen.getByText('Precio')).toBeInTheDocument()
    expect(screen.getByText('Cantidad')).toBeInTheDocument()
    
    // Verificar los datos
    expect(screen.getByText('Monster')).toBeInTheDocument()
    expect(screen.getByText(2500)).toBeInTheDocument()
    expect(screen.getByText(3)).toBeInTheDocument()
    expect(screen.getByText('Red Bull')).toBeInTheDocument()
    expect(screen.getByText(2000)).toBeInTheDocument()
    expect(screen.getByText(5)).toBeInTheDocument()
    
    // Verificar el número de filas (1 encabezado + 2 filas de datos)
    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 1 header + 2 data rows
  })

});