var m=void 0,mibbu=function(K,L,B){function q(){for(var c=n.length,e,d,f,g,i,b,a,C,D;c--;)for(e in d=n[c],g=d.c+d.e.A,i=d.c+d.height-d.e.q,b=d.b+d.e.u,d=d.b+d.width-d.e.w,n[c].t)if(f=E[e],a=f.c+f.e.A,C=f.c+f.height-f.e.q,D=f.b+f.e.u,f=f.b+f.width-f.e.w,!(g>C||i<a||b>f||d<D))n[c].t[e]()}function F(){G();for(var c=e.length;c--;)e[c].G();for(c=h.length;c--;)h[c]();if(s){c=+new Date;~~(c-v)>=1E3&&(H=w,w=0,v=c);c="FPS: "+H;if(i)o.fillText(c,4,15);else if(t)t.innerHTML=c;w++}x&&(I=J(F,g))}function M(){g=l.createElement("canvas");o=g.getContext("2d");o.i=o.drawImage;e.sort(function(c,e){return c.j-e.j})}function N(){G=i?function(){o.clearRect(0,0,y,z)}:function(){};s&&(v=new Date);J=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(c){setTimeout(c,1E3/60)}}();p=g.style;g.width=y;g.height=z;p.width=y+"px";p.height=z+"px";p.position="absolute";p.overflow="hidden";A.appendChild(g)}var i=!0,k=!1,l=document,e=[],A=B?l.getElementById(B):l.body,g,o,y=K||400,z=L||300,h=[],I,G,v=new Date,s=!1,t,n=[],E=[],J,p,u,j;Array.prototype.i=Array.prototype.indexOf||function(c){for(var e=this.length;e--&&this[e]!==c;);return e};var w=0,H=0,x=!0;l.createElement("canvas").getContext||(i=!1);return{fps:function(){s=!0;return this},init:function(){i?M():(g=l.createElement("div"),s&&(t=l.createElement("div"),g.appendChild(t)));N();return this},on:function(){x=!0;F();if(k)for(var c=e.length;c--;)e[c].a&&(e[c].a.style[j+"AnimationDuration"]=~~(1/(60/e[c].f)*100)/100*(e[c].h+1)+"s");return this},off:function(){clearTimeout(I);x=!1;if(k)for(var c=e.length;c--;)e[c].a&&(e[c].a.style[j+"AnimationDuration"]=0);return this},canvas:function(){return g},ctx:function(){return o},canvasOff:function(){i=!1;typeof A.style.WebkitAnimation!=="undefined"?(u="-webkit-",j="Webkit",k=!0):typeof A.style.MozAnimation!=="undefined"&&(u="-moz-",j="Moz",k=!0);return this},cssAnimationOff:function(){k=!1;return this},hitsOn:function(){h.i(q)===-1&&h.push(q);return this},hitsOff:function(){h.i(q)!==-1&&h.splice(h.i(q),1);return this},spr:function(c,h,d,f,p){function r(){for(var b="@"+u+"keyframes s"+a.id+" {\n",c=100/(a.h+1),e="% { "+u+"transform: translate(",d=0;d<a.h+1;d++)b+=~~(c*d*100)/100+e+a.k*a.width*-1+"px,"+d*a.height*-1+"px); }\n",b+=~~((c*(d+1)-0.01)*100)/100+e+a.k*a.width*-1+"px,"+d*a.height*-1+"px); }\n";return b+("100"+e+a.k*a.width+"px, 0px); }\n}")}var b=i?function(){try{o.i(a.a,a.F*a.k,a.D*a.n,a.F,a.D,a.b,a.c,a.width,a.height)}catch(b){}}:k?function(){}:function(){a.d.top=a.height*a.n*-1+"px";a.d.left=a.width*a.k*-1+"px"},a={};a.id=e.length;a.a=new Image;a.a.src=c;a.f=1;a.width=h;a.F=h;a.height=d;a.D=d;a.h=f;a.H=p;a.I=!1;a.t={};a.n=0;a.k=0;a.f=1;a.p=0;a.b=0;a.c=0;a.j=1;a.s=null;a.r=0;a.B=0;a.e={A:0,u:0,q:0,w:0};if(!i){a.C=l.createElement("div");a.g=a.C.style;a.g.overflow="hidden";a.g.width=h+"px";a.g.height=d+"px";a.g.position="absolute";a.g.zIndex=a.j;a.d=a.a.style;a.d.position="absolute";if(k)a.o=l.createElement("style"),a.o.innerHTML=r(),l.body.appendChild(a.o),a.d[j+"Animation"]="s"+a.id+" "+~~(1/(60/a.f)*100)/100*(a.h+1)+"s linear 0s infinite";a.C.appendChild(a.a);g.appendChild(a.C)}a.id=e.push(a)-1;E.push(a);a.G=function(){if(a.h>0){if(a.p==a.f&&a.f!==0){if(a.n==a.h){if(a.n=0,typeof a.s==="function"&&(a.r++,a.r===a.B))a.s(),a.r=0}else a.n++;a.p=0}a.f!==0&&a.p++;b()}};return{position:function(b,c,d){return b!==m?(a.b=b||a.b,a.c=c||a.c,a.j=d||a.j,i?d&&e.sort(function(a,b){return b.j-a.j}):(a.g.left=b+"px",a.g.top=c+"px",a.g.zIndex=d||a.j),this):{x:a.b,y:a.c,J:a.j}},hit:function(b,c){n.i(a)===-1&&n.push(a);a.t[b.id()]=c;n.i(a)===-1&&n.push(a);return this},zone:function(b,c,d,e){return b!==m?(a.e.u=e,a.e.A=b,a.e.w=c,a.e.q=d,this):a.e},noHits:function(){a.t={};return this},callback:function(b,c){a.s=b;a.B=c;return this},change:function(b,c,d,e,f){a.a.src=b;a.width=c;a.height=d;a.F=c;a.D=d;a.h=e;a.k=f;a.p=0;a.n=0;a.s=null;a.r=0;a.B=0;if(!i&&(a.d.width=c*(a.k+1)+"px",a.d.height=d*(a.h+1)+"px",a.g.width=c+"px",a.g.height=d+"px",k))a.d[j+"AnimationName"]="",a.o.innerHTML=r(),a.d[j+"AnimationName"]="s"+a.id;a.e={A:0,u:0,q:0,w:0};return this},size:function(b,c){if(b!==m){if(!i)a.g.width=b+"px",a.g.height=c+"px",a.d.width=b*(a.H+1)+"px",a.d.height=c*(a.h+1)+"px";a.width=b;a.height=c;if(k)a.d[j+"AnimationName"]="",a.o.innerHTML=r(),a.d[j+"AnimationName"]="s"+a.id;return this}else return{width:a.width,height:a.height}},speed:function(b){return b!==m?(a.f=b,a.p=0,k&&(a.d[j+"AnimationDuration"]=~~(1/(60/b)*100)/100*(a.h+1)+"s"),this):a.f},animation:function(b){if(b!==m){a.k=b;if(k)a.d[j+"AnimationName"]="",a.o.innerHTML=r(),a.d[j+"AnimationName"]="s"+a.id;return this}else return a.k},frame:function(b){return b!==m?(a.n=b,this):a.n},id:function(){return a.id}}},bg:function(c,h,d,f){function j(c){b.l=0;b.m=0;if(typeof c==="string")switch(c){case "N":b.l=0;b.m=-1;break;case "W":b.l=-1;b.m=0;break;case "S":b.l=0;b.m=1;break;case "E":b.l=1,b.m=0}else if(typeof c==="number")c*=a,b.l=Math.cos(c),b.m=Math.sin(c)}var k=i?function(){try{for(var a=b.c%b.a.height,c=b.b%b.a.width-b.a.width;c<g.width;c+=b.a.width)for(var d=a-b.a.height;d<g.height;d+=b.a.height)o.i(b.a,c,d)}catch(e){}if(b.l<0){if(b.b<b.a.width*-1)b.b=0}else if(b.l>0&&b.b>b.a.width)b.b=0;if(b.m<0){if(b.c<b.a.height*-1)b.c=0}else if(b.m>0&&b.c>b.a.height)b.c=0}:function(){var a=b.b,c=b.c;a.toString().indexOf("e")!=-1&&(a=0);c.toString().indexOf("e")!=-1&&(c=0);g.style.backgroundPosition=a+"px "+c+"px"},b=this;i?(b.a=new Image,b.a.src=c):g.style.backgroundImage="url("+c+")";b.f=h||3;var a=Math.PI/180;j(d);b.j=f.z||0;b.b=f.x||0;b.c=f.y||0;b.id=e.push(b);b.v=0;b.G=function(){b.b+=b.f*b.l*b.v;b.c+=b.f*b.m*b.v;k()};return{on:function(){b.v=1;return this},off:function(){b.v=0;return this},dir:function(a){j(a);return this},speed:function(a){return a!==m?(b.f=a,this):b.f},position:function(a,c){return a!==m?(b.b=a||b.b,b.c=c||b.c,this):{x:b.b,y:b.c}}}},hook:function(c){h.push(c);return this},unhook:function(c){h.i(c)!==-1&&h.splice(h.i(c),1);return this}}};