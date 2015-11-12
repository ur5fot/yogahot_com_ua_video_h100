// вызываем после загрузки дома
document.addEventListener("DOMContentLoaded", video12);

function video12() {
    var classScrollTo = '.action-scrollTo',// класс (или что угодно) до которого скролится
        delta = 0,// недо, пере скролл
        animateDuration = 500,// время сролла
        videoDuration = 0, //задержка перед воспроизведение видео
        videoFoto = 'https://pp.vk.me/c627820/v627820058/1bc3c/QxjtAHfAghk.jpg';


    var video1 = document.getElementById('video12');
    var videoShow = document.querySelectorAll('[data-video-show]');
    var scrollTo = document.querySelector(classScrollTo);
    var down = document.getElementById('down');
    var main = document.getElementById('main-video');

//         проигровать видео с задежкой  videoDuration
    setTimeout(function () {
        video1.play()
    }, videoDuration);

    //  на весь экран
    main.style.height = Math.round(document.documentElement.clientHeight) + 'px';

//        на весь экран проверяем с интервавлом
    setInterval(function () {
        main.style.height = Math.round(document.documentElement.clientHeight) + 'px';
    }, 1500);


    //  показ блоков после видео и фона после видео

    video1.addEventListener("ended", function () {
        //video1.src = videoFoto;
        for (var i = 0; i < videoShow.length; i++) {
            var videoShowAttr = videoShow[i].getAttribute('data-video-show');
            videoShow[i].classList.add(videoShowAttr);
        }
    });

    //скролл
    down.onclick = function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        var heightScroll = scrollTo.getBoundingClientRect().top;
        animate({
            duration: animateDuration,
            timing: function circ(timeFraction) {
                return 1 - Math.sin(Math.acos(timeFraction))
            },
            draw: function (progress) {
                window.scrollTo(scrollLeft, scrollTop + (heightScroll - delta) * Math.abs(progress));
            }
        });
    };


// фунция анимации
    function animate(options) {

        var start = performance.now();

        requestAnimationFrame(function animate(time) {
            // timeFraction от 0 до 1
            var timeFraction = (time - start) / options.duration;
            if (timeFraction > 1) timeFraction = 1;

            // текущее состояние анимации
            var progress = options.timing(timeFraction)

            options.draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }

        });
    }
}
