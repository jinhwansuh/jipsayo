export interface FetchHouseRequest {
  jibunAddress: string;
}

export interface FetchHouseResponse {
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

export interface HouseData extends FetchHouseResponse {
  estimateTime: [number, number] | false;
}
