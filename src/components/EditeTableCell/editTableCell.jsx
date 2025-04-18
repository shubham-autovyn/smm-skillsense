import React, { useEffect, useState } from 'react';

const EditableCell = ({ value, onSave, style }) => {
  const [editingValue, setEditingValue] = useState(value);

  useEffect(() => {
    setEditingValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setEditingValue(inputValue);
    }
  };
  const handleBlur = (e) => {
    const numericValue = parseFloat(editingValue);
    if (e.target.value === '') {
      e.target.value = 0;
    }
    if (!isNaN(numericValue) && numericValue !== value) {
      onSave(numericValue);
      setEditingValue(value);
    }
  };

  return (
    <input
      type="text"
      value={editingValue}
      onChange={handleInputChange}
      onBlur={(e) => handleBlur(e)}
      min="0"
      max="10"
      style={{
        ...style,
        borderBottom: 'none',
        margin: '0',
        width: '100px',
        textAlign: 'start',
      }}
    />
  );
};

export default EditableCell;
