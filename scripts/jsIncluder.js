if (document.documentElement.clientWidth >= 640) {
    $.getScript("scripts/jquery.cycle2.js");
    $.getScript("scripts/vcard.js");
} else {
    $("#wrapper").animate({opacity: 1}, 1000);
}