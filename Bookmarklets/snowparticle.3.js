(function(d,b){
 var q = d.createElement('div');
 q.innerHTML = '<style>.snow{animation:void3 3.5s infinite;-webkit-animation:void3 3.5s infinite;-moz-animation:void3 3.5s infinite;-o-animation:void3 3.5s infinite;}'+
 '@keyframes void3{'+
 'from{box-shadow: 0 0 5px 3px rgba(255,255,255,0.3);}'+
 '60%{box-shadow: 0 0 15px 12px rgba(255,255,255,0.5);}'+
 'to{box-shadow: 0 0 3px 2px rgba(255,255,225,0.3);}'+
 '}'+
 '@-webkit-keyframes void3{'+
 'from{box-shadow: 0 0 5px 3px rgba(255,255,255,0.3);}'+
 '60%{box-shadow: 0 0 15px 12px rgba(255,255,255,0.5);}'+
 'to{box-shadow: 0 0 3px 2px rgba(255,255,225,0.3);}'+
 '}'+
 '@-moz-keyframes void3{'+
 'from{box-shadow: 0 0 5px 3px rgba(255,255,255,0.3);}'+
 '60%{box-shadow: 0 0 15px 12px rgba(255,255,255,0.5);}'+
 'to{box-shadow: 0 0 3px 2px rgba(255,255,225,0.3);}'+
 '}'+
 '@-o-keyframes void3{'+
 'from{box-shadow: 0 0 5px 3px rgba(255,255,255,0.3);}'+
 '60%{box-shadow: 0 0 15px 12px rgba(255,255,255,0.5);}'+
 'to{box-shadow: 0 0 3px 2px rgba(255,255,225,0.3);}'+
 '}'+
 '</style>';
 q.id = 'snowparticle';
 b.appendChild(q);
 q = document.getElementById('snowparticle');
 b.style.overflowX = 'hidden';
 var h = window.innerHeight;
 var u = document.documentElement.scrollTop || document.body.scrollTop;
 var e = u+h+10;
 var z = 9999;
 var t = new Array();
 var l = new Array();
 var y = new Array();
 var s = new Array();
 var g = new Array();
 var c = new Array();
 d.addEventListener('scroll',function(){u = document.documentElement.scrollTop || document.body.scrollTop;e = u+h+10;},false);
 for(var i=0;i<50;i++){
  var m = d.createElement('div');
  m.id = 'yuki'+i;
  t[i] = Math.random()*-h+Math.random()*(h/2)+u;
  l[i] = Math.random()*window.innerWidth;
  var p = Math.random()*8+6;
  m.setAttribute('style','position:absolute;z-index:'+(z+i)+';top:-'+t[i]+'px;width:'+p+'px;height:'+p+'px;background:rgba(255,255,255,0.8);border-radius:8px;left:'+l+'px;');
  m.setAttribute('class','snow');
  q.appendChild(m);
  y[i] = Math.random()*25+0.1;
  s[i] = Math.random()*5+0.5;
  g[i] = document.getElementById('yuki'+i);
  c[i] = 0;
 }
 setInterval(function(){
  for(var i=0;i<50;i++){
   if(e>t[i]){
    if(y[i]>=c[i]){
     l[i] = l[i]+0.5+Math.random()*0.5;
    }else{
     l[i] = l[i]-0.5-Math.random()*0.5;
    }
    if((y[i]*2)<=c[i]){
     c[i] = 0;
    }
   }else{
    t[i] = u-10;
    l[i] = Math.random()*window.innerWidth;
   }
   t[i] = t[i]+s[i];
   g[i].style.top = t[i]+'px';
   g[i].style.left = l[i]+'px';
   c[i]++;
  }
 },45);
})(document,document.body);