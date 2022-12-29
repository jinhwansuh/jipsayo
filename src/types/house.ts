export interface FetchHouseRequest {
  jibunAddress: string;
}

interface FetchHouseData {
  id: number;
  jibunAddress: string;
  roadAddress: string;
  cost: number;
  danjiName: string;
  hangCode: number;
  latitude: number;
  longitude: number;
  postCode: number;
  createdDate: string;
  modifiedDate: string;
}

export interface FetchHouseResponse {
  data: FetchHouseData;
  errors: string;
  message: string;
  timestamp: string;
}

export interface HouseData extends FetchHouseData {
  estimateTime: [number, number] | false;
}
