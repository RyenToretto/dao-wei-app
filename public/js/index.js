function activeClass($obj, index, classStr="active"){
    for (let i = 0; i < $obj.length; i++) {
        $($obj[i]).removeClass(classStr)
    }
    $($obj[index]).addClass(classStr)
}

$(function () {
    /**** 头部 fixed ****/
    $(document).on("scroll", function (e) {
        if($("#content")[0].getBoundingClientRect().top<0){
            $(".top_line1_box").addClass("fixed_header");
        }else{
            $(".top_line1_box").removeClass("fixed_header");
        }
    });
    
    /**** ajax 获取首页所有 json 数据 ****/
    $.get("http://127.0.0.1:3000/home_data", function(response){
        if(response.code === "200"){
            console.log(response.data);
            $(".banner_box .banner_nav1").html(template("banner_nav",{data: response.data}));
            $(".service_wrapper .service_box").html(template("service_boxs",{data: response.data}));
        }
    });
    
    /**** 轮播图 ****/
    const $picUL = $(".home_swiper_box .home_swiper");
    const $pics = $(".home_swiper_box .home_swiper>li");
    
    const $pointUL = $(".home_swiper_box .points");
    const $points = $(".home_swiper_box .points>li");
    
    function setAutoSwiper(){
        $picUL[0].timerId = setInterval(function () {    // 定时器 自动轮播
            $picUL[0].index++;
            if($picUL[0].index === $points.length){
                $picUL[0].index = 0
            }
            activeClass($pics, $picUL[0].index);
            activeClass($points, $picUL[0].index);
        }, 3000)
    }
    
    function resetAutoSwiper() {
        clearInterval($picUL[0].timerId);
        setAutoSwiper()
    }
    
    $picUL[0].index = 0;    // 记录当前的轮播 index
    setAutoSwiper();    // 开启自动轮播

    $pointUL.on("click", "li", function(e){    // 委派实现小圆点控轮播图
        resetAutoSwiper();
        $picUL[0].index = $points.index($(this));    // 更新 index
        activeClass($pics, $picUL[0].index);
        activeClass($points, $picUL[0].index);
    });
});
