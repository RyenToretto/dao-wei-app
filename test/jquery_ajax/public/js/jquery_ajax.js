$(function () {
    const $province = $("#province");
    const $city = $("#city");
    const $county = $("#county");
    
    // 进入页面 首先渲染省份
    $.get("http://localhost:3000/province", function({code, data}){
        if(code === 200){
            const htmlStr = template(
                'templateScript',
                {data, firstOption: '请选择省份', name: 'province'}
            );
            $province.html(htmlStr);
        }else{
            alert(data);    // 网络不稳定，请刷新重试
        };
    });
    
    // 省 改变出现 市
    $province.on("change", function(){
        const province = this.value;    /* <option value="11">北京</option> */
        $.get('/city', {province}, function({code, data}){
            if(code === 200){
                const htmlStr = template(
                    'templateScript',
                    {data, firstOption: '请选择市', name: 'city'}
                );
                $city.html(htmlStr);
            }else{
                alert(data);    // 网络不稳定，请刷新重试
            };
        });
    });
    
    // 市 改变出现 县
    $city.on("change", function(){
        const province = $province.val();    /* <option value="11">北京</option> */
        const city = $city.val();    /* <option value="undefined">鞍山市</option> */
        $.get('/county', {province, city}, function({code, data}){
            if(code === 200){
                const htmlStr = template(
                    'templateScript',
                    {data, firstOption: '请选择区县', name: 'county'}
                );
                $county.html(htmlStr);
            }else{
                alert(data);    // 网络不稳定，请刷新重试
            };
        });
    });
});
