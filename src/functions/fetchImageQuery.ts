import { PlaceInfo } from '../interfaces/placeInfo'
import { convertToPlaceInfo } from './jsonToPlaceInfo'
import { ImageQueryInput, ImageQueryState } from '../interfaces/imageQuery'
import axios from 'axios'
import { SERVER_API_URL } from '../slices/api_url'
import { AppThunk } from '../store'
import { setImageQuery, setError, setLoading } from '../slices/imageQuerySlice'

function convertImageListToPlaceInfoList(image: any): PlaceInfo {
  return {
    name: image.nameKo ? image.nameKo : image.nameEn,
    image: image.image.photoURL,
    summary: {
      overview: image.descriptionInfo.publisher,
    },
  }
}

export function processAttractionList(atttractionList: any): PlaceInfo[][] {
  return atttractionList.map((cluster: any) => {
    const attractions = cluster.map(convertImageListToPlaceInfoList)
    return [...attractions]
  })
}

export const fetchImageQuery = async (
  ImageQueryInput: ImageQueryInput,
): Promise<ImageQueryState> => {
  const config = {
    withCredentials: true,
  }

  let API_URL: string = SERVER_API_URL + '/preference/attractionImageQuery'

  const response = await axios.post(API_URL, ImageQueryInput, config)

  const placeInfos: PlaceInfo[][] = processAttractionList(
    response.data.query_list,
  )

  const imageQuery: ImageQueryState = {
    query_list: placeInfos,
    loading: 'pending',
    error: null,
    resultList: [],
  }
  return imageQuery
}

export const fetchImageQueryAsync =
  (ImageQueryInput: ImageQueryInput): AppThunk =>
  async (
    dispatch: (arg0: {
      payload: string | ImageQueryState | null
      type:
        | 'imageQuery/setImageQuery'
        | 'imageQuery/setLoading'
        | 'imageQuery/setError'
    }) => void,
  ) => {
    try {
      dispatch(setLoading('pending'))
      const imageQuery = await fetchImageQuery(ImageQueryInput)
      dispatch(setImageQuery(imageQuery))
      dispatch(setLoading('succeeded'))
    } catch (error) {
      dispatch(setError(JSON.stringify(error)))
      dispatch(setLoading('failed'))
    }
  }
