import { HouseData } from '~/types/house';

export const initialAddress = {
  userSelectedType: '',
  roadAddress: '',
  jibunAddress: '',
  bname: '',
  buildingName: '',
  apartment: '',
  zonecode: '',
  extraAddr: '',
};

export const initialResearch = {
  cash: '',
  saving: '',
  rate: '',
};

export const initialHouseData: HouseData = {
  id: 0,
  jibunAddress: '',
  roadAddress: '',
  cost: 0,
  hangCode: 0,
  danjiName: '',
  postCode: 0,
  latitude: 0,
  longitude: 0,
  createdDate: '',
  modifiedDate: '',
  estimateTime: true,
  won: '',
  dedicatedArea: 0,
  dealDate: '',
  estimateTimeArray: [0, 0],
};

export const houseImageData = [
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  'https://images.unsplash.com/photo-1580216643062-cf460548a66a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
  'https://images.unsplash.com/photo-1524235325756-750277bf9ac6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  'https://images.unsplash.com/photo-1573987116136-8161883a27f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=331&q=80',
  'https://images.unsplash.com/photo-1505662482633-714f2c0e066e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=394&q=80',
  'https://images.unsplash.com/photo-1500864685331-50f6398b3c51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
  'https://images.unsplash.com/photo-1534604554657-0581d533ef41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80',
];
