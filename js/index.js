function $(select) {
    return document.querySelector(select);
}
var contentElement = {
    changeImg: $('.changeImg'),
    containerImgSpan: $('.container-img').querySelector('span'),
    lookImg: $('.lookImg'),
    imgFrom: $('.imgFrom'),
    imgTo: $('.imgTo'),
    moveImg: $('.moveImg'),
    moveImgSpan: $('.moveImg').querySelector('span'),
    move: $('.move')
}
var imgNumber = 5;
var moveLeft = null;
var imgToLeft = null;
var isVerify = false;
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function createLookImg() {
    isVerify = false;
    let lookImgWidth = contentElement.lookImg.offsetWidth, lookImgHeight = contentElement.lookImg.offsetHeight - 55;
    let randomImg = getRandom(1, imgNumber);
    let y = getRandom(5, lookImgHeight), x = getRandom(lookImgWidth / 2, lookImgWidth - 55);
    let randomBg = `url('../img/t${randomImg}.png')`;
    contentElement.containerImgSpan.style.color = 'black';
    contentElement.containerImgSpan.innerHTML = '请完成图片验证'
    contentElement.lookImg.style.backgroundImage = randomBg;
    contentElement.imgTo.style.left = x + 'px';
    contentElement.imgTo.style.top = y + 'px';
    contentElement.imgFrom.style.backgroundImage = randomBg;
    contentElement.imgFrom.style.backgroundPosition = `-${x}px -${y}px`;
    contentElement.move.style.left = -2 + 'px';
    contentElement.imgFrom.style.left = 0 + 'px';
    contentElement.imgFrom.style.top = y + 'px';
    contentElement.imgFrom.style.opacity = '0';
    imgToLeft = x;
}
function onWindowMove(e) {
    if (e.srcElement === contentElement.move) {
        const moveImgX = contentElement.moveImg.offsetLeft;
        let left = e.clientX - moveImgX - moveLeft;
        if (left < -2) {
            left = -2;
        }
        if (left > (contentElement.moveImg.offsetWidth - contentElement.move.offsetWidth - 10)) {
            left = contentElement.moveImg.offsetWidth - contentElement.move.offsetWidth - 10;
        }
        contentElement.move.style.left = left + 'px';
        contentElement.imgFrom.style.left = left + 'px';
    }
}
function onMoveDown(e) {
    if (isVerify) return;
    moveLeft = e.offsetX;
    contentElement.move.style.transition = "none";
    contentElement.imgFrom.style.transition = "none";
    contentElement.imgFrom.style.opacity = '1';
    contentElement.containerImgSpan.style.color = 'black';
    contentElement.containerImgSpan.innerHTML = '拖动图片完成验证'
    contentElement.moveImgSpan.style.opacity = '0';
    window.addEventListener('mousemove', onWindowMove)
    window.addEventListener('mouseup', function () {
        let imgFromLeft = contentElement.imgFrom.offsetLeft;
        if (imgToLeft - imgFromLeft > 5 || imgFromLeft - imgToLeft > 5) {
            contentElement.moveImgSpan.style.opacity = '1';
            contentElement.containerImgSpan.style.color = '#008000';
            contentElement.containerImgSpan.innerHTML = '验证失败';
            contentElement.move.style.transition = "all .5s";
            contentElement.imgFrom.style.transition = "all .5s";
            contentElement.move.style.left = -2 + 'px';
            contentElement.imgFrom.style.left = 0 + 'px';
        } else {
            contentElement.moveImgSpan.style.opacity = '0';
            contentElement.containerImgSpan.style.color = 'red';
            contentElement.containerImgSpan.innerHTML = '验证成功';
            contentElement.imgFrom.style.left = imgToLeft + 'px';
            isVerify = true;
        }
        window.removeEventListener('mousemove', onWindowMove)
    })
}
const initEvent = function () {
    contentElement.changeImg.addEventListener('click', createLookImg);
    contentElement.move.addEventListener('mousedown', onMoveDown);
}
const main = function () {
    createLookImg();
    initEvent();
}
main();