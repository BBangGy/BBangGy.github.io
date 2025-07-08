// const $main = document.getElementById('main');
//
// function initScrollAnimation($main) {
//     let yOffset = 0;
//     let currentScene = 0;
//     let prevScrollHeight = 0;
//     let enterNewScene = false;
//
//     const sceneInfo = [
//         {
//             type: 'sticky',
//             heightNum: 1,
//             scrollHeight: 0,
//             objs: {
//                 container: document.getElementById('scroll-section0'),
//                 showContainer: $main.querySelector(':scope>.showing-page'),
//             },
//         },
//         {
//             type: 'sticky',
//             heightNum: 2,
//             scrollHeight: 0,
//             objs: {
//                 container: document.getElementById('scroll-section1'),
//                 introduce: $main.querySelector(':scope>.my-info>.introduce'),
//                 introduceMessage: document.body.querySelector(':scope>.layout-wrapper>.my-info>.introduce>.introduce-message-a'),
//                 title: document.querySelector('#scroll-section1 .title')
//             },
//             values: {
//                 introduce_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 introduce_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//                 introduce_translate_in: [20, 0, {start: 0.01, end: 0.2}],
//                 introduce_translate_out: [0, -20, {start: 0.32, end: 0.5}],
//                 title_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 title_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//             },
//         },
//         {
//             type: 'sticky',
//             heightNum: 2,
//             scrollHeight: 0,
//             objs: {
//                 container: document.getElementById('scroll-section2'),
//                 license: $main.querySelector(':scope>.license-info>.license'),
//                 licenseMessage: $main.querySelector(':scope>.license-info>.license>.license-message'),
//                 title: document.querySelector('#scroll-section2 .title')
//             },
//             values: {
//                 license_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 license_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//                 license_translate_in: [20, 0, {start: 0.01, end: 0.2}],
//                 license_translate_out: [0, -20, {start: 0.32, end: 0.5}],
//                 title_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 title_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//             }
//         },
//         {
//             type: 'sticky',
//             heightNum: 2,
//             scrollHeight: 0,
//             objs: {
//                 container: document.getElementById('scroll-section3'),
//                 skill: $main.querySelector(':scope>.skill-info>.skill'),
//                 skillMessage: $main.querySelector(':scope>.skill-info>.skill>.skill-message'),
//                 title: document.querySelector('#scroll-section3 .title')
//             },
//             values: {
//                 skill_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 skill_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//                 skill_translate_in: [20, 0, {start: 0.01, end: 0.2}],
//                 skill_translate_out: [0, -20, {start: 0.32, end: 0.5}],
//                 title_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 title_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//             }
//         },
//         {
//             type: 'sticky',
//             heightNum: 2,
//             scrollHeight: 0,
//             objs: {
//                 container: document.getElementById('scroll-section4'),
//                 project: $main.querySelector(':scope>.project-info>.project'),
//                 projectMessage: $main.querySelector(':scope>.project-info>.project>.project-message'),
//                 title: document.querySelector('#scroll-section4 .title')
//             },
//             values: {
//                 project_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 project_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//                 project_translate_in: [20, 0, {start: 0.01, end: 0.2}],
//                 project_translate_out: [0, -20, {start: 0.32, end: 0.5}],
//                 title_opacity_in: [0, 1, {start: 0.01, end: 0.2}],
//                 title_opacity_out: [1, 0, {start: 0.32, end: 0.5}],
//             }
//         }
//     ];
//
//     function calcValues(values, currentYOffset) {
//         const scrollHeight = sceneInfo[currentScene].scrollHeight;
//         const scrollRatio = currentYOffset / scrollHeight;
//         if (values.length === 3) {
//             const partScrollStart = values[2].start * scrollHeight;
//             const partScrollEnd = values[2].end * scrollHeight;
//             const partScrollHeight = partScrollEnd - partScrollStart;
//
//             if (currentYOffset < partScrollStart) return values[0];
//             if (currentYOffset > partScrollEnd) return values[1];
//             return (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
//         } else {
//             return scrollRatio * (values[1] - values[0]) + values[0];
//         }
//     }
//
//     function scrollToSection(targetYOffset) {
//         window.scrollTo({ top: targetYOffset, behavior: 'smooth' });
//     }
//
//     function playAnimation() {
//         const values = sceneInfo[currentScene].values;
//         const objs = sceneInfo[currentScene].objs;
//         const currentYOffset = yOffset - prevScrollHeight;
//         const scrollHeight = sceneInfo[currentScene].scrollHeight;
//         const scrollRatio = currentYOffset / scrollHeight;
//
//         switch (currentScene) {
//             case 1:
//                 animateSection(objs, values, currentYOffset, scrollRatio, 'introduce');
//                 break;
//             case 2:
//                 animateSection(objs, values, currentYOffset, scrollRatio, 'license');
//                 break;
//             case 3:
//                 animateSection(objs, values, currentYOffset, scrollRatio, 'skill');
//                 break;
//             case 4:
//                 animateSection(objs, values, currentYOffset, scrollRatio, 'project');
//                 break;
//         }
//     }
//
//     function animateSection(objs, values, currentYOffset, scrollRatio, key) {
//         if (scrollRatio <= 0.3) {
//             objs[key].style.opacity = calcValues(values[`${key}_opacity_in`], currentYOffset);
//             objs[key].style.transform = `translate3d(0, ${calcValues(values[`${key}_translate_in`], currentYOffset)}%, 0)`;
//             objs.title.style.opacity = calcValues(values.title_opacity_in, currentYOffset);
//         } else {
//             objs[key].style.opacity = calcValues(values[`${key}_opacity_out`], currentYOffset);
//             objs[key].style.transform = `translate3d(0, ${calcValues(values[`${key}_translate_out`], currentYOffset)}%, 0)`;
//             objs.title.style.opacity = calcValues(values.title_opacity_out, currentYOffset);
//         }
//     }
//
//     function setLayout() {
//         let totalScrollHeight = 0;
//         for (let i = 0; i < sceneInfo.length; i++) {
//             sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
//             sceneInfo[i].objs.container.style.height = `${(sceneInfo[i].scrollHeight) / 16}rem`;
//         }
//         yOffset = window.scrollY;
//         for (let i = 0; i < sceneInfo.length; i++) {
//             totalScrollHeight += sceneInfo[i].scrollHeight;
//             if (totalScrollHeight >= yOffset) {
//                 currentScene = i;
//                 break;
//             }
//         }
//         document.body.setAttribute('id', `show-scene-${currentScene}`);
//     }
//
//     function scrollLoop() {
//         enterNewScene = false;
//         prevScrollHeight = 0;
//         for (let i = 0; i < currentScene; i++) {
//             prevScrollHeight += sceneInfo[i].scrollHeight;
//         }
//
//         if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
//             enterNewScene = true;
//             currentScene++;
//             document.body.setAttribute('id', `show-scene-${currentScene}`);
//         }
//
//         if (yOffset < prevScrollHeight) {
//             if (currentScene === 0) return;
//             enterNewScene = true;
//             currentScene--;
//             document.body.setAttribute('id', `show-scene-${currentScene}`);
//         }
//
//         if (!enterNewScene) playAnimation();
//     }
//
//     function setupEventListeners() {
//         document.querySelector('.category1').addEventListener('click', (e) => {
//             e.preventDefault();
//             const scene = sceneInfo[1];
//             const offset = scene.objs.container.offsetTop + (scene.scrollHeight * scene.values.introduce_opacity_in[2].end);
//             scrollToSection(offset);
//         });
//
//         document.querySelector('.category2').addEventListener('click', (e) => {
//             e.preventDefault();
//             const scene = sceneInfo[2];
//             const offset = scene.objs.container.offsetTop + (scene.scrollHeight * scene.values.license_opacity_in[2].end);
//             scrollToSection(offset);
//         });
//
//         document.querySelector('.category3').addEventListener('click', (e) => {
//             e.preventDefault();
//             const scene = sceneInfo[3];
//             const offset = scene.objs.container.offsetTop + (scene.scrollHeight * scene.values.skill_opacity_in[2].end);
//             scrollToSection(offset);
//         });
//
//         document.querySelector('.category4').addEventListener('click', (e) => {
//             e.preventDefault();
//             const scene = sceneInfo[4];
//             const offset = scene.objs.container.offsetTop + (scene.scrollHeight * scene.values.project_opacity_in[2].end);
//             scrollToSection(offset);
//         });
//
//         window.addEventListener('scroll', () => {
//             yOffset = window.scrollY;
//             scrollLoop();
//         });
//
//         window.addEventListener('load', setLayout);
//         window.addEventListener('resize', setLayout);
//     }
//
//     setupEventListeners();
//     setLayout();
// }
//
// document.addEventListener('DOMContentLoaded',()=>{
//     initScrollAnimation($main);
// });
//
//
//
//
//

const $main = document.getElementById('main');

function initScrollAnimation($main) {
    let yOffset = 0;
    let currentScene = 0;
    let prevScrollHeight = 0;
    let enterNewScene = false;

    const sceneInfo = [
        {
            type: 'sticky',
            heightNum: 1,
            scrollHeight: 0,
            objs: {
                container: document.getElementById('scroll-section0'),
                showContainer: $main.querySelector(':scope>.showing-page'),
            },
        },
        {
            type: 'sticky',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                container: document.getElementById('scroll-section1'),
                introduce: $main.querySelector(':scope>.my-info>.introduce'),
                title: document.querySelector('#scroll-section1 .title')
            },
            values: {
                introduce_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                introduce_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
                introduce_translate_in: [20, 0, { start: 0.01, end: 0.2 }],
                introduce_translate_out: [0, -20, { start: 0.32, end: 0.5 }],
                title_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                title_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
            },
        },
        {
            type: 'sticky',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                container: document.getElementById('scroll-section2'),
                license: $main.querySelector(':scope>.license-info>.license'),
                title: document.querySelector('#scroll-section2 .title')
            },
            values: {
                license_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                license_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
                license_translate_in: [20, 0, { start: 0.01, end: 0.2 }],
                license_translate_out: [0, -20, { start: 0.32, end: 0.5 }],
                title_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                title_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
            }
        },
        {
            type: 'sticky',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                container: document.getElementById('scroll-section3'),
                skill: $main.querySelector(':scope>.skill-info>.skill'),
                title: document.querySelector('#scroll-section3 .title')
            },
            values: {
                skill_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                skill_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
                skill_translate_in: [20, 0, { start: 0.01, end: 0.2 }],
                skill_translate_out: [0, -20, { start: 0.32, end: 0.5 }],
                title_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                title_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
            }
        },
        {
            type: 'sticky',
            heightNum: 2,
            scrollHeight: 0,
            objs: {
                container: document.getElementById('scroll-section4'),
                project: $main.querySelector(':scope>.project-info>.project'),
                title: document.querySelector('#scroll-section4 .title')
            },
            values: {
                project_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                project_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
                project_translate_in: [20, 0, { start: 0.01, end: 0.2 }],
                project_translate_out: [0, -20, { start: 0.32, end: 0.5 }],
                title_opacity_in: [0, 1, { start: 0.01, end: 0.2 }],
                title_opacity_out: [1, 0, { start: 0.32, end: 0.5 }],
            }
        }
    ];

    function calcValues(values, currentYOffset) {
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
        if (values.length === 3) {
            const partStart = values[2].start * scrollHeight;
            const partEnd = values[2].end * scrollHeight;
            const partHeight = partEnd - partStart;

            if (currentYOffset < partStart) return values[0];
            if (currentYOffset > partEnd) return values[1];
            return (currentYOffset - partStart) / partHeight * (values[1] - values[0]) + values[0];
        } else {
            return scrollRatio * (values[1] - values[0]) + values[0];
        }
    }

    function scrollToSection(targetYOffset) {
        window.scrollTo({ top: targetYOffset, behavior: 'smooth' });
    }

    function animateSection(objs, values, currentYOffset, scrollRatio, key) {
        if (scrollRatio <= 0.3) {
            objs[key].style.opacity = calcValues(values[`${key}_opacity_in`], currentYOffset);
            objs[key].style.transform = `translate3d(0, ${calcValues(values[`${key}_translate_in`], currentYOffset)}%, 0)`;
            objs.title.style.opacity = calcValues(values.title_opacity_in, currentYOffset);
        } else {
            objs[key].style.opacity = calcValues(values[`${key}_opacity_out`], currentYOffset);
            objs[key].style.transform = `translate3d(0, ${calcValues(values[`${key}_translate_out`], currentYOffset)}%, 0)`;
            objs.title.style.opacity = calcValues(values.title_opacity_out, currentYOffset);
        }
    }

    function playAnimation() {
        const values = sceneInfo[currentScene].values;
        const objs = sceneInfo[currentScene].objs;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

        switch (currentScene) {
            case 1:
                animateSection(objs, values, currentYOffset, scrollRatio, 'introduce');
                break;
            case 2:
                animateSection(objs, values, currentYOffset, scrollRatio, 'license');
                break;
            case 3:
                animateSection(objs, values, currentYOffset, scrollRatio, 'skill');
                break;
            case 4:
                animateSection(objs, values, currentYOffset, scrollRatio, 'project');
                break;
        }
    }

    function highlightMenu(sceneIndex) {
        const menuItems = document.querySelectorAll('header .item a');
        menuItems.forEach((item) => item.classList.remove('active-menu'));

        const classMap = {
            1: 'category1',
            2: 'category2',
            3: 'category3',
            4: 'category4',
        };

        const activeClass = classMap[sceneIndex];
        if (activeClass) {
            const activeEl = document.querySelector(`.${activeClass}`);
            if (activeEl) activeEl.classList.add('active-menu');
        }
    }

    function setLayout() {
        let totalHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight / 16}rem`;
        }
        yOffset = window.scrollY;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalHeight += sceneInfo[i].scrollHeight;
            if (totalHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        highlightMenu(currentScene);
    }

    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            if (currentScene === 0) return;
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }

        if (!enterNewScene) {
            playAnimation();
            highlightMenu(currentScene);
        }
    }

    function setupEventListeners() {
        const categories = ['category1', 'category2', 'category3', 'category4'];

        categories.forEach((className, index) => {
            document.querySelector(`.${className}`).addEventListener('click', (e) => {
                e.preventDefault();

                // 👉 클릭한 순간 바로 메뉴 강조
                highlightMenu(index + 1);

                // 부드러운 스크롤은 그대로 유지
                const scene = sceneInfo[index + 1]; // index+1 because 0 is welcome
                const offset = scene.objs.container.offsetTop + (scene.scrollHeight * scene.values[Object.keys(scene.values)[0]][2].end);
                scrollToSection(offset);
            });
        });

        window.addEventListener('scroll', () => {
            yOffset = window.scrollY;
            scrollLoop();
        });

        window.addEventListener('load', setLayout);
        window.addEventListener('resize', setLayout);
    }

    setupEventListeners();
    setLayout();
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation($main);
});
