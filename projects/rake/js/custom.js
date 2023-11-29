/*--------------------------------------------------
Sound Animal html/css template - custom.js

URL:gozawi.com
SUPPORT: wtxinc@gmail.com
CODE: SA001C

Custom overwiev:

1.  Background			
2.  Pretty
3.  Tweeter
4.  Flickr
5.  Vimeo
6.  Media player
7.  Menu dropdown
8.  Revolution slider
9.  Color scheme
10. Color scheme panel
11. Comments validiation					
12. Contact  validiation		
13. Sort by
14. Toggle
15. Scroll to			
	
---------------------------------------------------*/

/***************************************************
1. BACKGROUND PHOTO
***************************************************/

 //$.backstretch("images/background.jpg");

/***************************************************
2. PRETTY PHOTO
***************************************************/
						
jQuery(function($){
				$("a[rel^='prettyPhoto']").prettyPhoto();
			  });
			  
$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
});

/***************************************************
3. TWEETER
***************************************************/
						
						
jQuery(function($){
	$(".tweet").tweet({
	join_text: "auto",
	username: "GOZAWI",
	avatar_size: 48,
	count: 2,
	auto_join_text_default: "",
	auto_join_text_ed: "",
	auto_join_text_ing: "",
	auto_join_text_reply: " ",
	auto_join_text_url: "",
	loading_text: "loading tweets..."
	});
});

/***************************************************
4. FLICKR
***************************************************/

$('.flickr').jflickrfeed({
		limit: 9,
		qstrings: {
			id: '[YOUR FLICKR ID GOES HERE]'
		},
		itemTemplate: '<li><a href="{{image_b}}" data-rel="prettyPhoto" ><img src="{{image_s}}" alt="{{title}}" /></a></li>'
		
		}, function(data) {
			$('.flickr a').prettyPhoto();
});

/***************************************************
5. VIMEO
***************************************************/


jQuery(document).ready(function($){
		$(".vimeo").fitVids();
});

/***************************************************
6. MEDIA PLAYER
***************************************************/

//<![CDATA[
jQuery(document).ready(function($){

	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [
		{
			title:"1. Bronco Romp",
			mp3:"http://gozawi.com/soundanimal/music/Waylon_Thornton_-_01_-_Bronco_Romp.mp3",
			oga:"http://gozawi.com/soundanimal/music/Waylon_Thornton_01_Bronco_Romp.ogg"
		},
		{
			title:"2. Favorite Secrets",
			mp3:"http://gozawi.com/soundanimal/music/Waylon_Thornton_-_02_-_Favorite_Secrets.mp3",
			oga:"http://gozawi.com/soundanimal/music/Waylon_Thornton_02_Favorite_Secrets.ogg"
		},
		{
			title:"3. Flashlight Tag",
			mp3:"http://gozawi.com/soundanimal/music/Waylon_Thornton_-_03_-_Flashlight_Tag.mp3",
			oga:"http://gozawi.com/soundanimal/music/Waylon_Thornton_03_Flashlight_Tag.ogg"
		},
		{
			title:"4. Look For Danger",
			mp3:"http://gozawi.com/soundanimal/music/Waylon_Thornton_-_04_-_Look_For_Danger.mp3",
			oga:"http://gozawi.com/soundanimal/music/Waylon_Thornton_04_Look_For_Danger.ogg"
		},
		{
			title:"5. Piece Of Eight",
			/*free: true, use this for publih source */
			mp3:"http://gozawi.com/soundanimal/music/Waylon_Thornton_-_05_-_Piece_Of_Eight.mp3",
			oga:"http://gozawi.com/soundanimal/music/Waylon_Thornton_05_Piece_Of_Eight.ogg"
		}
	], {
		swfPath: "js",
		supplied: "oga, mp3",
		wmode: "window"
	});
});
//]]>

/***************************************************
7. MENU DROPDOWN
***************************************************/
								
jQuery('#main_menu ul > li').hover(
	function () {
		jQuery(this).find('.first_submenu').stop(true, true).delay(0).slideDown(150, "easeOutCirc");
	},	
	function () {
		jQuery(this).find('.first_submenu').stop(true, true).delay(0).slideUp(150, "easeInQuad");
	}
);

jQuery('#main_menu ul > li > ul > li').hover(
	function () {
		jQuery(this).find('ul').stop(true, true).delay(0).slideDown(150, "easeOutCirc");
	},	
	function () {
		jQuery(this).find('ul').stop(true, true).delay(0).slideUp(150, "easeInQuad");
	}
);

/***************************************************
8. REVOLUTION SLIDER
***************************************************/

var tpj=jQuery;

tpj(document).ready(function($) {

if (tpj.fn.cssOriginal!=undefined)
	tpj.fn.css = tpj.fn.cssOriginal;

	tpj('.banner').revolution(
		{
			delay:13000,
			startheight:500,
			startwidth:960,

			hideThumbs:200,

			thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
			thumbHeight:50,
			thumbAmount:5,

			navigationType:"none",					//bullet, thumb, none, both		(No Thumbs In FullWidth Version !)
			navigationArrows:"nexttobullets",		//nexttobullets, verticalcentered, none
			navigationStyle:"round",				//round,square,navbar

			touchenabled:"on",						// Enable Swipe Function : on/off
			onHoverStop:"on",						// Stop Banner Timet at Hover on Slide on/off

			navOffsetHorizontal:0,
			navOffsetVertical:20,

			stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
			stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

			shadow:0,								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows  (No Shadow in Fullwidth Version !)
			fullWidth:"off",							// Turns On or Off the Fullwidth Image Centering in FullWidth Modus
			shuffle:"off"							// Turn Shuffle Mode on and Off ! Will be randomized only once at the start.


		});

	}); 

/***************************************************
9. COLOR SCHEME
***************************************************/

 $("select#color_scheme").click(function(){
  var color = $(this).attr('value');
  if ($("#css_color_scheme").length > 0){
	  $("#css_color_scheme").remove();
  } 
  $("head").append("<link>");
  css = $("head").children(":last");
  css.attr({
    rel:  "stylesheet",
	href: "css/skin/"+ color +".css",
    type: "text/css",
    id: "css_color_scheme"
  });
 })
				
/***************************************************
10. COLOR SCHEME PANEL
***************************************************/

 $(".theme_panel a").click(function(){
	  var left = $(".theme_panel").css("margin-left");
	  if (left == "-220px"){
	  $(".theme_panel").animate({marginLeft: "0px"});
	 }
	 else{
	  $(".theme_panel").animate({marginLeft: "-220px"});
	 }
	return false;	
}); 

/***************************************************
11. COMMENTS VALIDIATION

If don't wanna check mail, 
just delete "comment_email" parts
***************************************************/

$(function() { 
$("#comment_button").click(function() { 
var comment_name = $("#comment_name").val(); 
var comment_email = $("#comment_email").val(); 
var comment_text = $("#comment_text").val(); 
var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var go = true;
var emailcheck = false;

$('.comment_name_empty').fadeOut(1000); 
$('.comment_email_empty').fadeOut(1000);
$('.comment_email_invalid').fadeOut(1000); 
$('.comment_text_empty').fadeOut(1000); 
$('.comment_success').fadeOut(1000); 

if(comment_name==''){
$('.comment_name_empty').fadeIn(1000); 
go=false;
}

if(comment_email==''){
$('.comment_email_empty').fadeIn(1000); 
go=false;
}
else{
	if(emailReg.test(comment_email)){
	emailcheck = true;
	}
	else {
	$('.comment_email_invalid').fadeIn(1000); 
	go=false;
	}
}

if(comment_text==''){
$('.comment_text_empty').fadeIn(1000);
go=false;
}

if ( go == false){
 return false; 
}
$('.comment_success').fadeIn(1000); 
$(this).closest('form').find("input[type=text], textarea").val("");

return false;
}); 
});

/***************************************************
12. CONTACT VALIDIATION & SEND

Send part is in mail.php file
***************************************************/

$(function() { 
$("#contact_button").click(function() { 
var contact_name = $("#contact_name").val(); 
var contact_email = $("#contact_email").val(); 
var contact_subject = $("#contact_subject").val(); 
var contact_text = $("#contact_text").val(); 
var emailReg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var dataString = '&name='+ contact_name + '&email=' + contact_email + '&text=' + contact_text + '&subject=' + contact_subject; 
var go = true;
var emailcheck = false;

$('.contact_name_empty').fadeOut(1000); 
$('.contact_email_empty').fadeOut(1000);
$('.contact_email_invalid').fadeOut(1000); 
$('.contact_subject_empty').fadeOut(1000); 
$('.contact_text_empty').fadeOut(1000); 
$('.contact_success').fadeOut(1000); 

if(contact_name==''){
$('.contact_name_empty').fadeIn(1000); 
go=false;
}

if(contact_email==''){
$('.contact_email_empty').fadeIn(1000); 
go=false;
}
else{
	if(emailReg.test(contact_email)){
	emailcheck = true;
	}
	else {
	$('.contact_email_invalid').fadeIn(1000); 
	go=false;
	}
}

if(contact_subject==''){
$('.contact_subject_empty').fadeIn(1000); 
go=false;
}

if(contact_text==''){
$('.contact_text_empty').fadeIn(1000);
go=false;
}

if ( go == false){
 return false; 
}

 $.ajax({ 
type: "POST", 
url: "email.php", 
data: dataString, 
success: function(){ 
$('.contact_success').fadeIn(1000); 
} 
}); 
$(this).closest('form').find("input[type=text], textarea").val("");

return false;
}); 
});

/***************************************************
13. SORT BY
***************************************************/
					
$(document).ready(function() {
						
	$('.sort_by li a').click(function() {
		
		$('.sort_by li').removeClass('selected');
		$(this).parent('li').addClass('selected');
		
		thisItem 	= $(this).attr('rel');
		
		if(thisItem != "all") {
		
			$('.media_ul li[data-rel='+thisItem+']').stop()
													.animate({ 'opacity' : 1, 'width' : 'show' });
			$('.media_ul li[data-rel!='+thisItem+']').stop()
													.animate({ 'opacity' : 0, 'width' : 'hide', });
													
		} else {
			
			$('.media_ul li').stop()
							.animate({ 'opacity' : 1, 'width' : 'show' });
		}
	return false;	
	})
});


/***************************************************
14. TOGGLE
***************************************************/

jQuery(document).ready(function($) {
		
$(".toggle_container").hide(); 

$(".toogle_on").click(function(){
	$(this).next(".toggle_container").slideToggle();
	return false;
});

});

/***************************************************
15. SCROLL TO
***************************************************/

			
function ScrollTo(id){
				$('html,body').animate({scrollTop: $("#"+id).offset().top},3000);
}



