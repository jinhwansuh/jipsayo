declare global {
  interface Window {
    gtag: (param1: string, param2: string, param3: object) => void;
  }
}
declare const daum: any;
declare const kakao: any;

export {};
