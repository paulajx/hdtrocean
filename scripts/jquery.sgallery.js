/*
 *	sGallery 1.0 - simple gallery with jQuery
 *	made by bujichong 2009-11-25
 *	作者：不羁虫  2009-11-25
 * http://hi.baidu.com/bujichong/
 *	欢迎交流转载，但请尊重作者劳动成果，标明插件来源及作者
 */

(function ($) {
    $.fn.sGallery = function (o) {
        return new $sG(this, o);
    };

    var settings = {
        slideTime: 500,//平滑过渡时间
        changeTime: 3000,//自动切换时间
    };

    $.sGalleryLong = function (e, o) {
        this.options = $.extend({}, settings, o || {});
        var _self = $(e);
        var set = this.options;
        var size = _self.size();
        var nowIndex = 0; //定义全局指针
        var index;//定义全局指针
        var startRun;//预定义自动运行参数

        //初始化
        _self.eq(0).show();

        //主切换函数
        function fadeAB() {
            if (nowIndex != index) {
                _self.eq(nowIndex).stop(false, true).fadeOut(set.slideTime);
                _self.eq(index).stop(true, true).fadeIn(set.slideTime);
                nowIndex = index;
                clearInterval(startRun);//重置自动切换函数
                startRun = setInterval(runNext, set.changeTime);
            }
        }

        //切换到下一个
        function runNext() {
            index = (nowIndex + 1) % size;
            fadeAB();
        }

        startRun = setInterval(runNext, set.changeTime);
    }

    var $sG = $.sGalleryLong;
})(jQuery);

function slide(Name, Width, Height) {
    $(Name).width(Width);
    $(Name).height(Height);
    $(Name + ' div.changeDiv img').width(Width);
    $(Name + ' div.changeDiv img').height(Height);
    $(Name + ' div.changeDiv img').sGallery();
}

//缩略图
jQuery.fn.LoadImage = function (scaling, width, height, loadpic) {
    if (loadpic == null) loadpic = "/images/loading.gif";
    return this.each(function () {
        var t = $(this);
        var src = $(this).attr("src")
        var img = new Image();
        img.src = src;
        //自动缩放图片
        var autoScaling = function () {
            if (scaling) {
                if (img.width > 0 && img.height > 0) {
                    if (img.width / img.height >= width / height) {
                        if (img.width > width) {
                            t.width(width);
                            t.height((img.height * width) / img.width);
                        } else {
                            t.width(img.width);
                            t.height(img.height);
                        }
                    }
                    else {
                        if (img.height > height) {
                            t.height(height);
                            t.width((img.width * height) / img.height);
                        } else {
                            t.width(img.width);
                            t.height(img.height);
                        }
                    }
                }
            }
        }
        //处理ff下会自动读取缓存图片
        if (img.complete) {
            autoScaling();
            return;
        }
        $(this).attr("src", "");
        var loading = $("<img alt=\"加载中...\" title=\"图片加载中...\" src=\"" + loadpic + "\" />");

        t.hide();
        t.after(loading);
        $(img).load(function () {
            autoScaling();
            loading.remove();
            t.attr("src", this.src);
            t.show();
        });
    });
}

