import { FetchFilteredHouseDate } from '~/types/house';

interface Overlay {
  customOverlay: any;
  danjiName: FetchFilteredHouseDate['danjiName'];
  jibunAddress: FetchFilteredHouseDate['jibunAddress'];
  fullWon: string;
  time: FetchFilteredHouseDate['time'];
}

export const makeOverlayContent = ({
  customOverlay,
  danjiName,
  jibunAddress,
  fullWon,
  time,
}: Overlay) => {
  const containerEl = document.createElement('div');
  containerEl.className = 'info__container';

  const wrapperEl = document.createElement('div');
  wrapperEl.className = 'info__wrapper';

  const headerEl = document.createElement('div');
  headerEl.className = 'info__title';
  headerEl.appendChild(document.createTextNode(danjiName));

  const closeButtonEl = document.createElement('div');
  closeButtonEl.className = 'info__close';
  closeButtonEl.title = '닫기';
  closeButtonEl.onclick = function () {
    customOverlay.setMap(null);
  };
  headerEl.appendChild(closeButtonEl);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'info__body';

  bodyEl.innerHTML = `
    <div class="info__text">${jibunAddress}</div>
    <div class="info__detail">
      <div class="info__header">
        <div class="info__text">최근 실거래가 기준</div>
        <div class="info__text">대중 교통</div>
      </div>
      <div class="info__value">
        <div class="info__highlight">${fullWon}</div>
        <div class="info__highlight">${time}분</div>
      </div>
    </div>
  `;

  wrapperEl.appendChild(headerEl);
  wrapperEl.appendChild(bodyEl);

  containerEl.appendChild(wrapperEl);

  return containerEl;
};
