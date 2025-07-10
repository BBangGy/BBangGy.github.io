const $main = document.getElementById('main');
$main.querySelector(':scope > .common.main > .start')
    .addEventListener('click', () => {
        const target = document.getElementById('projects');
        target.scrollIntoView({behavior: "smooth"});

        // 모든 메뉴에서 active 제거
        const menuLinks = document.querySelectorAll('.list .item a');
        menuLinks.forEach(link => link.classList.remove('active'));

        // #work로 가는 링크만 active 추가
        const workLink = document.querySelector('.list .item a[href="#projects"]');
        if (workLink) {
            workLink.classList.add('active');
        }
    });

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
document.addEventListener('DOMContentLoaded', () => {
    const introLink = document.querySelector('a[href="#intro"]');
    introLink.classList.add('active');
    introLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: "smooth"});
    })
    const menuLinks = document.querySelectorAll('.list .item a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active')); // 기존 active 제거
            link.classList.add('active'); // 클릭된 메뉴에 active 추가
        })
    })

})
const wrapper = $main.querySelector(':scope>.common.projects>.layout-container>.sliderWrapper>.slider');
const slides = wrapper.querySelectorAll(':scope>.box');
const prevBtn = $main.querySelector(':scope>.common.projects>.layout-container>.sliderWrapper>.prev');
const nextBtn = $main.querySelector(':scope>.common.projects>.layout-container>.sliderWrapper>.next');

let currentIndex = 0;

function showSlide(index) {
    if (index < 0) {
        index = slides.length - 1;
    }
    if (index >= slides.length) {
        index = 0;
    }
    wrapper.style.transform = `translateX(-${index * 50.1875}rem)`;
    slides.forEach((box) => {
        box.classList.remove('active');
    })
    slides[index].classList.add('active');

    currentIndex = index;
}

prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));


const $skills = document.getElementById('skills');
const $skillSections = $skills.querySelectorAll(
    '.front-skills, .backend-skills, .db-skills, .etc-skills');
const $menuList = $skills.querySelectorAll(':scope>.layout-container>.menu>.list>.item');
$menuList.forEach(menu => {
    // 초기 설정
    $skillSections.forEach(section => section.classList.add('active'));
    $skills.querySelector(':scope > .layout-container > .menu > .list > .all').classList.add('active');

    menu.addEventListener('click', () => {
        $menuList.forEach(item => {
            item.classList.remove('active', 'centered');
        });
        menu.classList.add('active');

        const type = menu.classList[1];

        $skillSections.forEach(section => {
            section.classList.remove('active', 'centered');

            const label = section.querySelector(':scope > span');
            if (label) label.style.display = 'block'; // 초기화 시 모두 보이게
        });

        if (type === 'all') {
            $skillSections.forEach(section => {
                section.classList.add('active');

                const label = section.querySelector(':scope > span');
                if (label) label.style.display = 'block'; // 👈 여기 중요
            });
        } else {
            const selected = $skills.querySelector(`.${type}-skills`);
            if (selected) {
                selected.classList.add('active', 'centered');

                const label = selected.querySelector(':scope > span');
                if (label) label.style.display = 'none';
            }
        }
    });
});

// JavaScript for handling project modal image slider

const dialog = document.getElementById('dialog');
const dialogSlider = dialog.querySelector('.slider');
const prev = dialog.querySelector('.prev');
const next = dialog.querySelector('.next');
const projectBoxes = document.querySelectorAll('.projects .box');

const projectImageCount = {
    clone: 4,
    diary: 5,
    kobook: 4,
    r3f: 2,
    taza:7
};
const projectDescriptions = {
    clone: [
        "GOOGLE 홈페이지를 클론 코딩",
        "iMBank 홈페이지를 클론 코딩",
        "당근 홈페이지를 클론 코딩",
        "번개장터 상세페이지를 클론 코딩"
    ],
    taza:[
        "KAKO API를 활용한 택시 요금 계산 프로젝트",
        "경로찾기를 통해 경로를 설정하여",
        "출발지와 도착지를 설정한다.",
        "호출을 누르면 KAKO API를 통해 결제까지 가능하다.",
        "",
        ""
    ],
    kobook: [
        "공공API를 활용하여 만든 프로젝트",
        "책을 검색하여 공공API로 데이터를 불러와 리스트로 보여준다.",
        "책을 빌리기 위해 도서관을 찾는다.",
        "도서관을 입력하면 그 지역 도서관이 나오며 정보와 길을 안내해준다."
    ],
    diary: [
        "리액트 프레임워크를 공부하기 위해서 만들어본 프로젝트",
        "useState, useEffect, useRef 등 훅을 사용하여 입력하고, localStorage에 저장하고, 참조하는 미니 프로젝트를 만들었다.",
        "적은 일기를 localStorage에 저장하여 해당 하는 월에 보여준다.",
        "선택을 하기위한 페이지 입니다.",
        "localStorage에 저장된 값을 불러와서 수행한다."
    ],
    r3f: [
        "리액트 프레임워크를 활용한 인터렉티브 웹 프로젝트",
        "react-three/fiber와 react-three/drei를 활용해 사용자가 3D 신발 모델을 회전하고 직접 색상을 선택하여 커스터마이징할 수 있는 기능을 구현하였다.fiber를 통해 Three.js의 객체(Scene, Mesh, Light 등)를React 컴포넌트 형태로 다룰 수 있게 해보았고, drei를 통해 카메라 컨트롤, 조명 등을 간결하게 처리하며 사용자 경험 중심의 개발을 시도해보았다."

    ],

    annualLeave: []
};


let currentDialogIndex = 0;
let currentImages = [];

projectBoxes.forEach(box => {
    box.addEventListener('click', async () => {
        const classList = Array.from(box.classList);
        const projectClass = classList.find(cls => cls !== 'box' && cls !== 'active');
        if (!projectClass || !projectImageCount[projectClass]) return;

        currentImages = await loadExistingImages(projectClass, projectImageCount[projectClass]);
        if (currentImages.length > 0) {
            openDialogSlider();
        }
    });
});

function loadExistingImages(projectClass, count) {
    const tryPaths = [];
    for (let i = 1; i <= count; i++) {
        tryPaths.push(`assets/images/projects/${projectClass}/${projectClass}${i}.png`);
    }

    const promises = tryPaths.map(path => {
        return new Promise(resolve => {
            const img = new Image();
            img.src = path;
            img.onload = () => resolve(path);
            img.onerror = () => resolve(null);
        });
    });

    return Promise.all(promises).then(results => results.filter(Boolean));
}

function openDialogSlider() {
    dialog.classList.add('visible');
    currentDialogIndex = 0;
    renderDialogSlides();
}

function renderDialogSlides() {
    dialogSlider.innerHTML = '';
    currentImages.forEach((src, i) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.style.display = i === currentDialogIndex ? 'flex' : 'none';

        const img = document.createElement('img');
        img.src = src;
        item.appendChild(img);

        // 설명 추가
        const classList = currentImages[0].split('/');
        const projectName = classList[classList.length - 2];
        const descriptionText = (projectDescriptions[projectName] && projectDescriptions[projectName][i]) || "";

        if (descriptionText) {
            const desc = document.createElement('div');
            desc.textContent = descriptionText;
            desc.style.color = 'white';
            desc.style.marginTop = '1rem';
            desc.style.fontSize = '2rem';
            desc.style.textAlign = 'center';
            desc.style.width = '50rem';
            item.appendChild(desc);
        }

        dialogSlider.appendChild(item);
    });

    // 이미지 개수 정보
    const countInfo = document.createElement('div');
    countInfo.textContent = `${currentDialogIndex + 1} / ${currentImages.length}`;
    countInfo.style.color = 'white';
    countInfo.style.marginTop = '1rem';
    countInfo.style.fontSize = '1.2rem';
    countInfo.style.textAlign = 'center';
    dialogSlider.appendChild(countInfo);

}


function showDialogSlide(index) {
    if (currentImages.length === 0) return;
    if (currentDialogIndex === currentImages.length - 1 && index > currentDialogIndex) {
        // 마지막에서 다음 클릭 시 닫기
        dialog.classList.remove('visible');
        return;
    }
    if (index < 0) index = currentImages.length - 1;
    if (index >= currentImages.length) index = 0;
    currentDialogIndex = index;
    renderDialogSlides();
}

prev.addEventListener('click', () => showDialogSlide(currentDialogIndex - 1));
next.addEventListener('click', () => showDialogSlide(currentDialogIndex + 1));

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        dialog.classList.remove('visible');
    }
});

setInterval(() => {
    const $proContainer = document.body.querySelector('.pro-container');
    $proContainer.classList.toggle('flip');
}, 3000);