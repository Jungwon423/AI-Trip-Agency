import React, { useEffect, useRef } from 'react'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { setCity, selectCity, setCoordinate } from '../slices/travelInfoSlice'
import { useSelector, useDispatch } from 'react-redux'
import router from 'next/router'
import LocalStorage from './LocalStorage'

interface MapboxGeocoderContainerProps {
  accessToken: string
}

const MapboxGeocoderContainer: React.FC<MapboxGeocoderContainerProps> = ({
  accessToken,
}) => {
  // Redux
  let city = useSelector(selectCity)
  console.log(city)
  const dispatch = useDispatch()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      console.log('containerRef.current', containerRef.current)
      const geocoder = new MapboxGeocoder({
        accessToken,
        placeholder: '다음 여행지는 어디로 가시나요?',
      })
      geocoder.on('result', (event) => {
        console.log('Selected place:', event.result)
        // Call your callback function here, passing the selected place as a parameter
        dispatch(setCity(event.result.place_name))
        dispatch(setCoordinate(event.result.center))

        // local storage 에서 tempId 가져오기
        let tempId: string

        if (LocalStorage.getItem('tempId') == null) {
          let randomStr: string = Math.random().toString(36).substring(2, 12)
          console.log('randomStr : ', randomStr)
          LocalStorage.setItem('tempId', randomStr)
          tempId = randomStr
        } else {
          tempId = LocalStorage.getItem('tempId')! // null check
        }

        router.push('/search')
      })
      geocoder.addTo(containerRef.current)
    }
  }, [])

  return (
    <div>
      <div className="mt-2s flex justify-center items-center">
        <div ref={containerRef}></div>
      </div>
    </div>
  )
}

export default MapboxGeocoderContainer
