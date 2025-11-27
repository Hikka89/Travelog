import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import Navbar from './Navbar';
import createCustomIcon from './CustomMarkerIcon'; // Импортируем наш компонент
import 'leaflet/dist/leaflet.css';

// Стандартная иконка для fallback
const defaultIcon = new Icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Компонент для обработки кликов по карте
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
  });
  return null;
}

// Модальное окно для создания новой метки
function CreateMarkerModal({ isOpen, onClose, onSubmit, position }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop'
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.description.trim()) {
      onSubmit({
        ...formData,
        lat: position.lat,
        lng: position.lng
      });
      onClose();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({ ...prev, image: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Create New Marker
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location Photo
              </label>
              <div className="space-y-3">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-48 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-indigo-900 dark:file:text-indigo-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Location Name *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter location name"
                required
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                placeholder="Describe this location..."
                required
                maxLength={200}
              />
            </div>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Coordinates: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Create Marker
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Компонент для отображения полной информации о метке
function MarkerDetailsModal({ marker, isOpen, onClose }) {
  if (!isOpen || !marker) return null;

  return (
    <div 
      className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img 
            src={marker.image} 
            alt={marker.title}
            className="w-full max-h-96 object-contain bg-gray-100 dark:bg-gray-700"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 text-gray-800 dark:text-white p-2 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 break-words">
            {marker.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4 whitespace-pre-wrap break-words">
            {marker.description}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Coordinates:</strong> {marker.lat?.toFixed(6)}, {marker.lng?.toFixed(6)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент информационной панели
function InfoPanel({ isVisible, onClose, markersCount }) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-4 left-4 z-[1000] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Map Guide</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Click anywhere on the map to add a new travel memory
      </p>
      <div className="text-xs text-gray-500 dark:text-gray-400">
        Your memories: {markersCount}
      </div>
    </div>
  );
}

function MapPage({ user, onLogout, onAddMarker }) {
  const [markers, setMarkers] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isInfoPanelVisible, setIsInfoPanelVisible] = useState(true);

  useEffect(() => {
    if (user?.markers) {
      setMarkers(user.markers);
    }
  }, [user]);

  const handleMapClick = (latlng) => {
    setSelectedPosition(latlng);
    setIsCreateModalOpen(true);
  };

  const handleCreateMarker = (markerData) => {
    const newMarker = {
      id: Date.now(),
      ...markerData
    };
    
    setMarkers(prev => [...prev, newMarker]);
    if (onAddMarker) {
      onAddMarker(newMarker);
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setIsDetailsModalOpen(true);
  };

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="h-[calc(100vh-4rem)] relative">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapClickHandler onMapClick={handleMapClick} />
          
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(marker.image, user.username)} // Используем кастомную иконку
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              <Popup>
                <div className="max-w-xs">
                  <h3 className="font-bold text-lg mb-2 text-gray-900 break-words">
                    {truncateText(marker.title, 30)}
                  </h3>
                  {marker.image && (
                    <img 
                      src={marker.image} 
                      alt={marker.title}
                      className="w-full h-32 object-contain rounded mb-2 bg-gray-100"
                    />
                  )}
                  <p className="text-gray-600 mb-3 text-sm break-words">
                    {truncateText(marker.description, 80)}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkerClick(marker);
                    }}
                    className="w-full bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        
        {/* Информационная панель с кнопкой закрытия */}
        <InfoPanel 
          isVisible={isInfoPanelVisible}
          onClose={() => setIsInfoPanelVisible(false)}
          markersCount={markers.length}
        />

        {/* Модальное окно создания метки */}
        <CreateMarkerModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateMarker}
          position={selectedPosition}
        />

        {/* Модальное окно просмотра метки */}
        <MarkerDetailsModal
          marker={selectedMarker}
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default MapPage;