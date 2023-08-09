import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentPlace } from '../../slices/travelInfoSlice'
import { useState } from 'react'

const Recommend = () => {
  const selectedPlace = useSelector(selectCurrentPlace)
  const [isThoughtVisible, setIsThoughtVisible] = useState(false)
  const toggleThought = () => {
    setIsThoughtVisible(!isThoughtVisible)
  }
  return (
    <div className="my-2 text-start w-full">
      <div className="flex items-center px-3">
        <span>Trippy가 이 여행지를 추천하는 이유 </span>
        <button onClick={toggleThought}>
          {isThoughtVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      </div>
      {isThoughtVisible && <div className="p-3">{selectedPlace?.thought}</div>}
    </div>
  )
}

export default Recommend