$(document).foundation();

var inputRange =  $('input[type="range"]');
var follower = $('.follower');
var rangeControler = $('.rangeslider__handle');
var imgs = $('[data-pic]');
var followerInput = $('[data-follower-input]');
var price = $('[data-price]');
var firstCheck = $('[data-one-check]');
var secCheck = $('[data-two-check]');
var thrdCheck = $('[data-three-check]');
var firstBreakpoint = $('.first-breakpoint');
var secondBreakpoint = $('.second-breakpoint');
var firstBreakVal = 7.67;
var secBreakVal = 18.31;
var priceStages = $('[data-price-stage]');

inputRange.rangeslider({

polyfill: false,

// Default CSS classes //
rangeClass: 'rangeslider',
disabledClass: 'rangeslider--disabled',
horizontalClass: 'rangeslider--horizontal',
verticalClass: 'rangeslider--vertical',
fillClass: 'rangeslider__fill',
handleClass: 'rangeslider__handle',

// Callback function
onInit: function() {
    priceStages.eq(0).html(firstBreakVal);
    priceStages.eq(1).html(secBreakVal);


  function countOffset(breakPrice) {
    return (breakPrice / inputRange.attr('max')) * 100;
  }

  function setOffset(el, value) {
    el.css('left', value);
  }

  setOffset(firstBreakpoint, countOffset(firstBreakVal) + '%');
  setOffset(secondBreakpoint, countOffset(secBreakVal) + '%');
  setOffset(follower, rangeControler.css('left'));

  followerInput.val(inputRange.val())
  price.html(followerInput.val());

},

// Callback function
onSlide: function(position, value) {

    follower.css('left', position);
    followerInput.val(value);
    price.html(followerInput.val());


    function countBreaks(check, passedImg, errorImg, img, value, breakpoint, actImg, inActImg) {


      function changeInfo(check, checkPath, img, imgPath) {

        function cutPath(img, path) {

          img.attr('src', img.attr('src').split("/")[0] + path);

        }

        cutPath(check, checkPath);
        cutPath(img, imgPath);

      }

      value >= breakpoint ? changeInfo(check, passedImg, img, actImg) : changeInfo(check, errorImg, img, inActImg);

    }

    countBreaks(firstCheck,'/accept.png','/error.png', imgs.eq(0), value, 0, '/active1.png', '/inactive1.png');
    countBreaks(secCheck,'/accept.png','/error.png', imgs.eq(1), value, firstBreakVal, '/active2.png', '/inactive2.png');
    countBreaks(thrdCheck,'/accept.png','/error.png', imgs.eq(2), value, secBreakVal, '/active3.png', '/inactive3.png');

}

})

price.on('keydown', function(e) {


  if((e.keyCode == 13 || e.keyCode == 32) || ($(this).html().length > 4 && e.keyCode != 8) || (e.which != 8 && e.which != 190 && (e.which < 48 || e.which > 57))){
    e.preventDefault();
  }

});

price.on('keyup', function(e) {

  if($(this).html().length === 5 ||
    $(this).html().length === 2 && $(this).html().indexOf('.') === -1 && e.keyCode != 8 ||
    $(this).html().length === 4 && $(this).html().indexOf('.') !== -1 && e.keyCode != 8) {
      followerInput.val($(this).html())
      inputRange.val(followerInput.val()).change();
      placeCaretAtEnd( document.getElementById("content"));
  }

});

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
          && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
      var textRange = document.body.createTextRange();
      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
  }
}
