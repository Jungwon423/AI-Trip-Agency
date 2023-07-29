import React, { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'

interface MapboxGeocoderContainerProps {
  accessToken: string
}

const MapboxGeocoderContainer: React.FC<MapboxGeocoderContainerProps> = ({
  accessToken,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      console.log('containerRef.current', containerRef.current)
      const geocoder = new MapboxGeocoder({ accessToken })
      geocoder.on('result', (event) => {
        console.log('Selected place:', event.result)
        // Call your callback function here, passing the selected place as a parameter
        const targetUrl = '/search'
        window.location.href = targetUrl
      })
      geocoder.addTo(containerRef.current)
    }
  }, [])

  return (
    <div className="mt-8 flex justify-center items-center">
      <div ref={containerRef}></div>
    </div>
  )
}

export default MapboxGeocoderContainer