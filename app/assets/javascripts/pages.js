$(function () {
  if ($("#countdown_dashboard").length > 0) {
    setTimeout(beginrefresh, 10000);
  }
});

function beginrefresh() {
  window.location.reload();
  setTimeout(beginrefresh, 10000);
}




$(document).ready(function(){Cufon.replace('h1, h2, h3');var $slider=$('#slider'),$demoarea=$('#demoarea'),$quotes=$('#quotes'),v=1;$(window).load(function(){$('.flexslider').flexslider({animation:"slide",slideshowSpeed:4500,animationDuration:300,mousewheel:true,keyboardNav:false,directionNav:false,controlNav:true});$slider.find('img').bind('click',function(){var $demolink=$('.demo');if($demolink.attr('href')=='#'){$('.demo').trigger('click')}else{window.location=$demolink.attr('href')}return false})});if($quotes.length){var quotes=$quotes.find('p'),timeout,current=0;count=quotes.length;quotes.css({position:'absolute',top:0}).hide();quotes.eq(current).show();setTimeout(function(){change()},5000);function change(){quotes.eq(current).fadeOut();current++;if(current>=count)current=0;var c=quotes.eq(current);c.fadeIn();timeout=setTimeout(function(){change()},Math.max(4000,parseInt(c.text().length,10)*50))}}if($demoarea.length){$demoarea.hide();$('.demo').bind('click',function(){$demoarea.slideToggle(150);return false});var $layouts=$('#layouts');if($layouts.length){var demoareawidth=960,layoutcount=$layouts.find('ul').length,offsetleft,layoutwidth=(layoutcount+1)*114;$layouts.hide();$('#versions').find('a').bind('click',function(){var _this=$(this);v=_this.find('img').attr('alt');$('#versions img').removeClass('active');_this.find('img').addClass('active');$layouts.slideDown();return false});$layouts.find('ul').bind('mouseover',function(){$(this).stop().fadeTo(50,0.99)}).bind('mouseout',function(){$(this).stop().fadeTo(400,0.7)}).bind('click',function(){location.href=v+'/'+this.id+'.html'}).css('opacity',0.7);$layouts.width(layoutwidth);if(demoareawidth<layoutwidth){$layouts.bind('mouseenter',function(event){offsetleft=$(this).offset().left}).bind('mousemove',function(event){var pos=((event.clientX-offsetleft)/demoareawidth)*(layoutwidth-demoareawidth)-(layoutcount*3);$layouts.css('left',-pos)})}}}});document.createElement('footer');document.createElement('header');document.createElement('section');
