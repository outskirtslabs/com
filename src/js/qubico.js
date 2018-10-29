$ = window.jQuery;
$(document).ready(function() {
    var closeTxt = "&#xf00d;";
    /*============================================
    Sequence Slider
    ==============================================*/
    var sequenceOptions = {
        autoPlay: true,
        autoPlayDelay: 4000,
        pauseOnHover: false,
        hidePreloaderDelay: 500,
        nextButton: true,
        prevButton: true,
        pauseButton: true,
        preloader: true,
        hidePreloaderUsingCSS: true,
        animateStartingFrameIn: true,
        navigationSkipThreshold: 2000,
        preventDelayWhenReversingAnimations: true
    };

    if($("#sequence").length){
        var sequence = $("#sequence").sequence(sequenceOptions).data("sequence");

        sequence.afterLoaded = function(){
            $('#sequence').delay(1000).animate({'opacity':1});

            setTimeout(function(){
                $("#sequence h2").fitText(0.9, { minFontSize: '24px', maxFontSize: '56px' });
                $("#sequence p").fitText(1.2, { minFontSize: '16px', maxFontSize: '28px' });
            },500);
        };
    }


    /*============================================
    ScrollTo Links
    ==============================================*/
    $('a.scrollto').click(function(e){
        $('html,body').scrollTo(this.hash, this.hash, {gap:{y:-80},animation:  {easing: 'easeInOutCubic', duration: 1600}});
        e.preventDefault();

        if ($('.navbar-collapse').hasClass('in')){
            $('.navbar-collapse').removeClass('in').addClass('collapse');
        }
    });

    /*============================================
    Contact Form
    ==============================================*/

    $('#contact-form .form-control').focus(function(){
        $(this).parents('.form-group').find('.fa').addClass('active');
    });
    $('#contact-form .form-control').blur(function(){
        $(this).parents('.form-group').find('.fa').removeClass('active');
    });

    /*============================================
    Responsive Videos
    ==============================================*/
    //$('.container').fitVids();

    /*============================================
    iPad Slider
    ==============================================*/
  /**
    $('.ipad-slider').flexslider({
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        animation: 'slide',
        slideshowSpeed: 3000,
        useCSS: true,
        controlNav: false,
        pauseOnAction: false,
        pauseOnHover: true,
        smoothHeight: false
    });
    **/

    /*============================================
    Post Slider
    ==============================================*/
  /**
    $('.post-slider').flexslider({
        prevText: '<i class="fa fa-angle-left"></i>',
        nextText: '<i class="fa fa-angle-right"></i>',
        animation: 'slide',
        slideshowSpeed: 3000,
        useCSS: true,
        controlNav: true,
        pauseOnAction: false,
        pauseOnHover: true,
        smoothHeight: false
    });
  **/

    /*============================================
    Skills Charts
    ==============================================*/
    var firstLoad = true;
  /**
    $('.skills').waypoint(function(){
        if(firstLoad){
            $('.countTo').each(count);
            firstLoad = false;
        }
        function count(options) {
            var $this = $(this);
            options = $.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
          }

        $('.chart').each(function(){
            $(this).easyPieChart({
                    size:140,
                    animate: 2000,
                    lineCap:'round',
                    scaleColor: false,
                    barColor: '#fff',
                    trackColor: 'transparent',
                    lineWidth: 7
            });
        });

    },{offset:'80%'});
    **/

    /*============================================
    Load more Projects
    ==============================================*/

    var moreSet = 1;
    $('#ajax-load').click(function(e){
        e.preventDefault();

        $(this).html('<i class="fa fa-spinner fa-spin"></i>Loading');

        var moreLink = 'more_projects_'+moreSet+'.html';

        $.get(moreLink, function(data){

            $('#ajax-load').html('<i class="fa fa-plus-circle"></i>Load More');

            $('.projects-container .row').append(data);

            var currFilter = $('#filter-works .active a').data('filter');
            $('.projects-container .loaded-item').each(function(){
                $(this).addClass('filtered');
                if ($(this).is(currFilter)){
                    $(this).removeClass('filtered');
                }
            });

            $('.projects-container .loaded-item .enlarge').colorbox({
                maxWidth:"85%", maxHeight:"85%", close: closeTxt
            });

            var i = 1,
            delay = [];
            $('.loaded-item .project-thumb').each(function(i){
                i++;
                var elem = $(this);
                delay[i] = setTimeout(function(){
                    elem.addClass('in');
                },200*i);
            });

            $('.projects-container .loaded-item').removeClass('loaded-item');

            scrollSpyRefresh();
            waypointsRefresh();

        }) .fail(function() {
                $('#ajax-load').html('No More Projects');
            });

        moreSet=moreSet+1;

    });

    /*============================================
    Filter Projects
    ==============================================*/
    $('#filter-works a').click(function(e){
        e.preventDefault();

        $('#filter-works li').removeClass('active');
        $(this).parent('li').addClass('active');

        var category = $(this).attr('data-filter');

        $('.project-item').each(function(){
            if (category=='*') {
                $(this).removeClass('filtered').removeClass('selected');
                return;
            } else if ($(this).is(category)){
                $(this).removeClass('filtered').addClass('selected');
            }
            else{
                $(this).removeClass('selected').addClass('filtered');
            }

        });
    });

    /*============================================
    Project Preview
    ==============================================*/

    $('#project-preview .close-preview').click(function(e){
        closePreview();
        return true;
    })

    function switchPreview(elem) {
        alert('OK');
    }

    function justEnlarge(elem) {

        var image = elem.find('.enlarge').attr('href');
        var title = elem.find('.enlarge').attr('title');

        $.colorbox({href:image,title:title, maxWidth:"85%", maxHeight:"85%", close: closeTxt});
    }

    /*Colorbox*/
  /**
    $(".enlarge").colorbox({ maxWidth:"85%", maxHeight:"85%", close: closeTxt});
    $(".colorbox").colorbox({maxWidth:"85%", maxHeight:"85%", close: closeTxt});
    $(".colorbox-video").colorbox({iframe:true,  innerWidth:1200, innerHeight:675,maxWidth:"85%", maxHeight:"85%", close: closeTxt});

    $('.news-media.gallery').each(function(i){
        $(this).find(".colorbox").colorbox({rel:'group'+i,maxWidth:"85%", maxHeight:"85%", close: closeTxt});
    });
    **/

    /*============================================
    Tooltips
    ==============================================*/
    $("[data-toggle='tooltip']").tooltip({container: 'body'});

    /*============================================
    Social Share
    ==============================================*/
    if($(".social-media").length){

        var shareTitle = $(".social-media").data('title') ? $(".social-media").data('title') : $('.page-title').text();

        $('.social-media').socialLikes({
            counters: false,
            title: shareTitle
        });
    }

    /*============================================
    Placeholder Detection
    ==============================================*/
    if (!Modernizr.placeholder) {
        $('#contact-form').addClass('no-placeholder');
    }

    /*============================================
    Responsive Submenu
    ==============================================*/
    $('.submenu').children('a').click(function(e){

        var $submenu = $(this).siblings('ul');

        if($(window).width()<768){
            e.preventDefault();

            if($submenu.is('.open')){
                $submenu.removeClass('open').slideUp();
            }else{
                $submenu.addClass('open').slideDown();
            }

        }

    });

    /*============================================
    Scrolling Animations
    ==============================================*/
  /**
   console.log("OMGWTF");
    $('.scrollimation').waypoint(function(){
        $(this).addClass('in');
    },{offset:'80%'});
    */

    /*
    $('.projects-container.scrollimation').waypoint(function(){
        var i = 1,
        delay = [];
        $(this).find('.project-thumb').each(function(i){
            i++;
            var elem = $(this);
            delay[i] = setTimeout(function(){
                elem.addClass('in');
            },200*i);
        })
    },{offset:'70%'});

    $('.iphones-wrapper.scrollimation').waypoint(function(){
        $(this).find('.iphone-landscape-frame').addClass('in');
    },{offset:'60%'});
    */

    /*============================================
    Resize Functions
    ==============================================*/
    $(window).resize(function(){
        scrollSpyRefresh();
        waypointsRefresh();
    });
    /*============================================
    Refresh scrollSpy function
    ==============================================*/
    function scrollSpyRefresh(){
        setTimeout(function(){
            $('body').scrollspy('refresh');
        },1000);
    }

    /*============================================
    Refresh waypoints function
    ==============================================*/
    function waypointsRefresh(){
        setTimeout(function(){
            $.waypoints('refresh');
        },1000);
    }

    /*============================================
    Load Post
    ==============================================*/
    $('.ajax-blog .read-more').click(function(e){
        e.preventDefault();

        var $this = $(this),
            postLink = $(this).attr('href');

        if($this.is('.loading')){
            return false;
        }

        $this.animate({opacity:0},200,function(){
            $this.addClass('loading').text('Loading');
            $this.animate({opacity:1},200);
        });

        $.get(postLink, function(data){

            var postContent = $(data).find('.post-content, .post-footer'),
                $thePost =  $this.parents('.col-sm-10');

            $thePost.append('<div class="ajax-content" style="display:none;"></div>');
            $thePost.find('.ajax-content').html(postContent);
            $thePost.find('.ajax-content .post-excerpt, .ajax-content .posts-nav').remove();

            var shareTitle = $thePost.find(".social-media").data('title') ? $thePost.find(".social-media").data('title') : $thePost.find('.post-title').text();

            $thePost.find('.social-media').socialLikes({
                counters: false,
                title: shareTitle,
                url: postLink
            });

            setTimeout(function(){
                $thePost.find('.ajax-content').slideDown(500);

                $thePost.parents('.post').addClass('loaded');
                $this.parents('footer').animate({'height':0,'opacity':0},500,function(){$(this).remove()});
            },500);

        });

    });

});
