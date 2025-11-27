import { Icon, divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';

// Упрощенный вариант с HTML иконкой
const createCustomIcon = (imageUrl, username) => {
  const size = 40;
  
  // Создаем HTML для иконки
  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      border: 3px solid white;
      border-radius: 50%;
      background: ${imageUrl ? `url('${imageUrl}')` : '#4f46e5'};
      background-size: cover;
      background-position: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 14px;
      font-family: Arial, sans-serif;
    ">
      ${!imageUrl && username ? username.slice(0, 2).toUpperCase() : ''}
    </div>
  `;

  return divIcon({
    html: html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
    className: 'custom-marker-icon'
  });
};

export default createCustomIcon;