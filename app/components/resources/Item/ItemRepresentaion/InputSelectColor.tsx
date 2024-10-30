    import React, { useState } from 'react';

    export default function InputSelectColor() {
      const colors = ['red', 'green', 'orange', 'blue', 'purple', 'yellow', 'pink', 'brown'];
      const [selectedColor, setSelectedColor] = useState<string | null>(null);
    
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
                    // borderRadius: '50%',
                    backgroundColor: color,
                    border: selectedColor !== color ? '1px solid #dddd' : '3px solid #3F2F67',
                    cursor: 'pointer',
                  }}
                />
              </label>
            ))}
          </div>
        </div>
      );
    }
    