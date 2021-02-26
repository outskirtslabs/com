import $ from 'jquery';
import Mustache from 'mustache';

const jQuery  = $;
const Impress = require('./impress');
require('./SVGinject.js');

function letter_open() {
  $(document.body).attr('data-overlay-id', '#letter-overlay');
  $(document.body).attr('data-overlay-open', 'true');
}

function letter_close() {
  $(document.body).attr('data-overlay-open', 'false');
}

function scrollSpyRefresh() {
  setTimeout(function() {
    $('body').scrollspy('refresh');
  }, 1000);
}

function waypointsRefresh() {
  setTimeout(function() {
    $.waypoints('refresh');
  }, 1000);
}

function buildPreview(elem) {

  var content = elem.find('.preview-content').html();

  $('#preview-content').html(content).find('.project-title').remove();
  $('#preview-content').find('.project-subtitle').remove();
  $('#preview-content').find('.project-tags').remove();

  $('#project-preview .preview-title').html(elem.find('.project-title').html());
  $('#project-preview .preview-subtitle').text(elem.find('.project-subtitle').text());
  $('#project-preview .preview-tags').html(elem.find('.project-tags').html());

  if (elem.find('.preview-content').data('images')) {
    var slider_elem = '';
    if (elem.find('.preview-content').hasClass('with-imac-frame')) {

      $('#project-preview .no-frame').addClass('hidden').hide();
      $('#project-preview .imac-frame').removeClass('hidden').show();

      slider_elem = '.imac-frame .imac-slider';
    } else {
      // no frame

      $('#project-preview .imac-frame').addClass('hidden').hide();
      $('#project-preview .no-frame').removeClass('hidden').show();

      slider_elem = '.no-frame .imac-slider';
    }

    var slidesHtml = '<ul class="slides">',
        slides     = elem.find('.preview-content').data('images').split(',');
    for (var i = 0; i < slides.length; ++i) {
      slidesHtml = slidesHtml + '<li><img src=' + slides[i] + ' alt=""></li>';
    }

    slidesHtml = slidesHtml + '</ul>';
    $('#project-preview').find(slider_elem).html(slidesHtml);
  } else {
    $('#project-preview .imac-frame').addClass('hidden').hide();
    $('#project-preview .no-frame').addClass('hidden').hide();
  }
}

function openPreview() {
  var slider = $('#project-preview .imac-frame')
    .hasClass('hidden') ? '.no-frame .imac-slider' : '.imac-frame .imac-slider';

  $('#project-preview').slideDown(400);
  $('#project-preview').addClass('open');

  $(slider).flexslider({
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

  $('#project-preview .slides img').load(function() {
    $(slider).addClass('loaded');
    $('#project-preview .loader').fadeOut('fast');
  });

  scrollSpyRefresh();
  waypointsRefresh();
}

function closePreview() {

  $('#project-preview').removeClass('open').slideUp(400, function() {
    if (!$('#project-preview .imac-frame')
      .is('.hidden') && !($('#project-preview .imac-frame .imac-slider')
      .data('flexslider') === undefined)) {
      $('#project-preview .imac-frame .imac-slider').flexslider('destroy');
    }
    if (!$('#project-preview .no-frame')
      .is('.hidden') && !($('#project-preview .no-frame .imac-slider')
      .data('flexslider') === undefined)) {
      $('#project-preview .no-frame .imac-slider').flexslider('destroy');
    }

    $('#project-preview .no-frame .imac-slider').removeClass('loaded').html('');
    $('#project-preview .imac-frame .imac-slider').removeClass('loaded').html('');
    $('#project-preview .loader').show();
  });

  $('.projects-container .project-item').removeClass('active');

  scrollSpyRefresh();
  waypointsRefresh();
}

function project_show(project) {
  var elem = $('.project-item[data-project="' + project + '"]');

  if (elem.find('.link').length < 1) {
    justEnlarge(elem);
    return false;
  }

  if (elem.is('.filtered')) {
    return false;
  }

  $('html,body').scrollTo(0, '#preview-scroll', {
    gap: { y: -120 },
    animation: {
      duration: 500
    }
  });

  if (elem.is('.active')) {
    return false;
  } else if ($('#project-preview').is('.open')) {
    closePreview();
    elem.addClass('active');
    setTimeout(function() {
      buildPreview(elem);
      openPreview();
    }, 500);
  } else {
    elem.addClass('active');
    buildPreview(elem);
    openPreview();
  }
}

function animate_blueprint() {
  $('.design-node')
    .velocity({ opacity: 0, 'stroke': '#e76227' }, { duration: 0 });
  $('.design-node1')
    .velocity('transition.whirlIn', { duration: 500, delay: 0 });
  $('.design-node2')
    .velocity('transition.whirlIn', { duration: 500, delay: 700 });
  $('.design-node3')
    .velocity('transition.whirlIn', { duration: 500, delay: 1400 });
  $('.design-line')
    .velocity({ 'stroke-dashoffset': 100, 'stroke': '#e76227' }, { duration: 0 })
    .velocity({ 'stroke-dashoffset': 70 }, { duration: 1000 })
    .velocity({ 'stroke-dashoffset': 48 }, { duration: 600 })
    .velocity({ 'stroke-dashoffset': 0 }, {
      duration: 200, complete: function(e) {
        $('.design-node,.design-line').css('stroke', '#21b899');
      }
    });
}

function animate_blueprint_stop() {
  $('.design-node1').velocity('finish');
  $('.design-node2').velocity('finish');
  $('.design-node3').velocity('finish');
  $('.design-line').velocity('stop', true).css('stroke-dashoffset', 0);
  $('.design-node,.design-line').css('stroke', '#21b899');
}

function animate_on_screen(element, callback) {
  container = element.closest('.item');
  callback(container, container.isOnScreen());
}

function mobile_blueprint(not_used, onscreen) {
  var going = $('.design-line').attr('class').match(/.*velocity-animating.*/) != null;
  if (onscreen) {
    if (!going) {
      animate_blueprint();
    }
  } else {
    animate_blueprint_stop();
  }
}

function mobile_animations() {
  animate_on_screen($('.svg-blueprint4'), mobile_blueprint);
  animate_on_screen($('.svg-mobile2'), function(e, onscreen) {
    e.toggleClass('mobileAnimation', onscreen);
  });
  animate_on_screen($('.svg-bugs'), function(e, onscreen) {
    e.toggleClass('bugsAnimation', onscreen);
  });
  animate_on_screen($('.svg-flask2'), function(e, onscreen) {
    e.toggleClass('flaskAnimation', onscreen);
  });
}

$(document).ready(function() {
  if ($(window).scrollTop() === 0) {
    $('#main-nav').removeClass('scrolled');
  }
  else {
    $('#main-nav').addClass('scrolled');
  }
  $(window).scroll(function() {
    if ($(window).scrollTop() === 0) {
      $('#main-nav').removeClass('scrolled');
    }
    else {
      $('#main-nav').addClass('scrolled');
    }
  });

  var credits    = {
    credits: [
      {
        'title': 'Blueprint',
        'author': 'Dimitry Sunseifer',
        'link': 'http://www.thenounproject.com/sokolovds'
      },
      {
        'title': 'Bug Report',
        'author': 'Lemon Liu',
        'link': 'http://thenounproject.com/lemonliu'
      },
      {
        'title': 'Privacy',
        'author': 'Yair Cohen',
        'link': 'https://thenounproject.com/yair.vareniki.cohen/'
      },
      {
        'title': 'Citizen Empowerment over Open Data',
        'author': 'Martín Álvarez Espinar',
        'link': 'https://thenounproject.com/espinr/'
      },
      { 'title': 'Global', 'author': 'Martin Vanco', 'link': 'https://thenounproject.com/vancom' }
      //{ 'title': '', 'author': '', 'link': '' },
    ]
  };
  const template = `<p>Thanks to these awesome artists!</p><ul>{{#credits}}<li>{{title}} by <a href="{{link}}">{{author}}</a></li>{{/credits}}</ul>`;
  const content  = Mustache.render(template, credits);
  $('#copyright').popover({
    content,
    html: true
  });
  // Scroll fix for nav
  const headerHeight    = $('#above_nav').height();
  const scrollThreshold = headerHeight - 90 / 2;
  $(window).bind('scroll', () => {
    if ($(window).scrollTop() > scrollThreshold) {
      $('#navbar').addClass('fixed-top');
    } else {
      $('#navbar').removeClass('fixed-top');
    }
  });

  $('.letter-opener').hover(function(event) {
    $(this).css('cursor', 'pointer');
  }, function(event) {
    $(this).css('cursor', 'auto');
  });

  /*$('#letter-opener,.letter-opener').click(function(event){
      event.preventDefault();
      letter_open();
      return false;
  });
  */
  $('.close-overlay').click(function(event) {
    letter_close();
    return true;
  });

  $(document).keydown(function(e) {
    if (27 === e.keyCode && $(document.body).attr('data-overlay-open') == 'true') {
      $(document.body).attr('data-overlay-open', 'false');
      e.preventDefault();
    }
  });

  if (Modernizr.touch) {
    $(window).scroll(mobile_animations);
  } else {
    $('.svg-blueprint4').closest('.item').hover(animate_blueprint, animate_blueprint_stop);
  }

  $('.iframe-overlay a').click(function(event) {
    var frame = '<iframe src="http://listen.passionradio.org/streams" width="400px" height="600px"></iframe>';
    $('.iframe-overlay').hide();
    $('.iframe').html(frame);
  });
});

!function(i, t, s, e) {
  var n = {
    dimensions: {},
    elements: {},
    headerOff: 86,
    selectors: {
      body: 'body',
      letterLink: '#letter-opener',
      dtDiffWrap: '#ethics',
      dtDiffOne: '#ethics [data-section="1"]',
      dtDiffTwo: '#ethics [data-section="2"]',
      dtDiffThree: '#ethics [data-section="3"]'
    },
    _bindVendors: function() {
    },
    _bindEvents: function() {
      var t = this;
      this.elements.window.on('resize', i.throttle(50, function() {
        t._getDimensions(), t.positionFullStoryLink();
      })), this.elements.window.on('scroll', function() {
        t.dimensions.scrollPosition = t.elements.window
                                       .scrollTop(), t.updateDTDiff(t.dimensions.scrollPosition);
      });
    },
    _getDimensions: function() {
      this.dimensions.windowHeight = this.elements.window[0].innerHeight - this.headerOff,
        this.dimensions.dtDiffHeight = this.elements.dtDiffWrap[0].scrollHeight - this.headerOff / 2, this.dimensions.dtDiffTop = this.elements
                                                                                                                                      .dtDiffWrap.offset().top, this.dimensions.dtDiffBottom =
        this.dimensions.dtDiffTop + this.dimensions.dtDiffHeight -
        this.dimensions.windowHeight, this.dimensions.dtDiffOneHeight =
        this.elements.dtDiffOne[0].scrollHeight, this.dimensions
        .dtDiffTwoHeight = this.elements.dtDiffTwo[0].scrollHeight,
        this.dimensions.dtDiffThreeHeight = this.elements.dtDiffThree[
          0].scrollHeight, this.dimensions.dtDiffTwoTop =
        this.elements.dtDiffTwo.offset().top, this.dimensions.dtDiffThreeTop =
        this.elements.dtDiffThree.offset().top;
    },
    _getElements: function() {
      this.elements = e.getElements(this.selectors), this.elements
        .window = i(t);
    },
    positionFullStoryLink: function(remove) {
      remove = (typeof remove === 'undefined') ? false : remove;
      var i  = (this.dimensions.windowHeight) / 2;

      if (remove) {
        $(this.elements.letterLink).velocity('callout.pulse');
        $('.small-open-letter').velocity('callout.pulse');
      }

      if (this.dimensions.scrollPosition >= this.dimensions.dtDiffBottom) {
        i = this.dimensions.dtDiffHeight - 28 - this.dimensions.dtDiffThreeHeight / 2;
      }

      if (this.elements.letterLink) {
        this.elements.letterLink.css({
          top: i
        });
      } else {
        console.warn('no letterlink');
      }
    },
    returnHeightTallestDtDiffSection: function() {
      var i = 0;
      return i = Math.max(this.dimensions.windowHeight, this.dimensions
          .dtDiffOneHeight, this.dimensions.dtDiffTwoHeight,
        this.dimensions.dtDiffThreeHeight);
    },
    updateDTDiff: function(i) {
      var t     = this,
          s     = this.dimensions.dtDiffTwoTop - .4 * this.dimensions
            .windowHeight,
          e     = this.dimensions.dtDiffThreeTop - .4 * this.dimensions
            .windowHeight,
          fixed = t.elements.dtDiffWrap.hasClass('fixie');
      i >= this.dimensions.dtDiffTop && i <= this.dimensions.dtDiffBottom ?
        t.elements.dtDiffWrap.addClass('fixie') : (t.elements.dtDiffWrap
                                                    .hasClass('fixie') && t.elements.dtDiffWrap.removeClass(
          'fixie'), t.positionFullStoryLink(fixed)
        ), s > i ? t.elements.dtDiffWrap.attr('data-active',
        'one') : i >= s && e >= i ? t.elements.dtDiffWrap.attr(
        'data-active', 'two') : t.elements.dtDiffWrap.attr(
        'data-active', 'three');
    },
    initialize: function() {
      this._getElements(), this._getDimensions(), this._bindVendors(),
        this._bindEvents(), this.positionFullStoryLink();
    }
  };
  //TODO
  i(function() {
    n.initialize();
  });
  //t.Ethics = //i(t).load(//function() {
  //   n.positionFullStoryLink()
  // }
  //)
}(jQuery, window, null, Impress);

/* Page router */
//
// function scroll_to(elem) {
//
//     // $('html,body').scrollTo(elem, elem, {gap:{y:-80},animation:  {easing: 'easeInOutCubic',
// duration: 1600}}); // // if ($('.navbar-collapse').hasClass('in')){ //
// $('.navbar-collapse').removeClass('in').addClass('collapse'); // } }

export { letter_close, letter_open };
