/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
    import React, { useState } from 'react';

    export default function InputSelectColor({
      setSelectedColor,
      selectedColor
    } : {
      setSelectedColor: any,
      selectedColor: any
    }
    ) {
      const colors = ['red', 'green', 'orange', 'blue', 'purple', 'yellow', 'pink', 'brown', 'black'];

    
      const handleColorChange = (color: string) => {
        setSelectedColor(color);
      };
    
      return (
        <div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {colors.map((color) => (
              <label key={color} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  name="color"
                  value={color}
                  checked={selectedColor === color}
                  onChange={() => handleColorChange(color)}
                  style={{ display: 'none' }}
                />
                <div
                  style={{
                    width: '55px',
                    height: '55px',
                    borderRadius: '2px',
                    backgroundColor: color,
                    border: selectedColor !== color ? '1px solid #dddd' : '3px dashed #dedede',
                    cursor: 'pointer',
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      );
    }
    