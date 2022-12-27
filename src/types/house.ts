export interface FetchHouseRequest {
  jibunAddress: string;
}

export interface FetchHouseResponse {
  id: number;
  jibunAddress: string;
  roadAddress: string;
  cost: number;
  latitude: number;
  longitude: number;
  createdDate: string;
  modifiedDate: string;
}
