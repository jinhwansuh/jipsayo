export interface APIResponse {
  errors: string;
  message: string;
  timestamp: string;
}

export interface LocationState {
  latitude: number;
  longitude: number;
}

export interface FetchHouseRequest {
  roadAddress: string;
  danjiName: string;
}

export interface FetchHouseData {
  id: number;
  jibunAddress: string;
  roadAddress: string;
  cost: number;
  danjiName: string;
  hangCode: number;
  latitude: number;
  longitude: number;
  postCode: number;
  dedicatedArea: number;
  dealDate: string; // 2023-01-15T14:53:58
  createdDate: string; // 2023-01-15T14:53:58
  modifiedDate: string; // 2023-01-15T14:53:58
}

export interface FetchHouseResponse extends APIResponse {
  data: FetchHouseData;
}

export interface HouseData extends FetchHouseData {
  estimateTime: string | boolean;
  estimateTimeArray: [number, number];
  won: string;
}

export interface FetchFilterRequest {
  latitude: string;
  longitude: string;
  cost: string;
  time: string;
}

export interface FetchFilteredHouseDate {
  id: number;
  jibunAddress: string;
  danjiName: string;
  cost: number;
  latitude: number;
  longitude: number;
  time: number;
  dealDate: string;
  dedicatedArea: number;
}

export interface FetchFilteredResponse extends APIResponse {
  data: FetchFilteredHouseDate[];
}

export interface FilterState {
  cost: string;
  time: string;
}
