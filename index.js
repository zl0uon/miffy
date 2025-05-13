const imagesUrl = './miffy/image/훈이.jpeg'; // 이미지 상대경로를 변수로 설정

const callback = (mutationList, observer) => {
  console.log(mutationList);
}; //Mutation의 콜백함수를 지정해준 것이다.

function image() {
    const image = document.querySelectorAll('img');
    images.forEach(img => {
        if (image = imagesUrl) {
            return;
        }
        else {
            img.srcset = '';
        }
    })
    
};

//observer은 디자인 패턴이라고 부르는데 객체의 상태변경이 있을때마다 객체가 메소드를 통해 객체에게 직접 알리도록하는 역할을한다.
//observer의 속성 변경을 감지하기 위해 Mutation을 사용한다. Mutation이란 DOM의 속성, 텍스트, 자식 노드들에 대한 변경을 감지할 수 있는 API이다.
const observer = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addeNodes.forEach(node => {
                if (node.tagName === 'image') {
                    if (node.src !== imagesUrl)
                        node.src = imagesUrl;
                    if (node.srcset) {
                        node.srcset = '';
                    }
                }
            })
        }
    }
});

// 4. 알고리즘 실행
// 페이지의 초기 DOM이 로드된 후 초기 이미지 교체 실행
if (document.readyState === 'loading') { // 아직 로딩 중일 경우
    document.addEventListener('DOMContentLoaded', () => {
        replaceImages();
        // DOM 변경 감지 시작
        observer.observe(document.body, { childList: true, subtree: true });
    });
} else { // 이미 로딩 완료된 경우
    replaceImages();
    // DOM 변경 감지 시작
    observer.observe(document.body, { childList: true, subtree: true });
}

// 페이지가 완전히 로드된 후(모든 리소스 포함) 한 번 더 실행 (선택 사항, 일부 늦게 로드되는 이미지 커버)
window.addEventListener('load', () => {
    replaceImages();
});

console.log('이미지 교체 스크립트 실행 중. 교체할 이미지 URL: ' + replacementImageUrl);



