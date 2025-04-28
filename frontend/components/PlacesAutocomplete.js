import React, { useRef, useEffect } from 'react';
import Script from 'next/script';

/**
 * Google Places Autocomplete input for addresses.
 *
 * Props:
 *   value: string (the address value)
 *   onChange: function (called with new address string)
 *   onPlaceSelected: function (called with place object when a place is selected)
 *   placeholder: string
 */
export default function PlacesAutocomplete({ value, onChange, onPlaceSelected, placeholder = 'Enter address...' }) {
  const inputRef = useRef(null);

  // Use a ref to store the autocomplete instance
  const autocompleteRef = useRef(null);

  // This function will be called once the Google Maps script is loaded
  function initAutocomplete() {
    if (!inputRef.current || !window.google || !window.google.maps || !window.google.maps.places) return;
    if (autocompleteRef.current) return; // Prevent double init
    try {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['establishment', 'geocode'],
        componentRestrictions: { country: 'us' },
      });
      autocompleteRef.current = autocomplete;
      inputRef.current._autocomplete = autocomplete;
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (onPlaceSelected) onPlaceSelected(place);
        if (place.formatted_address) onChange(place.formatted_address);
      });
    } catch (e) {
      console.error('Failed to initialize Google Autocomplete:', e);
    }
  }

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="afterInteractive"
        onLoad={initAutocomplete}
        onError={e => console.error('Maps script failed to load', e)}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
        autoComplete="off"
      />
    </>
  );
}
