const $main = document.getElementById('main');
$main.querySelector(':scope > .common.main > .start')
    .addEventListener('click', () => {
        const target = document.getElementById('about');
        target.scrollIntoView({behavior: "smooth"});

        // 모든 메뉴에서 active 제거
        const menuLinks = document.querySelectorAll('.list .item a');
        menuLinks.forEach(link => link.classList.remove('active'));

        // #work로 가는 링크만 active 추가
        const workLink = document.querySelector('.list .item a[href="#about"]');
        if (workLink) {
            workLink.classList.add('active');
        }
    });

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
document.addEventListener('DOMContentLoaded', () => {
    // 초기 Intro 메뉴 활성화
    const introLink = document.querySelector('a[href="#intro"]');
    introLink.classList.add('active');
    introLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: "smooth"});
    });

    const menuLinks = document.querySelectorAll('.list .item a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ✅ IntersectionObserver 추가
    const sections = document.querySelectorAll('main > section.common');
    const observer = new IntersectionObserver(
        // IntersectionObserver는 스크롤을 감지해서 요소(section 등)가 화면에 들어왔는지를 관찰하는 API입니다.
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    //entry.isIntersecting=	현재 화면에 절반 이상 보이는가 (true/false)
                    const id = entry.target.getAttribute('id');
                    // entry.target= 감시 중인 DOM 요소 (<section id="about"> 등)

                    // 메뉴 active 클래스 갱신
                    menuLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        {
            root: null, //viewport 자체를 기준으로 감지 (기본 설정)
            rootMargin: '0px', //여백 없이 정확히 viewport 크기로 감지
            threshold: 0.4, // 절반 이상 보일 때만 적용-> 얼만큼 보이는지에 대해서 설정
        }
    );

    sections.forEach(section => observer.observe(section));
});
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
    taza: 7,
    annualLeave: 7,
    board: 6,
    homggoo:13,
    alleon:14
};
const projectDescriptions = {
    clone: [
        "GOOGLE 홈페이지를 클론 코딩해보았습니다.",
        "iMBank 홈페이지를 클론 코딩해보았습니다.",
        "당근 홈페이지를 클론 코딩해보았습니다.",
        "번개장터 상세페이지를 클론 코딩해보았습니다."
    ],
    taza: [
        "KAKO API를 활용한 택시 요금 계산 프로젝트",
        "경로찾기를 통해 경로를 설정합니다.",
        "출발지와 도착지를 설정합니다.",
        "호출을 누르면 KAKAO API를 통해 결제까지 가능합니다.",
        "",
        ""
    ],
    kobook: [
        "공공API를 활용하여 만든 프로젝트",
        "책을 검색하여 공공API로 데이터를 불러와 리스트로 보여줍니다.",
        "책을 빌리기 위해 도서관을 찾습니다.",
        "도서관을 입력하면 그 지역 도서관이 나오며 정보와 길을 안내해줍니다."
    ],
    diary: [
        "리액트 프레임워크를 공부하기 위해서 만들어본 프로젝트\n useState, useEffect, useRef 등 훅을 사용하여 입력하고, localStorage에 저장하고, 참조하는 미니 프로젝트를 만들었습니다.",
        "",
        "적은 일기를 localStorage에 저장하여 해당 하는 월에 보여줍니다.",
        "작성 하기위한 페이지 입니다.",
        "localStorage에 저장된 값을 불러와서 수행합니다."
    ],
    r3f: [
        "리액트 프레임워크를 활용한 인터렉티브 웹 프로젝트",
        "react-three/fiber와 react-three/drei를 활용해 사용자가 3D 신발 모델을 회전하고 직접 색상을 선택하여 커스터마이징할 수 있는 기능을 구현하였습니다.fiber를 통해 Three.js의 객체(Scene, Mesh, Light 등)를React 컴포넌트 형태로 다룰 수 있게 해보았고, drei를 통해 카메라 컨트롤, 조명 등을 간결하게 처리하며 사용자 경험 중심의 개발을 시도해보았습니다."

    ],
    annualLeave: [
        "프론트와 백엔드를 같이 구현한 연차프로그램\nSpring Boot와 MyBatis 기반의 웹 애플리케이션으로, 사용자 로그인, 회원가입, 아이디·비밀번호 찾기, 연차 등록 기능을 구현했습니다." +
        "프론트엔드는 HTML/CSS/JavaScript로 구성하고, MariaDB와 연동하여 사용자 인증과 데이터 관리를 처리했습니다.",
        "로그인 페이지와 기능을 구현  \n (유효성 검사도 구현하였습니다.)",
        "회원가입 페이지와 기능을 구현 \n (유효성 검사도 구현하였습니다.)",
        "아이디/비밀번호찾기와 기능을 구현",
        "",
        "",
        "연차 등록후 페이지"
    ],
    board: [
        "프론트와 백엔드를 같이 구현한 게시판 프로그램\nSpring Boot와 MyBatis 기반의 웹 애플리케이션으로, 사용자 로그인, 회원가입, 이메일 인증, 게시판 기능, 댓글 기능,페이지네이션을 구현했습니다.",
        "로그인 페이지와 기능을 구현  \n (유효성 검사도 구현하였습니다.)",
        "회원가입 페이지와 기능을 구현 \n (유효성 검사도 구현하였습니다.)",
        "마이페이지와 기능을 구현  \n (유효성 검사도 구현하였습니다.)",
        "",
        "게시판 등록후 모습입니다."
    ],
    homggoo:[
        "중고나라와 비슷한 중고가구들을 거래할수 있는 사이트를 구현했습니다.\n 백엔드와 프론트엔드를 다 접하여 관리자페이지, 게시물 관리, 공지사항 등록, 회원가입, 소설로그인, 마이페이지 수정을 구현했습니다. \n <a href='https://homggoo.hyeongyuchung.com' target='_blank'>HOMGGOO</a> 을 통해 들어가볼수있습니다.",
        "로그인 페이지와 기능을 구현",
        "회원가입 페이지와 기능을 구현",
        "관리자 페이지와 기능을 구현",
        "관리자가 공지사항을 관리하는 기능을 구현",
        "관리자가 공지사항을 등록 할 수 있도록 ckeditor를 사용하여 구현",
        "관리자가 게시글을 관리하는 기능을 구현",
        "관리자가 회원 검색하고 관리하는 기능을 구현",
        "회원 정보 관리와 구매 물품에 대한 기능을 구현",
        "회원 정보 수정과 탈퇴 기능을 구현",
        "관리자가 등록한 공지사항 검색과 공지사항을 볼수 있는 기능을 구현",
        "상세 공지사항",
        "중고거래가 이루어질수 있는 거래 페이지",
        "회원들의 소통이 이루어지는 커뮤니티 페이지"
    ],
    alleon:[
        "사용자가 필요한 정부 복지를 한눈에 확인할 수 있는 맞춤형 웹 서비스를 구현했습니다.\n 게시물·공지사항 관리, 페이지네이션, 소셜 로그인 기반 회원가입을 지원하며, 공공 API를 연동해 실시간 데이터를 제공합니다.\n <a href='https://alleon.kimgh.dev' target='_blank'>AEO</a> 을 통해 들어가볼수있습니다.",
        "사용자가 원하는 복지를 검색할 수 있도록 구현",
        "",
        "",
        "선택한 복지에 대해 상세 내용을 볼 수 있도록 구현",
        "자유게시판을 통해 사람들과의 소통을 할 수 있게 구현",
        "게시글에 대한 상세 내용을 볼 수 있도록 구현, 댓글 또한 작성할 수 있도록 구현",
        "게시글을 작성할 수 있도록 구현",
        "공지사항을 볼 수 있도록 구현",
        "공지사항에 대한 상세 내용을 볼 수 있도록 구현",
        "자기 정보를 알 수 있는 마이페이지를 구현",
        "원하는 날짜에 마크할 수 있도록 기능을 구현",
        "마크된 목록을 누르면 상세 내용을 간단하게 알려줄수 있도록 구현",
        "즐겨찾기한 목록을 볼 수 있도록 구현"
    ]
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
            desc.innerHTML = descriptionText.replace(/\n/g, '<br>');
            desc.querySelectorAll('a').forEach(a => {
                a.style.color = "#F1B540";
                a.style.textDecoration = "underline"; // 선택
                a.setAttribute('target', '_blank');   // 새 탭 열기
            });
            desc.style.color = 'white';
            desc.style.marginTop = '1rem';
            desc.style.fontSize = '1rem';
            desc.style.fontFamily = 'Oswald, sans-serif';
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
    countInfo.style.paddingTop = '2.5rem';
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

dialog.querySelector(':scope>.modal>.closeBtn').addEventListener('click', (e) => {
    dialog.classList.remove('visible');
})

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