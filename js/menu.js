$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});
 
$(function () {
    var menuStatus = 0;

    //in order to calculate all margins and paddings in the page
    $.fn.pixels = function(property) {
        return parseInt(this.css(property).slice(0,-2));
    };
 
    console.log("BEGINNING : "+$(".ui-page-active").pixels('marginLeft'));

    var $menu = $('#menu');

    //function to wait for the end of the animation to hide menu sidebar
    var animationFinished = function (){
      $menu.css('display', 'none');
    }

    // Show menu by clicking on the menu button
    $("a.showMenu").click(function () {
        if (menuStatus == 0) {
            $menu.css('display', 'block');
            $(".ui-page-active").animate({
                marginLeft: "165px",
            }, 300, function () {
                menuStatus = 1;
            });
            return false;
        } else {
            $(".ui-page-active").animate({
                marginLeft: "0px",
            }, 300, function () {
                menuStatus = 0;
                animationFinished();
            });
            return false;
        }
    });
 
    // Show / Hide menu by swiping the screen
    $('#menu, .pages').live("swipeleft", function () {
        if (menuStatus >= 1) {
            $(".ui-page-active").animate({
                marginLeft: "0px",
            }, 300, function () {
                menuStatus = 0;
                animationFinished();
            });
        }
    });
 
    $('.pages').live("swiperight", function () {
        if (!menuStatus) {
            $menu.css('display', 'block');
            $(".ui-page-active").animate({
                marginLeft: "165px",
            }, 300, function () {
                menuStatus = 1;
            });
        }
        if (menuStatus == 1) {
            $menu.css('display', 'block');
            $(".ui-page-active").animate({
                marginLeft: "200px",
            }, 300, function () {
                menuStatus = 2;
            });
        }
    });
 
    $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
        menuStatus = 0;
        $(".pages").css("margin-left", "0");
    });
 
    // Menu behaviour
    $("#menu li a").click(function () {
        var p = $(this).parent();
        if ($(p).hasClass('active')) {
            $("#menu li").removeClass('active');
        } else {
            $("#menu li").removeClass('active');
            $(p).addClass('active');
        }
    });
});
 
