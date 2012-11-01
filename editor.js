$('document').ready(function() {
     //动态生成编辑器元素
    //获取页面class名为'editable'的元素，添加可编辑属性为true
    var editable = $('.editable'),
    //获取颜色值
        inputColor = '<label for="colorInput" style="color:white; font-family: Microsoft Yahei; font-size:12px;">页面背景：</label><input style="margin-bottom:-6px; padding:0; height: 18px;" type="color" class="colorInput">',
    //设置颜色值
        colorButton = '<input type="button" id="colorButton" placeholder="请输入颜色值(示例red/#ccc)" value="设置颜色">',
    //banner图片路径    
        banner = '<label for="banner" style="padding-left:20px; color:white; font-family: Microsoft Yahei; font-size:12px;">banner图片：</label><input type="text" class="banner" placeholder="请输入banner图片地址">',
    //设置banner按钮 
        bannerButton = '<input type="button" id="bannerButton" value="设置banner">',
    //保存按钮
        saveButton = '<input style="margin-left:20px" type="button" id="saveButton" value="生成页面"><label for="saveButton"style="color:red; font-family: Microsoft Yahei; font-size:12px;">"Ctrl"+"S"另存页面</label>',
        bannerHrefButton = '<input type="button" id="bannerHrefButton" value="banner链接">',
        bannerHref = '<label for="bannerHref" style="padding-left:20px; color:white; font-family: Microsoft Yahei; font-size:12px;">banner链接：</label><input type="text" id="bannerHref" placeholder="输入banner链接" >',
        inputSrc = '<label for="inputSrc" style="color:white; font-family: Microsoft Yahei; font-size:12px; padding-left:30px">标题链接：</label><input style="margin-bottom:-6px; padding:0; height: 18px;" type="text" id="inputSrc">',
        srcButton = '<input type="button" id="srcButton" value="设置">',
        editableButton = '<span style="background:#ccc;" id="editableButton">编辑</span>'
    
    $('body').attr("contenteditable","false");
    editable.attr("contenteditable","true");


    //初始化本地存储函数
    function initLocalStorage(ele, contentId) {
        ele.blur(function() {
            localStorage.setItem(contentId, ele.text());
            document.designMode = "off";
        });
        ele.focus(function() {
            document.designMode = "on";
        })

        if(localStorage.getItem(contentId)) {
            ele.text(localStorage.getItem(contentId));
        }
    }

    //initLocalStorage($('.test'), "content01");

    //调用本地存储函数
    var count = 0;
    editable.click(function() {
        var that = $(this); 
        count+=1;
        var contentNumber = "content"+count;
        //console.log(this);
        //console.log(that);
        //initLocalStorage(that, contentNumber);
    })

    //设置背景颜色
    function setBg(colorValue) {
      $('body').css("background-color", colorValue);
    };

    //动态添加编辑器
    var initUI = function() {
      $('#editor').append($(inputColor));
      $('#editor').append($(colorButton));
      $('#editor').append($(banner));
      $('#editor').append($(bannerHref));
      $('#editor').append($(bannerButton));     
      $('#editor').append($(inputSrc));
      $('#editor').append($(srcButton));
      $('#editor').append($(saveButton));
    }


    $('#srcButton').live('click', function() {
        var targetSrc = $('#inputSrc').val();
        //console.log(targetSrc);
        $('#title').wrap('<a class="newArch" />');
        $('.newArch').css({"display":"block","text-decoration":"none","color":"white"});
        $('.newArch').attr('href',targetSrc);
    })

    //阻止banner默认点击事件
    $('#banner').click(function(event) {
        var that = $(this);
        event.preventDefault();
    });

    //移除页面动态标签
    function removeTag () {
        editable.removeAttr("contenteditable");
        editable.removeAttr("class");
        $('#editor').remove();
        $('html').find("script,input,label").remove();
    }

    initUI();

    //设置颜色值
    $("#colorButton").click(function () {
        var setColor = $('.colorInput').val();
        setBg(setColor);
    });

    //设置banner图片函数
    function setImg (imgSrc, targetHref) {
        $('#ba').attr("src",imgSrc);
        $('#ba').parent().attr("href", targetHref);
    }

    //调用设置banner函数
    $("#bannerButton").click(function () {
        var imgSrc = $('.banner').val();
        var targetHref = $('#bannerHref').val();
        setImg(imgSrc, targetHref);
    });

    //调用removeTag
    $("#saveButton").click(function() {
        removeTag();
    });

    //编辑状态
    $('.editable').hover(function() {
        $(this).css({'border':'1px dashed #46BCD2','cursor':'pointer','position':'relative'});
        $(this).append($(editableButton));
        $('#editableButton').css({'position':'absolute', 'line-height':'14px','font-size':'12px','padding':'3px','margin':'0px','bottom':'0px','right':'0px','text-indent':'0em'});
        $('#editableButton').attr('contenteditable','false');
        $('#editableButton').hover(function() {
            $(this).css('cursor','pointer');
        });      
        $(this).click(function() {
            $(this).css('cursor','text');
            $('#editableButton').remove();
        });
    },function() {
        $(this).css({'border':'none','cursor':'auto'});
        $('#editableButton').remove();
    }
)

})