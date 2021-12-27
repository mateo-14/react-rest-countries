import { useState } from 'react';
import './Select.css';

function Select({ placeholder = '', items, onItemSelect, selectedItem }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleSelectItem = (item) => {
    setIsVisible(false);
    if (onItemSelect) onItemSelect(item);
  };

  return (
    <div className="select">
      <button className={`select__toggle ${selectedItem ? 'has-selected' : ''}`} onClick={handleClick}>
        {selectedItem?.value || placeholder}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 451.847 451.847"
          width="10"
          height="10"
        >
          <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" />
        </svg>
      </button>
      {isVisible && (
        <ul className="select-list">
          {items.map((item) => (
            <li className="select-item">
              <button onClick={() => handleSelectItem(item)} key={item.id}>
                {item.value}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;
