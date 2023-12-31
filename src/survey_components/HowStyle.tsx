import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelStyle, setTravelStyle } from '../slices/travelInfoSlice'
import { AppDispatch } from '../store'

const HowStyle = () => {
  const travelStyle = useSelector(selectTravelStyle)
  const dispatch = useDispatch<AppDispatch>()

  const handleSelectPlace = (value: string) => {
    // let newTravelStyle = travelStyle.filter(
    //   (item) => item !== 'famous' && item !== 'novel',
    // )
    let newTravelSchedule = [...travelStyle]
    if (newTravelSchedule.includes(value)) {
      newTravelSchedule = newTravelSchedule.filter((item) => item !== value)
    } else {
      newTravelSchedule.push(value)
    }
    dispatch(setTravelStyle(newTravelSchedule))
  }

  const handleSelectStyle = (value: string) => {
    let newTravelStyle = travelStyle.filter(
      (item) => item !== 'busy' && item !== 'lazy',
    )
    newTravelStyle.push(value)
    dispatch(setTravelStyle(newTravelStyle))
  }

  useEffect(() => {}, [dispatch, travelStyle])
  return (
    <>
      <div className="text-2xl pt-20 font-bold">여행 스타일을 알려주세요</div>
      <div className="pt-5 font-bold text-stone-600">
        가보고 싶은 곳을 고를 때 나는
      </div>
      <div className="w-[500px] grid grid-cols-2 gap-4 pt-2">
        <div
          onClick={() => handleSelectPlace('famous')}
          className={`relative w-[220px] h-[230px] pt-2 px-5 flex flex-col rounded-lg items-center justify-center ${
            travelStyle.includes('famous')
              ? 'border-indigo-400 border-4'
              : 'border-2'
          }`}
        >
          {travelStyle.includes('famous') ? (
            <div className="absolute top-0 right-0">
              <Image
                src="/assets/images/check.png"
                alt="체크 표시"
                width={40}
                height={40}
              />
            </div>
          ) : null}
          <div className="p-1">
            <Image
              src={`/assets/famous.jpg`}
              alt="대체_텍스트"
              width={200}
              height={200}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="font-bold text-gray-600">유명한 곳에 갈래요</div>
        </div>
        <div
          onClick={() => handleSelectPlace('novel')}
          className={`relative w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center ${
            travelStyle.includes('novel')
              ? 'border-indigo-400 border-4'
              : 'border-2'
          }`}
        >
          {travelStyle.includes('novel') ? (
            <div className="absolute top-0 right-0">
              <Image
                src="/assets/images/check.png"
                alt="체크 표시"
                width={40}
                height={40}
              />
            </div>
          ) : null}
          <div className="p-1">
            <Image
              src={`/assets/novel.jpg`}
              alt="대체_텍스트"
              width={200}
              height={200}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="font-bold text-gray-600">참신한 곳에 갈래요</div>
        </div>
      </div>
      <div className="pt-5 font-bold text-stone-600">
        관광지를 둘러볼 때 나는
      </div>
      <div className="w-[500px] grid grid-cols-2 gap-4 pt-2">
        <div
          onClick={() => handleSelectStyle('busy')}
          className={`relative w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center ${
            travelStyle.includes('busy')
              ? 'border-indigo-400 border-4'
              : 'border-2'
          }`}
        >
          {travelStyle.includes('busy') ? (
            <div className="absolute top-0 right-0">
              <Image
                src="/assets/images/check.png"
                alt="체크 표시"
                width={40}
                height={40}
              />
            </div>
          ) : null}
          <div className="p-1">
            <Image
              src={`/assets/busy.jpg`}
              alt="대체_텍스트"
              width={200}
              height={200}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="font-bold text-gray-600">바쁘게 돌아다닌다</div>
        </div>
        <div
          onClick={() => handleSelectStyle('lazy')}
          className={`relative w-[220px] h-[230px] border-2 pt-2 px-5 flex flex-col rounded-lg items-center justify-center ${
            travelStyle.includes('lazy')
              ? 'border-indigo-400 border-4'
              : 'border-2'
          }`}
        >
          {travelStyle.includes('lazy') ? (
            <div className="absolute top-0 right-0">
              <Image
                src="/assets/images/check.png"
                alt="체크 표시"
                width={40}
                height={40}
              />
            </div>
          ) : null}
          <div className="p-1">
            <Image
              src={`/assets/lazy.jpg`}
              alt="대체_텍스트"
              width={200}
              height={200}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <div className="font-bold text-gray-600">느긋하게 다닌다</div>
        </div>
      </div>
    </>
  )
}

export { HowStyle }
