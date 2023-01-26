interface Overlay {
  customOverlay: any;
  danjiName: string;
  jibunAddress: string;
}

export const makeOverlayContent = ({
  customOverlay,
  danjiName,
  jibunAddress,
}: Overlay) => {
  const containerEl = document.createElement('div');
  containerEl.className = 'wrap';

  const wrapperEl = document.createElement('div');
  wrapperEl.className = 'info';

  const headerEl = document.createElement('div');
  headerEl.className = 'title';
  headerEl.appendChild(document.createTextNode(danjiName));

  const closeButtonEl = document.createElement('div');
  closeButtonEl.className = 'close';
  closeButtonEl.title = '닫기';
  closeButtonEl.onclick = function () {
    customOverlay.setMap(null);
  };
  headerEl.appendChild(closeButtonEl);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'body';

  bodyEl.innerHTML = `<div class="img"> 
                    <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70"> 
               </div> 
                <div class="desc"> 
                    <div class="ellipsis">${jibunAddress}</div> 
                    <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div> 
                    <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div> 
                </div> 
            </div>`;

  wrapperEl.appendChild(headerEl);
  wrapperEl.appendChild(bodyEl);

  containerEl.appendChild(wrapperEl);

  return containerEl;
};
