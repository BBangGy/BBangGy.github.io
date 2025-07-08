window.addEventListener('load', () => {
    new Textify({
        el: '[data-textify="welcome"]',
        animation: {
            delay: 0.5,
            duration: 1,
            animateProps: {
                opacity: 0
            }
        }
    }, gsap);
});
window.addEventListener('load', () => {
    new Textify({
        el: '[data-textify="paragraph"]',
        splitType: 'lines',
        largeText: true,
        animation: {
            by: 'lines',
            stagger: 0.075,
            duration: 0.7,
            ease: 'power2',
            transformOrigin: 'left top',
            animateProps: {"rotate": 30, "opacity": 0}
        }
    }, gsap)
})
window.addEventListener('scroll', () => {
    new Textify({
        el: '[data-textify="title"]',
        animation: {
            stagger: 0.05,
            duration: 0.3,
            ease: 'expo.inOut',
            animateProps: {"rotate": 60, "scale": 0, "y": 0}
        }
    }, gsap)
})

const $specifyDialog = document.body.querySelector(':scope>.specify-dialog');
const $specify = $specifyDialog.querySelector(':scope>.specify');
const specifyBtnOne = document.getElementById('specify-one');
const specifyBtnTwo = document.getElementById('specify-two');
const specifyBtnThree = document.getElementById('specify-three');
specifyBtnOne.addEventListener('click', () => {
    $specifyDialog.classList.add('visible');
    $specify.innerHTML = `
        <img src="assets/images/projects/taza.png" alt="" style="width: 100%;height: 50%;">
        <h2 style="color: black">TAZA</h2>
        <p>TAZA는 카카오 API인 길찾기 API와, 지도 API를 사용하여 거리를 계산하여 택시 요금을 알려주도록 만들어진 프로젝트입니다.
        API 사용법을 경험하기 위해서 만들어본 프로젝트입니다.</p>
        
    `
})
specifyBtnTwo.addEventListener('click', () => {
    $specifyDialog.classList.add('visible');
    $specify.innerHTML = `
        <img src="assets/images/projects/kobook.png" alt="" style="width: 100%;height: 50%;">
        <h2 style="color: black">KOBOOK</h2>
        <p>KOBOOK은 타자에서 API 사용하는것을 경험한걸 토대로 만들어본 미니 프로젝트입니다. 공공데이터API를 연동하여
        베스트 도서를 받아왔고, 검색한 도서를 찾기 위해 카카오의 도서 찾기 API를 사용했습니다.
        또한 책을 검색한후 도서관에 빌리고 싶은 사람들을 위해 카카오 지도 API를 활용하여 키워드 검색을 통해 주변 도서관을 지도로 보여줄 수 있도록 하였습니다.</p>
        
    `
})
specifyBtnThree.addEventListener('click', () => {
    $specifyDialog.classList.add('visible');
    $specify.innerHTML = `
        <img src="assets/images/projects/diary.png" alt="" style="width: 100%;height: 50%;">
        <h2 style="color: black">감정일기장</h2>
        <p>react와 html css javascript를 사용하여 감정을 기록할 수 있는 감정일기장을 만들었습니다.</p>
        
    `
})

$specifyDialog.querySelector(':scope>.close').addEventListener('click', () => {
    $specifyDialog.classList.remove('visible');
})


const $toTop = document.body.querySelector(':scope>.to-top');
const topArrow = $toTop.querySelector(':scope>.move-to-top');
topArrow.addEventListener('click',()=>{
    window.scrollTo({
        top:0,
        behavior: 'smooth',

    })
})

const $header = document.getElementById('header');
$header.querySelector(':scope>.layout-content>.list>.item:last-child').addEventListener('click',()=>{
    document.body.querySelector(':scope>.contact').classList.add('visible');
})
document.body.querySelector(':scope>.contact>.close').addEventListener('click',()=>{
    document.body.querySelector(':scope>.contact').classList.remove('visible');
})