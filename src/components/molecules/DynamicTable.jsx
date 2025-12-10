import React from 'react';
import Image from '../atoms/Image';
import Button from '../atoms/Button';

function DynamicTable({ columns = [], data = [], className = '', striped = true, hover = true, emptyMessage = 'No hay datos disponibles', }) {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                {emptyMessage}
            </div>
        );
    }

    const isArrayFormat = data.length > 0 && Array.isArray(data[0]);

    const isImageUrl = (str) => {
        if (!str || typeof str !== 'string') return false;
        return str.startsWith('http') || str.startsWith('/') || str.includes('.png') || str.includes('.jpg') || str.includes('.jpeg') || str.includes('.svg') || str.includes('.gif') || str.includes('.webp');
    };

    const renderCellValue = (value) => {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' || typeof value === 'number') return value;
        if (typeof value === 'object') {
            if (value.nombre) return value.nombre;
            if (value.label) return value.label;
            return JSON.stringify(value);
        }
        return String(value);
    };

    return (
        <div className={`overflow-x-auto rounded-lg shadow-sm ${className}`}>
            <table className="w-full border-collapse bg-white">
                <thead>
                    <tr className="bg-gray-100 border-b">
                        {columns.map((header, index) => (
                            <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider" >
                                {typeof header === 'string' ? header : header.label || header.key}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data.map((row, rowIndex) => {
                        const cells = isArrayFormat ? row : columns.map((col) => {
                            const key = typeof col === 'string' ? col.toLowerCase() : col.key;
                            
                            const cellValue = row[col] ?? row[key] ?? '';
                            return renderCellValue(cellValue);
                        });

                        return (
                            <tr key={row.id || rowIndex} className={`  ${striped && rowIndex % 2 === 0 ? 'bg-gray-50' : ''} ${hover ? 'hover:bg-gray-100' : ''} transition-colors`} >
                                {cells.map((cell, cellIndex) => {
                                    const header = columns[cellIndex];
                                    const headerText = typeof header === 'string' ? header : header.label || header.key;
                                    const headerLower = headerText.toLowerCase();

                                    if (headerLower === 'acciones') {
                                        return (
                                            <td key={cellIndex} className="px-4 py-3 text-sm">
                                                <div className="flex gap-2">
                                                    <Button text="Editar" onClick={() => row.onEdit?.(row)}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs rounded-md font-medium active:scale-95 transition-all" />
                                                    <Button text="Eliminar" onClick={() => row.onDelete?.(row.id)}
                                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs rounded-md font-medium active:scale-95 transition-all" />
                                                </div>
                                            </td>
                                        );
                                    }

                                    const isImageColumn = headerLower.includes('logo') ||
                                        headerLower.includes('imagen') ||
                                        headerLower.includes('foto') ||
                                        headerLower.includes('avatar');

                                    const shouldShowImage = isImageColumn && isImageUrl(cell);

                                    return (
                                        <td key={cellIndex} className={`px-4 py-3 text-sm text-gray-900 align-top ${isImageColumn ? 'whitespace-normal' : 'whitespace-nowrap'} `}>
                                            {shouldShowImage ? (
                                                <Image src={cell} alt={headerText} className="h-12 w-12 object-contain rounded-lg shadow-sm"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'block';
                                                    }}
                                                />
                                            ) : null}
                                            <span className={shouldShowImage ? 'hidden' : ''}>
                                                {renderCellValue(cell)}
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DynamicTable;