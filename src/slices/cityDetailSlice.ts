import { persistReducer } from 'redux-persist'
import { AppThunk, RootState } from '../store'
import storage from 'redux-persist/lib/storage'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SERVER_API_URL } from './api_url'
import axios, { AxiosResponse } from 'axios'

export interface CountryInfo {
  descriptionInfo: {
    publisher: string
  }
  plugin: {
    electricPotential: string
  }
  flagThumbnail: string
  currencyInformation: {
    exchangeRate: string
  }
}

export interface CityDetail {
  travelSchedule: CityDetail | null
  travel_id: string
  name_ko: string
  name_en: string
  geoType: string
  image: {
    photoUrl: string
  }
  continentType: string
  countryType: string
  imageList: string[]
  exchangeInfo: {
    description: string
  }
  weatherRecommend: {
    season: string
    fullDescription: string
  }
  visaInfo: {
    description: string
    url: string
    notice: string
  }
  tipInfo: {
    description: string
  }
  priceInfo: {
    shortDescription: string
    fullDescription: string
  }
  countryInfo: CountryInfo
}

const initialState: CityDetail = {
  travelSchedule: null,
  travel_id: '64d5db580023220827bfbbbb',
  name_ko: '산토리니',
  name_en: 'Santorini',
  geoType: 'city',
  image: {
    photoUrl:
      'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201216104202993_W700KRB5R.jpg/fb287_3_i1.jpg?type=w540_fst',
  },
  continentType: '유럽',
  countryType: '그리스',
  imageList: [
    'https://dbscthumb-phinf.pstatic.net/5885_000_12/20201216104202993_W700KRB5R.jpg/fb287_3_i1.jpg?type=w540_fst',
  ],
  exchangeInfo: {
    description:
      '현지에서 카드 사용이 보편적이므로 최소한의 현금만 환전할 것을 추천한다. 현지 ATM을 사용하여 출금도 원활하다.',
  },
  weatherRecommend: {
    season: '5월~9월',
    fullDescription:
      '초성수기 기간 전이나 후인 5~6월이나 9월 초에 여행을 계획하는 것을 추천한다.4월부터 점차 따뜻해지며, 여행성수기 5~9',
  },
  visaInfo: {
    description: '90일, 무비자',
    url: 'https://www.0404.go.kr/consulate/visa.jsp',
    notice: '코로나 19로 인해 입국조건이 제한적입니다.',
  },
  tipInfo: {
    description:
      '테이크아웃 음식점에서는 팁이 불필요하지만 식당 이용 시 팁은 에티켓이다. 보통 5~10% 정도이며, 만약 식당 요금이 €28',
  },
  priceInfo: {
    shortDescription: '저렴',
    fullDescription: '한국의 약 80%',
  },
  countryInfo: {
    descriptionInfo: {
      publisher: 'Dd',
    },
    plugin: {
      electricPotential: 'dd',
    },
    flagThumbnail: 'dd',
    currencyInformation: {
      exchangeRate: '1455.52',
    },
  },
}

export const CityDetailSlice = createSlice({
  name: 'cityDetail',
  initialState,
  reducers: {
    setCityDetail: (state, action: PayloadAction<CityDetail>) => {
      state.travelSchedule = action.payload.travelSchedule
    },
    setTravelId: (state, action: PayloadAction<string>) => {
      state.travel_id = action.payload
    },
    setNameKo: (state, action: PayloadAction<string>) => {
      state.name_ko = action.payload
    },
    setNameEn: (state, action: PayloadAction<string>) => {
      state.name_en = action.payload
    },
    setGeoType: (state, action: PayloadAction<string>) => {
      state.geoType = action.payload
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image.photoUrl = action.payload
    },
  },
})

export interface CityInput {
  destination: string
}

export const fetchCityDetail = async (
  cityInput: CityInput,
): Promise<CityDetail> => {
  let API_URL: string = SERVER_API_URL + '/info/destination'

  const config = {
    withCredentials: true,
  }
  console.log('API_URL', API_URL)

  const response: AxiosResponse<CityDetail> = await axios.post(
    API_URL,
    cityInput,
    config,
  )

  console.log('response', response)

  const dddd: CityDetail = response.data
  return dddd
}
export const fetchCityDetailAsync =
  (cityInput: CityInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: CityDetail | string | null
      type: 'cityDetail/setTravelSchedule'
    }) => void,
  ) => {
    try {
      const travelSchedule = await fetchCityDetail(cityInput)
      console.log('travelSchedule', travelSchedule)
      //dispatch(setCityDetail(travelSchedule))
    } catch (error: any) {
      console.log(error)
    }
  }

const persistConfig = {
  key: 'cityDetail',
  storage,
}

const persistedCityDetailReducer = persistReducer(
  persistConfig,
  CityDetailSlice.reducer,
)

export const {
  setCityDetail,
  setGeoType,
  setTravelId,
  setNameKo,
  setNameEn,
  setImage,
} = CityDetailSlice.actions

export const selectCityDetail = (state: RootState) => state.cityDetail
export const selectTravelId = (state: RootState) => state.cityDetail.travel_id
export const selectNameKo = (state: RootState) => state.cityDetail.name_ko
export const selectNameEn = (state: RootState) => state.cityDetail.name_en
export const selectGeoType = (state: RootState) => state.cityDetail.geoType
export const selectImage = (state: RootState) => state.cityDetail.image.photoUrl

export default persistedCityDetailReducer
