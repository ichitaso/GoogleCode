(function($){
$(function(){
var url = location.href;
var ameId = "ichitaso",more_text = "",text_len = 0,option_switch = 0;
if(url.match(/^.+\/page[\-0-9]*\.html\#main$/g ) || url.match(/^.+\/theme[0-9]*[\-0-9]*\.html\#main$/g ) || url.match(/^.+\/theme[\-0-9]*\.html$/g ) || url.match(/^.+\/page[\-0-9]*\.html/g ) || url == 'http://ameblo.jp/'+ameId || url == 'http://ameblo.jp/'+ameId+'/' || url == 'http://ameblo.jp/'+ameId+'\#'){
$(".skinArticle").each(function(i){
if(!$(this).find(".amemberEntry").length){
var contents = $(this).find(".articleText"),link = $(this).find("a.skinArticleTitle"),link_title=$(link).text(),link_src=$(link).attr('href'),text_obj = $(".articleText");
if(option_switch == true){var text= $(contents).text(),text=$.trim(text);}
else{var text = contents.html();}
if (text.replace(/<.*?>/g, "").length>text_len)text=text.substring(0,text_len);
$(contents).html("<div class='text_area'>"+ text +"</div><div class='contents_footer_area'><span class='more_link'><a href='"+ link_src +"' title='"+ link_title +"'>"+ more_text +"</a></span></div>");
}
});
}
});
})(jQuery);