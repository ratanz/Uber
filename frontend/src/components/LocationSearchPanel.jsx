import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({ suggestions, onSuggestionSelect }) => {
  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((location, index) => (
          <div 
            onClick={() => onSuggestionSelect(location)}
            className='flex items-center justify-start p-3 border-2 border-gray-50 active:border-black rounded-xl gap-4 my-2 cursor-pointer hover:bg-gray-50' 
            key={index}
          >
            <h2>
              <i className="bg-[#eee] rounded-full h-10 w-10 flex items-center justify-center ri-map-pin-2-fill"></i>
            </h2>
            <h4 className='font-medium'>{location}</h4>
          </div>
        ))
      ) : (
        <div className='p-3 text-gray-500 text-center'>
          Type to search for locations...
        </div>
      )}
    </div>
  )
}

export default LocationSearchPanel
