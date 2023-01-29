export interface SearchAddressData {
  // 모든 데이터는 문자열이며, 값이 없을 경우 공백입니다.
  postcode: string; // ""
  postcode1: string; // ""
  postcode2: string; // ""
  postcodeSeq: string; // ""
  zonecode: string; // "13607"
  address: string; // "경기 성남시 분당구 내정로 54"
  addressEnglish: string; // "54, Naejeong-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea"
  addressType: string; // "R"
  bcode: string; // "4113510300"
  bname: string; // "정자동"
  bnameEnglish: string; // "Jeongja-dong"
  bname1: string; // ""
  bname1English: string; // ""
  bname2: string; // "정자동"
  bname2English: string; // "Jeongja-dong"
  sido: string; // "경기"
  sidoEnglish: string; // "Gyeonggi-do"
  sigungu: string; // "성남시 분당구"
  sigunguEnglish: string; // "Bundang-gu Seongnam-si"
  sigunguCode: string; // : "41135"
  userLanguageType: string; // : "K"
  query: string; // : "분당 주공"
  buildingName: string; // : "한솔마을주공6단지아파트"
  buildingCode: string; // : "4113510300101170000002436"
  apartment: string; // : "Y"
  jibunAddress: string; // : ""
  jibunAddressEnglish: string; // : ""
  roadAddress: string; // : "경기 성남시 분당구 내정로 54"
  roadAddressEnglish: string; // : "54, Naejeong-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea"
  autoRoadAddress: string; // : ""
  autoRoadAddressEnglish: string; // : ""
  autoJibunAddress: string; // : "경기 성남시 분당구 정자동 117"
  autoJibunAddressEnglish: string; // : "117, Jeongja-dong, Bundang-gu, Seongnam-si, Gyeonggi-do, Korea"
  userSelectedType: 'R' | 'J'; // : "R"
  noSelected: string; // : "N"
  hname: string; // : ""
  roadnameCode: string; // : "3180003"
  roadname: string; // : "내정로"
  roadnameEnglish: string; // : "Naejeong-ro"
}

export interface SearchResize {
  width: number;
  height: number;
}

export interface PostResearchRequest {
  savedMoney: number;
  moneyPerMonth: number;
  jibunAddress?: string;
  roadAddress?: string;
  increaseRate: number;
  job?: string;
  occupation?: string;
}

export interface PostResearchResponse {
  id: number;
}
export type PrefetchedHouse = {
  roadAddress: string;
  danjiName: string;
};

export interface PrefetchedHouseResponse {
  data: PrefetchedHouse[];
}
