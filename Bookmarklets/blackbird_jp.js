var PUBLITWEET_INTERFACE_LOADED = false;
var global_tweet_id = "";

function publitweet_blackbird_close(){
	id="publitweet_bookmarklet";
	PUBLITWEET_INTERFACE_LOADED=false;
	jQuery('#'+id).remove();
}

function showItem(id){
  try{
    var item = document.getElementById(id);
    if(item){
        item.style.display = "";
    }
  }
  catch(e){
  
  }
}

(function(){
 
	u = document.location.href
	matches = u.match(/https?:\/\/twitter.com\/(.{1,15})\/status(es)?\/([0-9]{3,20})/i);
	
	if(!matches)
	{
		m2 = u.match(/^https?:\/\/twitter.com(\/.*)?/i);
		if(!m2)
			alert('You have to be on a twitter.com page to execute this bookmarklet');
		else
		{
			console.info('Starting publitweet');
			if(jQuery('.publitweet_blackbird_getEmbed').size()==0)
			{
				var inArray = function(str,array) {
					for (var i=0, len=array.length; i < len; i++) {
						if(array[i] == str)
							return true;
					};
					return false;
				}
				
				var permalink_memory = [];
				jQuery('.stream-tweet, .permalink-tweet').live('hover',function() {
					var node = jQuery(this).find('.tweet-actions');
				    if(node)
                    {
						var permalink = node.siblings('.tweet-timestamp').attr('href').replace('/#!','http://twitter.com');
						var tweetClass = ($(this).hasClass('permalink-tweet')) ? 'permalink' : 'stream';
						if(inArray(tweetClass+':'+permalink,permalink_memory))
							return;
							
						var m3 = permalink.match(/https?:\/\/twitter.com\/(.{1,15})\/status(es)?\/([0-9]{3,20})/i);
						var id = m3[3];
						permalink_memory.push(tweetClass+':'+permalink);
						console.info('publitweet_blackbird_ id: '+id);
						var anchor = jQuery('&nbsp; <a class="publitweet_blackbird_getEmbed" href="javascript:void();" style="display:inline-table;height:16px;padding-left:18px;">[embed tweet]</a>');
                        node.append(anchor);
						anchor.click(function() {
							publitweet_blackbird_getCode(id);
						});
                    }
				});
			}
		}
	}
	else
	{
		publitweet_blackbird_getCode(matches[3]);
	
		//  http://api.twitter.com/1/statuses/show/'..'.json'
	}
})();

function publitweet_writeInterface()
{
	if(PUBLITWEET_INTERFACE_LOADED)
	{
		return;		
	}
		
	PUBLITWEET_INTERFACE_LOADED = true;
	var publitweet_iframe_width  = 500;
  var publitweet_iframe_height = 400;
  
	var div = document.createElement("div");
  div.id = "publitweet_bookmarklet";

	t = Math.round((jQuery(window).height() - publitweet_iframe_height) / 2);
	l = Math.round((jQuery(window).width()/2) - (publitweet_iframe_width/2));

	  var str = "";
	  str += "<div id='publitweet_bookmarklet_table' style=\"background:#E9EAEE;";
	  str += "-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;-moz-box-shadow:1px 2px 6px rgba(0, 0, 0, 0.5);box-shadow: 1px 2px 6px rgba(0,0,0, 0.5);-webkit-box-shadow: 1px 2px 6px rgba(0,0,0, 0.5);";
	  str += "padding:9px 10px;border:border:2px solid #FFFFFF; position:fixed; _position:absolute;top:"+t+"px;left:"+l+"px;";
	  str += "width:"+publitweet_iframe_width+"px;height: "+publitweet_iframe_height+"px;z-index:10000000;margin:0;padding:0;background:'#E9EAEE';\">";
	  str += "<div style='padding:10px;width:430px;margin:0 auto;'>";
	  str += "<h2 style='text-align:left;margin-top:10px;color:#393939 !important;'>Publitweet blackbird</h3>";
	  str += "<h3 style='text-align:left;margin-top:10px;color:#393939 !important;'>HTML code:</h3>";
	  str += "<textarea id='EmbedCode' style='margin:10px 0px;";
	  str += "background:none repeat scroll 0 0 #FAFAFC;border:1px solid #A3A3A3;color:#2F2F2F;font:10px/15px Monaco,monospace;height:240px;outline:medium none;overflow:hidden;padding:9px 0px;width:430px;";
	  str += "'>Loading..</textarea>";

	//  str += "<iframe frameborder='0' scrolling='no' name='publitweet_bookmarklet_iframe' id='publitweet_bookmarklet_iframe' src='" + iframe_url + "' width='"+(publitweet_iframe_width-30)+"px' height='"+(publitweet_iframe_height-5)+"px' style='textalign:right; backgroundColor: white;'></iframe>";
//	  str += "</td><td onClick='' style='background: black;' title='click to close window' valign='top' align='center' width='30px'>";
	  str += "<center><a href='javascript:publitweet_blackbird_close();' style='width:100%; text-align: middle; color: #393939; font-family: Arial;'><b>[close (^esc)]</b></a></center>";
	  str += "</div></div>";

	  div.innerHTML = str;
	jQuery(document).keyup(function(e) {
	    if (e.keyCode == 27) { publitweet_blackbird_close(); }  // esc   (does not work)
	});
	
	jQuery('#EmbedCode').focus(function() {
		jQuery(this).select();
	});
	
//	  div.onkeypress = keyPressHandler;
	  document.body.insertBefore(div, document.body.firstChild);
}

function publitweet_blackbird_getCode(tweet_id)
{
	publitweet_writeInterface();
	e=document.getElementById('EmbedCode');
	e.value = 'Loading...';
	global_tweet_id = tweet_id;
	api_call = 'http://cdn.api.twitter.com/1/statuses/show/'+tweet_id+'.json?callback=publitweet_blackbird';

	_my_script=document.createElement('SCRIPT');
	_my_script.type='text/javascript';
	_my_script.src=api_call;
	document.getElementsByTagName('head')[0].appendChild(_my_script);
	
	publitweet_track(tweet_id);
}

function publitweet_track(tweet_id)
{
	screen_name = '';
	href = $('a[id="profile_link"]').attr('href');
	if(href)
		screen_name = href.substr(href.lastIndexOf('/')+1)
		
	api_call = 'http://publitweet.com/blackbird/track.php?tweet_id='+tweet_id+'&screen_name='+screen_name;

	_my_script=document.createElement('SCRIPT');
	_my_script.type='text/javascript';
	_my_script.src=api_call;
	document.getElementsByTagName('head')[0].appendChild(_my_script);
	
}



function publitweet_blackbird(tweet)
{
	tweet_id				= global_tweet_id;
	screen_name 			= tweet.user.screen_name;
	name		 			= tweet.user.name;
	background_url			= tweet.user.profile_background_image_url;
	avatar					= tweet.user.profile_image_url;
	source					= tweet.source.replace('rel="nofollow"','rel="nofollow" target="_blank"'); 
  // timestamp				= tweet.created_at.substr(0,tweet.created_at.indexOf('+'));
	timestamp       = relative_time(tweet.created_at);
  content					= tweet.text.replace(/(http:\/\/\S+)/g, "<a href='$1' target='_new'>$1</a>"); 
	profile_background_color= '#'+tweet.user.profile_background_color;
	content 				= content.replace(/#([a-z0-9]*)/ig,'<a href="http://search.twitter.com/search?q=%23$1" target="_new">#$1</a>');
	content 				= content.replace(/@([a-z0-9_-]{1,15})/ig,'<a href="http://twitter.com/$1" target="_new">@$1</a>');
	
	EmbedCode = '<'+"!-- http://twitter.com/"+screen_name+"/status/"+tweet_id+" --> ";
	EmbedCode +=  '<'+"style type='text/css'>.bbpBox{background:url("+background_url+") "+profile_background_color+";padding:20px;}"+'<'+"/style>";
	EmbedCode += '<'+"div id='tweet_"+tweet_id+"' class='bbpBox' style='background:url("+background_url+") "+profile_background_color+";padding:20px;'>"+'<'+"p class='bbpTweet' style='background:#fff;padding:10px 12px 10px 12px;margin:0;min-height:48px;color:#000;font-size:16px !important;line-height:22px;-moz-border-radius:5px;-webkit-border-radius:5px;'>"+content+""+'<'+"span class='timestamp' style='font-size:12px;display:block;'>"+'<'+"a target='_blank' title='"+timestamp+"' href='http://twitter.com/"+screen_name+"/status/"+tweet_id+"'>"+timestamp+""+'<'+"/a> via "+source+""+'<'+"/span>"+'<'+"span class='metadata' style='display:block;width:100%;clear:both;margin-top:8px;padding-top:12px;height:40px;border-top:1px solid #fff;border-top:1px solid #e6e6e6;'>"+'<'+"span class='author' style='line-height:19px;'>"+'<'+"a target='_blank' href='http://twitter.com/"+screen_name+"'>"+'<'+"img src='"+avatar+"' style='float:left;margin:0 7px 0 0px;width:38px;height:38px;' />"+'<'+"/a>"+'<'+"strong>"+'<'+"a target='_blank' href='http://twitter.com/"+screen_name+"'>"+name+""+'<'+"/a>"+'<'+"/strong>"+'<'+"br/>"+screen_name+""+'<'+"/span>"+'<'+"/span>"+'<'+"/p>"+'<'+"/div> "+'<'+"!-- end of tweet -->";	

	e=jQuery('#EmbedCode');
	e.val(EmbedCode);
	e.focus();
	e.select();
}


function relative_time(time_value) {
  time_values = time_value.split(" ");
  time_value = time_values[1]+" "+time_values[2]+", "+time_values[5]+" "+time_values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
  var delta = parsed_date / 1000 - relative_to.getTimezoneOffset() * 60;
  var dd = new Date();
  dd.setTime(delta * 1000);
  var mm = '00'+dd.getMinutes();
  mm = mm.substr(mm.length-2,2);
  return dd.getFullYear()+'年'+(dd.getMonth()+1)+'月'+dd.getDate()+'日 '+dd.getHours()+':'+mm;
}