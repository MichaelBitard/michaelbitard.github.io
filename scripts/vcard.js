var scrollerComplete;
var activeMenu;
var iexplorer;

$(document).ready(function () {
    if ($(this).width() > 800) {
        // call supersize method
        $('#vcard').fadeIn(200);
        setupStage();
        setupAnchor();
        setupScroller();
        setupMenu();
        setupNetworks();
        $(window).resize(function () {
            setupStage()
        })
    }
});

function setupStage() {
    var $vcard = $('#vcard');
    var marginTop = ($(window).height() - $vcard.height()) / 2;
    $vcard.css('marginTop', marginTop)
}

function setupAnchor() {
    $(window).bind('hashchange', function () {
        var page = '#' + window.location.hash.slice(1);
        if (page != '#') {
            scrollTo(page)
        }
    })
}

function setupScroller() {
    scrollerComplete = 1;
    var $contentitem = $(".contentitem");
    var contentItems = $contentitem.size();
    var contentItem_width = $contentitem.width();
    var scroller_width = contentItem_width * contentItems;
    $("#scroller").width(scroller_width + (contentItems * 30));
    var myFile = document.location.toString();
    var myAnchor;
    if (myFile.match('#')) {
        myAnchor = "#" + myFile.split('#')[1];
        $("#menu").children().removeClass('active');
        $("a[href=" + myAnchor + "]").parent().addClass('active');
        scrollTo(myAnchor, 1)
    } else {
        activeMenu = $('#menu').children('li:first').children().attr("href");
        scrollTo(activeMenu, 1)
    }
    $contentitem.fadeIn(700)
}

function setupMenu() {
    $("#menu").children().click(function () {
        scrollTo($(this).children().attr('href'))
    })
}

function setupNetworks() {
    var networks = $(".networks");
    networks.children('li').children('a').children(".content").animate({
        marginLeft: 1
    }, 1);
    networks.children('li').hover(function () {
        $(this).children('a').children(".background").fadeIn(150);
        $(this).children('a').children(".content").animate({
            marginLeft: 5
        }, 150)
    }, function () {
        $(this).children('a').children(".background").fadeOut(150);
        $(this).children('a').children(".content").animate({
            marginLeft: 0
        }, 150)
    })
}

function scrollTo(href, direct) {
    var menuId;
    var menuIndex;
    var contentItem_width;
    var scrollToPos;
    if (href != activeMenu) {
        if (scrollerComplete) {
            activeMenu = href;
            $("#menu").children().removeClass('active');
            $("a[href=" + href + "]").parent().addClass('active');
            menuId = href.split('#');
            var contentItem = $(".contentitem[id='menu_" + menuId[1] + "']");
            menuIndex = contentItem.index();
            contentItem_width = $(".contentitem").width();
            scrollToPos = -((menuIndex * contentItem_width) + (menuIndex * 30));
            document.title = contentItem.children('.pagetitle').text();
            if (scrollToPos <= 0) {
                scrollerComplete = 0;
                if (direct) {
                    $("#scroller").css('marginLeft', scrollToPos);
                    scrollerComplete = 1
                } else {
                    if (!iexplorer) {
                        $("#scroller").animate({
                            opacity: 0.4
                        }, 200, function () {
                            $("#scroller").animate({
                                marginLeft: scrollToPos
                            }, 500, function () {
                                $("#scroller").animate({
                                    opacity: 1
                                }, 200, function () {
                                    scrollerComplete = 1
                                })
                            })
                        })
                    } else {
                        $("#scroller").animate({
                            marginLeft: scrollToPos
                        }, 500, function () {
                            scrollerComplete = 1
                        })
                    }
                }
            }
        }
    }
}