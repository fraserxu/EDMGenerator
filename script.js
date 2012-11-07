$(function () {
	var editableButton = '<span style="background:#ccc;" id="editableButton">编辑</span>',
        editableTitle = '<span style="background:#ccc" id="editableTitle">编辑</span>',
	//Logo
        logo = '<a style="display:block; background:url(logo.png); width:300px; height:64px;">&nbsp;</a>',
    //期刊链接
        inputMonthly = '<label for="monthlyInput" style="padding-left:30px; font-family: Microsoft Yahei; font-size:12px;">期 刊 链 接 ：<input style="padding:0; margin: 12px 4px;" type="text" class="monthlyInput" placeholder="请输入期刊链接"></label><br />',
    //获取期刊号
        inputSsn = '<label for="ssnInput" style="padding-left:30px; font-family: Microsoft Yahei; font-size:12px;">期  &nbsp;刊&nbsp;  号&nbsp;&nbsp;&nbsp;：<input style="padding:0; margin: 12px 4px;" type="text" class="ssnInput" placeholder="请输入期刊号"></label><br />',
    //获取发布日期
        inputDate = '<label for="dateInput" style="padding-left:30px; font-family: Microsoft Yahei; font-size:12px;">发 送 日 期&nbsp;：<input style="padding:0; margin: 12px 4px;" type="date" class="dateInput" placeholder="发送日期"></label><br />',
		removeButton = '<span style="background:#ccc;" id="removeButton">移除</span>',
		$inputSrc = $('<div contenteditable="false"><label for="inputSrc" style="font-family: Microsoft Yahei; font-size:12px;">标 题 链 接 ：<input style="padding:0; margin:4px;" type="text" class="inputSrc"></label><input type="button" id="srcButton" value="保存"></div>'),
	//图片地址及链接
        $banner = $('<div><label for="bannerHref" style="font-family: Microsoft Yahei; font-size:12px;">图 片 地 址 ：<input type="text" style="padding:0; margin: 4px;" class="bannerHref" placeholder="输入图片地址" ></label><label for="bannerTarget" style="font-family: Microsoft Yahei; font-size:12px;">图 片 链 接 ：<input type="text" style="padding:0; margin: 4px;" class="bannerTarget" placeholder="输入链接地址" ></label><input type="button" id="saveBanner" value="保存"></div>'),
    //标题地址及链接
        $title = $('<div><label for="titleHref" style="font-family: Microsoft Yahei; font-size:12px;">标 题 地 址 ：<input type="text" style="padding:0; margin: 4px;" class="titleHref" placeholder="输入标题地址" ></label><input type="button" id="saveTitle" value="保存"></div>'),
    //操作说明
        $instruction = $('<ul style="font-family: Microsoft Yahei; font-size:12px;list-style-type:decimal;"><h4 style="font-size: 14px;">生成器操作步骤</h4><li>输入期刊号；</li><li>设置文章发送日期；（系统默认会根据输入期刊号和日期改变相应链接）</li><li>设置标题：直接点击标题进入编辑模式，点击右侧“编辑”按钮可设置标题链接，点击保存退出；</li><li>编辑正文部分：点击文章进入编辑模式，支持文本直接复制（注：粘贴时请使用"Ctrl" + "Shift" + "V"清除粘贴文本样式）；</li><li>设置列表：点击左侧删除按钮可删除记录，编辑进入列表链接设置，保存并退出；</li><li>Banner部分操作同列表部分；</li><li>点击生成页面按钮预览结果；</li><li>"Cltr"+"S"生成最终页面！</li><h4>BETA Version</h4><h4>Feel Free To Report Your Bug <a href="http://www.geekpark.net/rhea">Here</a>！</h4></ul>'),  
    //保存按钮
        saveButton = '<label for="saveButton" style="color:red; font-family: Microsoft Yahei; font-size:12px; margin-left:90px;">"Ctrl"+"S"另存页面<input type="button" id="saveButton" value="生成页面"></label><br />',

    //初始化UI部分    
	    initUI = function () {
      $('#toolbar').append($(logo));
      //$('#toolbar').append($(inputMonthly));
      $('#toolbar').append($(inputSsn));
      $('#toolbar').append($(inputDate));
      $('#toolbar').append($(saveButton));
      $('#toolbar').append($instruction);
    };

    initUI();	
	
    //禁止默认行为
	function banDefault (ele) {
		ele.live('click', function(event) {
			event.preventDefault();
		});
	}

    //初始化本地存储
    function initLocalStorage (ele, contentId) {
        ele.blur(function() {
            localStorage.setItem(contentId, ele.html());
            document.designMode = "off";
        });
        ele.focus(function() {
            //document.designMode = "on";
        })

        if(localStorage.getItem(contentId)) {
            ele.html(localStorage.getItem(contentId));
        }
    }
    initLocalStorage($('#title'), "titleValue");
    initLocalStorage($('#mainContent'),"mainContent");
    //window.localStorage.clear();

    //编辑内容
	function editContent (ele) {

		ele.hover(function () {
            ele.attr('contenteditable','true'); 
			$(this).css({'cursor':'pointer','outline':'1px dashed #46BCD2','position':'relative'});
			$(this).append($(removeButton));
	        $('#removeButton').css({'position':'absolute', '-webkit-border-radius': '8px 0px 0px 8px','line-height':'10px','font-size':'10px','padding':'4px','margin':'-1px 3px 0px 3px','top':'0px','left':'-31px','text-indent':'0em'});
	        $('#removeButton').attr('contenteditable','false');
	        $('#removeButton').hover(function () {
            	$(this).css('cursor','pointer');
	        });
	        $('#removeButton').click(function () {
	            event.preventDefault();
                ele.attr('contenteditable','false');
	            $(this).closest('tr').remove();
	        });
	        $(this).click(function () {
	            $(this).css({'cursor':'text','outline':'1px dashed orange'});
	            $('#editableButton').remove();
	            $('#removeButton').remove();
	        }); 
		}, function () {
			$(this).css({'cursor':'auto','outline':'none'});
            ele.attr('contenteditable','false');
            $('#removeButton').remove();
		});
	};

    //设置链接
	function setAnch (ele, src) {
		ele.parent().attr('href',src);
	};

	//设置期刊号
    function setSsn (ssn) {
        $('.ssn').text(ssn);
    };

    function setDate (date) {
        $('.publishDate').text(date);
    };

    function setMonthly (ssnValue) {
    	var targetValue = $('#monthly').attr('href').replace("{%monthly%}", ssnValue);
    	$('#monthly').attr('href', targetValue);
    };

    //编辑标题
    /*function editTitle(ele) {
        ele.attr('contenteditable','true');
        ele.bind('mouseenter',function() {
            var that = $(this); 
            $(this).css({'outline':'1px dashed #46BCD2','cursor':'text'});
            $(this).parent().css('position','relative');
            $(this).after($(editableTitle));
            $('#editableTitle').css({'position':'absolute','-webkit-border-radius': '0px 8px 8px 0px','line-height':'14px','font-size':'10px','padding':'4px','margin':'-1px 3px 0px 3px','top':'0px','right':'-30px','text-indent':'0em'});
            $('#editableTitle').attr('contenteditable','false');
            $('#editableTitle').live('click',function() {
                event.preventDefault();
                that.css('cursor','auto');
                if($('#saveTitle').length) {                   
                    return false;
                } else {
                    that.after($title);                    
                }; 
            });
        });
        $('#saveTitle').live('click',function() {
            var hrefValue = $('.titleHref').val();
            $('#title').attr('href', hrefValue);
            var url = $('.social').attr('href').replace('{%url%}', hrefValue);
            $('.social').attr('href', url);
            $(this).closest('div').remove();
            $('#editableTitle').remove();
            ele.css({'outline':'none','cursor':'auto'});
        });

        ele.parent().bind('mouseleave',function(){
            $('#editableTitle').remove();
            ele.css({'outline':'none','cursor':'pointer'});
        })
    };
    */

    function editTitle (ele) {
        ele.attr('contenteditable','true');
        ele.parent().hover(function () {
            var that = $(this); 
            ele.css({'outline':'1px dashed #46BCD2','cursor':'text'});
            ele.parent().css('position','relative');
            ele.after($(editableTitle));
            $('#editableTitle').css({'position':'absolute','-webkit-border-radius': '0px 8px 8px 0px','line-height':'14px','font-size':'10px','padding':'4px','margin':'-1px 3px 0px 3px','top':'0px','right':'-30px','text-indent':'0em'});
            $('#editableTitle').attr('contenteditable','false');           
        },function () {
            ele.css({'outline':'none','cursor':'pointer'});
            $('#editableTitle').remove();
        });
        $('#editableTitle').live('click',function() {
            event.preventDefault();
            ele.css('cursor','auto');
            if($('#saveTitle').length) {                   
                return false;
            } else {
                $(this).after($title);                    
            }; 
        });
        $('#saveTitle').live('click',function () {
            var hrefValue = $('.titleHref').val();
            $('#title').attr('href', hrefValue);
            $.each($('.social'),function(index) {
                var url = $($('.social')[index]).attr('href').replace('{%url%}', hrefValue);
                console.log($('.social'));
                $($('.social')[index]).attr('href', url);
            });
            $(this).closest('div').remove();
            ele.attr('contenteditable','false');
            $('#editableTitle').remove();
            ele.css({'outline':'none','cursor':'auto'});
        });
    }

    //编辑链接
	function editAnch (ele) {
		ele.hover(function() {
			var that = $(this);
			$(this).append($(editableButton));
            $('#editableButton').css({'position':'absolute','-webkit-border-radius': '0px 8px 8px 0px', 'line-height':'10px','font-size':'10px','padding':'4px','margin':'-1px 3px 0px 0px','top':'0px','right':'-31px','text-indent':'0em'});
            $('#editableButton').attr('contenteditable','false');
            $('#editableButton').hover(function () {
                $(this).css({'cursor':'pointer','text-decoration':'underline','color':'#477B96'});
            },function () {
                $(this).css({'cursor':'auto','text-decoration':'none','color':''});
            });
            $('#editableButton').click(function(event) {
                    event.preventDefault();
                    that.after($inputSrc);

                    $('#srcButton').click(function(event) {
                        event.preventDefault();
                        var src = $('.inputSrc').val();
                        setAnch(that,src);
                        $('.inputSrc').val('');
                        //that.css({'outline':'none'});
                        that.removeAttr('contenteditable');
                        $(this).parent().remove();
                    })
            });
		}, function () {             
			$('#editableButton').remove();
		});
	};

    //编辑图片
    function editBanner (ele) {
        ele.click(function() {
            var that = $(this);
            $(this).after($banner);

            $('#saveBanner').click(function() {
                var hrefValue = $('.bannerHref').val(),
                targetValue = $('.bannerTarget').val()

                that.attr('href', targetValue);
                that.find('img').attr('src', hrefValue);
                $('.bannerTarget').val('');
                $('.bannerHref').val('');
                $(this).parent().remove();
            });
        });
    }

    //获取摘要
    function getSummary () {
        var summary = $('#summary').text();
        var summary_value = summary.substr(1,50);
        var _value = $('.social').attr('href').replace('{%summary%}', summary_value);
        $('.social').attr('href', _value);
    }



	//移除页面动态标签
    function removeTag () {
        $('#editableButton').remove();
        $('#removeButton').remove();
        $('#editableTitle').remove();
        $('#title').parent().unbind('hover');
        $('.withImg').unbind('click');
        $('#title').removeAttr("contenteditable");
        $('#mainContent').unbind('hover');
        $('.withImg').unbind('hover');
        $('.editable').removeAttr("class");
        $('body').removeAttr('contenteditable');
        $('#toolbar').remove();
        $('html').find("input,label,script").remove();
    }

    //绑定事件
	banDefault($('a'));
	editContent($('#mainContent'));
    editContent($('.withAnch'));
    editContent($('.withImg'));
	editAnch($('.withAnch'));
    editBanner($('.withImg'));
    editTitle($('#title'));

    //转存
	$("#saveButton").live('click',function() {
        var ssnValue = $('.ssnInput').val(),
            dateValue = $('.dateInput').val(),
            mainTitle = $('#title').text();
            pageTitle = "ITValue周刊第" + ssnValue + "期: " + mainTitle;

        setSsn(ssnValue);
        setDate(dateValue);
        setMonthly(ssnValue);
        
        $('title').text(pageTitle);
        getSummary();
        $('.editable, .editContent, .withAnch, #title').off("hover");
        removeTag();
    });
})