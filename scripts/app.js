$(function () {
    generateHeaderAndFooter();
    generateNavTopFromXml('top');
    
    if (document.head.id != 'index') {
        generateNavLeftFromXml('left', document.head.id);
    }
})

function generateHeaderAndFooter() {
    var topnav = '<div id="topmain">'
            + '<div id="top"><div class="logo"><a href="/index.html">'
                + '<img src="/images/logo.png" alt="海德天润" class="logo" title="海德天润" /></a></div>'
            + '</div>'
        + '</div>';
    var footer = '<div id="footerMain"><div id="footer">版权所有：天津海德天润海上工程技术有限公司</div>';
    $('div#bodyMain').before(topnav);
    $('div#bodyMain').after(footer);

    if (document.head.id == 'index') {
        //var slidePic = '<div class="FocusPic"><div class="content" id="main-slide"><div class="changeDiv">'
        //                    + '<img src="/images/index/1.jpg" />'
        //                    + '<img src="/images/index/2.jpg" />'
        //                    + '<img src="/images/index/3.jpg" />'
        //                    + '<img src="/images/index/4.jpg" />'
        //                    + '<img src="/images/index/5.jpg" />'
        //                    + '<img src="/images/index/6.jpg" />'
        //            + '</div></div></div><br class="spacer" />';
        //$('div#body').before(slidePic);
        //new slide('#main-slide', 960-4, 480-4);
    }
    else {
        var navImage = '<div class="navImage"><img src="/images/index/nav.jpg" /></div>'
        $('div#body').before(navImage);
    }

    var ads = '<div id="rightlayoutShow"></div><div style="display:none;" id="rightMessage"></div>';
    $('div#bodyMain').after(ads);
}

function generateNavTopFromXml(containerId) {
    $.get('/data/navbar.xml', function (data) {
        var html = '<div id="navbar"><ul id="topnav">';

        $(data).find('menu').each(function () {
            var m = $(this);
            var target = '';
            if (m.attr('target')) {
                target = ' target="_blank"';
            }
            html += '<li class="parentlevel"><a href="' + m.attr('href') + '" class="drop_vertical"' + target + '>' + m.attr('text') + '</a>';
            if (m.find('sub-menu').length > 0) {
                html += '<div class="dropdown_vertical"><ul>'
                m.find('sub-menu').each(function () {
                    var sm = $(this);
                    if (sm.children('[isshowontop]').length > 0) {
                        html += '<li class="childlevel"><a href="' + sm.attr('href') + '" class="drop_horizontal">' + sm.attr('text') + '</a>';
                        html += '<div class="dropdown_horizontal"><ul>';
                        sm.find('item').each(function () {
                            var i = $(this);
                            html += '<li class="childlevel"><a href="' + i.attr('href') + '">' + i.text() + '</a></li>';
                        });
                        html += '</ul></div>';
                    }
                    else {
                        html += '<li class="childlevel"><a href="' + sm.attr('href') + '">' + sm.attr('text') + '</a>';
                    }
                    html += '</li>';
                });
                html += '</ul></div>';
            }
            html += '</li>';
        });

        html += '</ul></div>';
        $('div#' + containerId).append(html);
    });
}

function generateNavLeftFromXml(containerId, groupId) {
    $.get('/data/navbar.xml', function (data) {
        var html = '';

        $(data).find('menu').each(function () {
            var m = $(this);
            if (m.attr('group') == groupId) {
                html += '<h1>' + m.attr('text') + '</h1>';
                m.find('sub-menu').each(function () {
                    var sm = $(this);
                    html += '<h2><a href="' + sm.attr('href') + '"><span>' + sm.attr('text') + '</span></a></h2>';
                    if (sm.children().length > 0) {
                        html += '<ul>';
                        sm.find('item').each(function () {
                            var i = $(this);
                            html += '<li><a href="' + i.attr('href') + '">+ ' + i.text() + '</a></li>';
                        });
                        html += '</ul>';
                    }
                });
            }
        });

        if (html != '') {
            $('div#' + containerId).html(html);
        }
    });
}







var returnHtml = '<span class="mini" style="cursor:pointer;"><img src="/images/mini.jpg"></span><span class="zoom" style="cursor:pointer;"></span>';
    returnHtml += '<div id="iframesrc" style=""></div>';
//Download by http://www.jb51.net
$(function() {
    var boxWidth = 200; //宽度，兼容IE6必写；
    var boxHeight = 100; //可制空
    $('#rightlayoutShow').css({ width: boxWidth})
    $('#rightlayoutShow').prepend(returnHtml);
    $('#iframesrc').html('<iframe src="/pages/ads.html" scrolling="no" frameborder="0" width="' + boxWidth + ' height="' + boxHeight + '"></iframe>');
    //这里可以是Iframe Image Flash Text
    
    $('#rightlayoutShow .mini').click(function() {
        $('#iframesrc').slideUp('slow', function() {
            $('#rightlayoutShow .zoom').html('<img src="/images/close.jpg">');
            $('#rightlayoutShow .mini').text('');
        });
        $('#rightlayoutShow .zoom').css({ display: 'block' });
        $('#rightlayoutShow .mini').css({ display: 'none' });
    }); 
    $('#rightlayoutShow .zoom').click(function() {
        $('#iframesrc').slideDown('slow', function() {
            $('#rightlayoutShow .mini').html('<img src="/images/mini.jpg">');
            $('#rightlayoutShow .zoom').text('');
        });
        $('#rightlayoutShow .zoom').css({ display: 'none' });
        $('#rightlayoutShow .mini').css({ display: 'block' });
    });
    $(window).scroll(function() {
        callScroll('#rightlayoutShow', 10, 10, 'auto', 'absolute');
    });
    function callScroll(Sid, Stop, Sright, Swidth, Sposition) {
        if (IEobject()) {
            var scrollTop = $(window).scrollTop();
        }else{
            var scrollTop = $('#rightlayoutShow').scrollTop();
        }
        $('#rightMessage').prepend(scrollTop);
        $(Sid).css({
            'bottom' : - (scrollTop - Stop),
            'right' : Sright,
            'width' : Swidth,
            'position' : Sposition
        });
    }
});

function IEobject() {
    if (window.XMLHttpRequest) {
        return true; //alert('Mozilla, Safari,IE7 ');
        if(!window.ActiveXObject){
            return true; //alert('Mozilla, Safari');
        } else {
            return true; //alert('IE7');
        }
    } else {
        return false; //alert('IE6');
    }
}