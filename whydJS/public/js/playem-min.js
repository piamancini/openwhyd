/* playemjs commit: cc0d0b65c4878e90baeb8c22d7e2c535db5e7ab7 */ 
var USE_SWFOBJECT=true,PLAY_TIMEOUT=10000;window.$=window.$||function(){return window.$};if(undefined==window.console){window.console={log:function(){}}}loader=new (function Loader(){var d={loaded:true,complete:true,4:true},b=document.getElementsByTagName("head")[0],c={},a=0;return{loadJSON:function(g,e){var f=new XMLHttpRequest();f.onload=function(){var h=f.responseText;try{h=JSON.parse(h)}catch(j){}e(h)};f.open("GET",g,true);f.send()},includeJS:function(j,f){if(c[j]){return f&&f()}c[j]=true;var h=document.createElement("script");h.onload=function(){if(!c[j]){return}delete c[j];f&&setTimeout(f,1);delete h.onload};h.onerror=function(k){k.preventDefault();h.onload(k)};h.onreadystatechange=function(){if(!h.readyState||d[h.readyState]){h.onload()}};try{h.src=j;b.appendChild(h)}catch(g){console.error("Error while including",j,g);f(g)}},loadJSONP:function(f,e){var g="__loadjsonp__"+(a++);window[g]=function(){e.apply(window,arguments);delete window[g]};this.includeJS(f+(f.indexOf("?")==-1?"?":"&")+"callback="+g,function(){setTimeout(window[g],10)})}}});function EventEmitter(){this._eventListeners={}}EventEmitter.prototype.on=function(a,b){this._eventListeners[a]=(this._eventListeners[a]||[]).concat(b)};EventEmitter.prototype.emit=function(a){var c,b=Array.prototype.slice.call(arguments,1),d=this._eventListeners[a];for(c in d){d[c].apply(null,b)}};function inherits(b,a){b.super_=a;b.prototype=Object.create(a.prototype,{constructor:{value:b,enumerable:false,writable:true,configurable:true}})}function Playem(b){function a(t){EventEmitter.call(this);t=t||{};t.loop=t.hasOwnProperty("loop")?t.loop:true;var d=[],x,y,m=null,e=[],n=null,r=0,j=null,k=this,f=null,w=1;this.setPref=function(z,A){t[z]=A};function g(B,A){var z=null;function C(){if(B.isReady&&z){clearInterval(z);A()}else{console.warn("PLAYEM waiting for",B.label,"...")}}if(B.isReady){setTimeout(A)}else{z=setInterval(C,1000)}}function u(B,A){var z={index:e.length,metadata:B||{}};if(A){z.url=A}e.push(z);return z}function s(C,B,A){if(C){var z=u(A);z.trackId=C;z.player=B;z.playerName=B.label.replace(/ /g,"_");return z}else{throw new Error("no id provided")}}function c(D,B){var C=0,A;for(var z=0;z<d.length;z++){A=d[z];if(typeof A.searchTracks=="function"){C++;A.searchTracks(D,5,function(F){for(var E in F){B(F[E])}if(--C===0){B()}})}}}function p(z){w=z;q("setVolume",z)}function v(){if(j){clearInterval(j)}for(var z in d){if(d[z].stop){d[z].stop()}else{d[z].pause()}}try{soundManager.stopAll()}catch(A){console.error("playem tried to stop all soundManager sounds =>",A)}}function h(z){v();m=z;delete m.trackPosition;delete m.trackDuration;k.emit("onTrackChange",z);if(!z.player){return k.emit("onError",{code:"unrecognized_track",source:"Playem",track:z})}g(z.player,function(){q("play",z.trackId);p(w);if(m.index==e.length-1){k.emit("loadMore")}o(function(){console.warn("PLAYEM TIMEOUT");k.emit("onError",{code:"timeout",source:"Playem"})})})}function o(z){if(f){clearTimeout(f)}f=!z?null:setTimeout(z,PLAY_TIMEOUT)}function q(z,B){try{return m.player[z](B)}catch(A){console.warn("Player call error",z,A,A.stack)}}function l(A){var z={onApiReady:function(B){if(n&&B==n.player){n.fct()}if(0==--r){k.emit("onReady")}},onEmbedReady:function(B){p(w)},onBuffering:function(B){setTimeout(function(){o();k.emit("onBuffering")})},onPlaying:function(B){p(w);setTimeout(function(){k.emit("onPlay")},1);if(B.trackInfo&&B.trackInfo.duration){z.onTrackInfo({position:B.trackInfo.position||0,duration:B.trackInfo.duration})}if(j){clearInterval(j)}if(B.getTrackPosition){j=setInterval(function(){B.getTrackPosition(function(C){z.onTrackInfo({position:C,duration:B.trackInfo.duration||m.trackDuration})})},1000)}},onTrackInfo:function(B){if(m&&B){if(B.duration){m.trackDuration=B.duration;o()}if(B.position){m.trackPosition=B.position}}k.emit("onTrackInfo",m)},onPaused:function(B){o();if(j){clearInterval(j)}j=null},onEnded:function(B){v();k.emit("onEnd");A.next()},onError:function(C,B){console.error(C.label+" error:",((B||{}).exception||B||{}).stack||B);o();k.emit("onError",B)}};["onEmbedReady","onBuffering","onPlaying","onPaused","onEnded","onError"].map(function(B){var C=z[B];z[B]=function(E,D){if(m&&E==m.player){return C(E,D)}}});return z}y={addPlayer:function(B,A){r++;var z=new B(l(this,A),A);d.push(z);return z},getPlayers:function(){return d},getQueue:function(){return e},clearQueue:function(){e=[]},addTrackByUrl:function(A,C){var D,B,z;for(D=0;D<d.length;++D){B=d[D];z=B.getEid(A);if(z){return s(z,B,C)}}return u(C,A)},play:function(z){h(z!=undefined?e[z]:m||e[0])},pause:function(){q("pause");k.emit("onPause")},stop:v,resume:function(){q("resume")},next:function(){if(t.loop||m.index+1<e.length){h(e[(m.index+1)%e.length])}},prev:function(){h(e[(e.length+m.index-1)%e.length])},seekTo:function(z){if((m||{}).trackDuration){q("setTrackPosition",z*m.trackDuration)}},setVolume:p,searchTracks:c};for(x in y){this[x]=y[x]}}inherits(a,EventEmitter);return new a()}function AudioFilePlayer(){return AudioFilePlayer.super_.apply(this,arguments)}(function(){var b={onplay:"onPlaying",onresume:"onPlaying",onpause:"onPaused",onstop:"onPaused",onfinish:"onEnded"};function a(f,c){this.label="Audio file";this.eventHandlers=f||{};this.embedVars=c||{};this.element=null;this.widget=null;this.isReady=false;this.trackInfo={};var d,g,e=this;this.soundOptions={id:null,url:null,autoLoad:true,autoPlay:true,ontimeout:function(h){e.eventHandlers.onError&&e.eventHandlers.onError(e,{code:"timeout",source:"AudioFilePlayer"})}};for(d in b){(function(h){e.soundOptions[h]=function(){var j=f[b[h]];j&&j(e)}})(d)}g=setInterval(function(){try{if(window.soundManager){clearInterval(g);e.isReady=true;f.onApiReady&&f.onApiReady(e)}}catch(h){e.eventHandlers.onError&&e.eventHandlers.onError(e,{source:"AudioFilePlayer",exception:h})}},200)}a.prototype.getEid=function(c){c=(c||"").split("#").pop();if(!c){return null}var d=c.split("?")[0].split(".").pop().toLowerCase();return(d=="mp3"||d=="ogg")?c.replace(/^\/fi\//,""):null};a.prototype.fetchMetadata=function(d,c){d=this.getEid(d);if(!d){return c()}c({id:d.replace(/^\/fi\//,""),title:d.split("/").pop().split("?")[0]})};a.prototype.getTrackInfo=function(e){var d=this,c=setInterval(function(){if(d.widget&&d.widget.duration){clearInterval(c);e(d.trackInfo={duration:d.widget.duration/1000,position:d.widget.position/1000})}},500)};a.prototype.getTrackPosition=function(d){var c=this;this.getTrackInfo(function(){d(c.trackInfo.position);c.eventHandlers.onTrackInfo&&c.eventHandlers.onTrackInfo(c.trackInfo)})};a.prototype.setTrackPosition=function(c){this.widget&&this.widget.setPosition(Math.floor(Math.min(this.widget.duration,c*1000)-2000))};a.prototype.embed=function(c){if(!c||!c.trackId){return}this.embedVars=c=c||{};this.soundOptions.id=c.playerId=c.playerId||"mp3Player"+(new Date()).getTime();this.soundOptions.url=c.trackId.replace(/^\/fi\//,"");this.trackInfo={};if(this.widget){this.pause();this.widget=null;delete this.widget}this.widget=soundManager.createSound(this.soundOptions);this.eventHandlers.onEmbedReady&&this.eventHandlers.onEmbedReady(this);this.eventHandlers.onTrackInfo&&this.getTrackInfo(this.eventHandlers.onTrackInfo);this.play()};a.prototype.play=function(c){this.isReady&&this.embed({trackId:c})};a.prototype.resume=function(){this.isReady&&this.widget&&this.widget.resume()};a.prototype.pause=function(){try{this.isReady&&this.widget&&this.widget.pause()}catch(c){console.error(c.stack)}};a.prototype.stop=function(){this.widget&&this.widget.stop()};a.prototype.setVolume=function(c){if(this.widget&&this.widget.setVolume&&this.soundOptions){soundManager.setVolume(this.soundOptions.id,100*c)}};AudioFilePlayer.prototype=a.prototype;AudioFilePlayer.super_=a})();window.$=window.$||function(){return window.$};$.getJSON=$.getJSON||function(b,a){var c="_cb_"+Date.now();b=b.replace("callback=?","callback="+c);window[c]=function(){a.apply(window,arguments);delete window[c]};loader.includeJS(b)};function BandcampPlayer(){return BandcampPlayer.super_.apply(this,arguments)}(function(j){var b="//api.bandcamp.com/api",e="&key="+j+"&callback=?";function c(k){return k.indexOf("/bc/")==0&&k.substr(4)}function f(l){var k=l.match(c(l)?(/\/bc\/([a-zA-Z0-9_\-]+)\/([a-zA-Z0-9_\-]+)/):/([a-zA-Z0-9_\-]+).bandcamp\.com\/track\/([a-zA-Z0-9_\-]+)/);return(k||[]).length===3&&k.slice(1)}function d(m){var l=f(m),k=m.split("#")[1];return l&&(l[0]+"/"+l[1]+(k?"#"+k:""))}function h(k){return k.indexOf("bandcamp.com/download/track")!=-1}function g(l,k){l="http://"+l.split("//").pop();$.getJSON(b+"/url/1/info?url="+encodeURIComponent(l)+e,function(m){var n=(m||{}).track_id;if(!n){return k(m)}$.getJSON(b+"/track/3/info?track_id="+n+e,function(o){k(null,(o||{}).streaming_url)})})}function a(l){var k=this,m=null;this.label="Bandcamp";this.eventHandlers=l||{};this.currentTrack={position:0,duration:0};this.sound=null;this.isReady=false;m=setInterval(function(){if(!!window.soundManager){clearInterval(m);k.isReady=true;k.clientCall("onApiReady",k)}},200)}a.prototype.clientCall=function(l,m){var k=Array.apply(null,arguments).slice(1);return(this.eventHandlers[l]||function(){}).apply(null,k)};a.prototype.soundCall=function(l,m){var k=Array.apply(null,arguments).slice(1);return((this.sound||{})[l]||function(){}).apply(null,k)};a.prototype.getEid=function(k){return c(k)||d(k)};a.prototype.fetchMetadata=function(m,k){var l=f(m);k(!l?null:{id:d(m),img:"//s0.bcbits.com/img/bclogo.png",title:l[0].replace(/[\-_]+/g," ")+" - "+l[1].replace(/[\-_]+/g," ")})};a.prototype.playStreamUrl=function(l){var k=this;if(!l){return k.clientCall("onError",k,{source:"BandcampPlayer",code:"no_stream"})}l="http://"+l.split("//").pop();k.sound=soundManager.createSound({id:"_playem_bc_"+Date.now(),url:l,autoLoad:true,autoPlay:true,whileplaying:function(){k.clientCall("onTrackInfo",k.currentTrack={position:k.sound.position/1000,duration:k.sound.duration/1000})},onplay:function(m){k.clientCall("onPlaying",k)},onresume:function(){k.clientCall("onPlaying",k)},onfinish:function(){k.clientCall("onEnded",k)}})};a.prototype.play=function(l){var k=this;if(h(l)){this.playStreamUrl(l)}else{g(l,function(n,m){if(n||!m){k.clientCall("onError",k,{source:"BandcampPlayer",error:(n||{}).error_message})}else{this.playStreamUrl(m)}})}};a.prototype.pause=function(){this.soundCall("pause")};a.prototype.stop=function(){this.soundCall("stop");this.soundCall("destruct");this.sound=null};a.prototype.resume=function(){this.soundCall("resume")};a.prototype.setTrackPosition=function(k){this.soundCall("setPosition",Math.round(k*1000))};a.prototype.setVolume=function(k){this.soundCall("setVolume",Math.round(k*100))};BandcampPlayer.prototype=a.prototype;BandcampPlayer.super_=a})("vatnajokull");function DailymotionPlayer(){return DailymotionPlayer.super_.apply(this,arguments)}(function(){var c=/(dailymotion.com(?:\/embed)?\/video\/|\/dm\/)([\w-]+)/,b=0;EVENT_MAP={0:"onEnded",1:"onPlaying",2:"onPaused"};function a(g,e){this.eventHandlers=g||{};this.embedVars=e||{};this.label="Dailymotion";this.element=null;this.isReady=false;this.trackInfo={};var f=this;window.onDailymotionStateChange=function(h){if(h>0||!b){f.safeClientCall(EVENT_MAP[h],f)}else{--b}};window.onDailymotionError=function(h){console.log("DM error",h);f.safeClientCall("onError",f,{source:"DailymotionPlayer",data:h})};window.onDailymotionAdStart=function(){f.safeClientCall("onBuffering",f)};window.onDailymotionPlayerReady=function(h){f.element=document.getElementById(h);f.element.addEventListener("onStateChange","onDailymotionStateChange");f.element.addEventListener("onError","onDailymotionError");f.element.addEventListener("onLinearAdStart","onDailymotionAdStart")};f.isReady=true;f.safeClientCall("onApiReady",f)}a.prototype.safeCall=function(g,j,h){var f=Array.apply(null,arguments).slice(1),e=(this.element||{})[g];return e&&e.apply(this.element,f)};a.prototype.safeClientCall=function(f,j,h){try{return this.eventHandlers[f]&&this.eventHandlers[f](j,h)}catch(g){console.error("DM safeclientcall error",g.stack)}};a.prototype.embed=function(j){this.embedVars=j=j||{};this.embedVars.playerId=this.embedVars.playerId||"dmplayer";this.trackInfo={};this.element=document.createElement("object");this.element.id=this.embedVars.playerId;this.embedVars.playerContainer.appendChild(this.element);var g,f,e,k={allowScriptAccess:"always"},l={id:this.embedVars.playerId},h={info:0,logo:0,related:0,autoplay:1,enableApi:1,showinfo:0,hideInfos:1,chromeless:1,withLoading:0,playerapiid:this.embedVars.playerId};g=Object.keys(h).map(function(m){return m+"="+encodeURIComponent(h[m])}).join("&");f=Object.keys(k).map(function(m){return'<param name="'+m+'" value="'+encodeURIComponent(k[m])+'">'}).join();e={id:this.embedVars.playerId,width:this.embedVars.width||"200",height:this.embedVars.height||"200",type:"application/x-shockwave-flash",data:window.location.protocol+"//www.dailymotion.com/swf/"+this.embedVars.videoId+"?"+g,innerHTML:f};if(USE_SWFOBJECT){swfobject.embedSWF(e.data,this.embedVars.playerId,e.width,e.height,"9.0.0","/js/swfobject_expressInstall.swf",null,k,l)}else{$(this.element).attr(e)}$(this.element).show();this.safeClientCall("onEmbedReady")};a.prototype.getEid=function(e){return c.test(e)&&RegExp.lastParen};function d(h,e){var f=encodeURIComponent("http://www.dailymotion.com/embed/video/"+h),g="dmCallback_"+h.replace(/[-\/]/g,"__");window[g]=function(j){e(!j||!j.title?null:{id:h,title:j.title,img:j.thumbnail_url})};loader.includeJS("//www.dailymotion.com/services/oembed?format=json&url="+f+"&callback="+g)}a.prototype.fetchMetadata=function(f,e){var g=this.getEid(f);if(!g){return e()}d(g,e)};a.prototype.play=function(e){if(!this.currentId||this.currentId!=e){this.embedVars.videoId=e;this.embed(this.embedVars)}};a.prototype.pause=function(e){this.safeCall("pauseVideo")};a.prototype.resume=function(e){this.safeCall("playVideo")};a.prototype.stop=function(e){++b;this.safeCall("clearVideo");if((this.element||{}).parentNode){this.element.parentNode.removeChild(this.element)}};a.prototype.getTrackPosition=function(e){this.trackInfo.duration=this.safeCall("getDuration");e&&e(this.safeCall("getCurrentTime"))};a.prototype.setTrackPosition=function(e){this.safeCall("seekTo",e)};a.prototype.setVolume=function(e){this.safeCall("setVolume",e*100)};DailymotionPlayer.prototype=a.prototype;DailymotionPlayer.super_=a})();window.showMessage=window.showMessage||function(a){console.warn("[showMessage]",a)};window.$=window.$||function(){return window.$};$.getScript=$.getScript||function(b,a){loader.includeJS(b,a)};$.append=$.append||function(a){document.write(a)};function DeezerPlayer(){return DeezerPlayer.super_.apply(this,arguments)}(function(){var b="https://cdns-files.deezer.com/js/min/dz.js",k=false,f=false,g=/(deezer\.com\/track|\/dz)\/(\d+)/,c={player_play:"onPlaying",player_paused:"onPaused",track_end:"onEnded"};function a(n){var m=this;this.label="Deezer";this.eventHandlers=n||{};this.currentTrack={position:0,duration:0};d(function(){l(function(){DZ.getLoginStatus(function(o){DZ.player.setRepeat(0);f=o.userID;m.isReady=true;j(m)})})})}a.prototype.isLogged=function(){return f};a.prototype.getEid=function(m){return g.test(m)&&RegExp.lastParen};function e(o,m){var n="dzCallback_"+o.replace(/[-\/]/g,"__");window[n]=function(p){delete window[n];m(!p||!p.album?null:{id:o,title:p.artist.name+" - "+p.title,img:p.album.cover})};loader.includeJS("//api.deezer.com/track/"+o+"?output=jsonp&callback="+n)}a.prototype.fetchMetadata=function(n,m){var o=this.getEid(n);if(!o){return m()}e(o,m)};a.prototype.play=function(n){var m=this;if(f){DZ.player.playTracks([n],0)}else{DZ.api("/track/"+n,function(o){showMessage('This is a 30 secs preview. <a href="javascript:DeezerPlayer.login()">Connect to Deezer</a> to listen to the full track.');m.sound=h(m,o.preview)})}};a.prototype.pause=function(){if(this.sound){this.sound.pause()}else{DZ.player.pause()}};a.prototype.stop=function(){if(!this.isReady){return}if(this.sound){this.sound.stop();this.sound.destruct();this.sound=null}else{DZ.player.pause()}};a.prototype.resume=function(){if(this.sound){this.sound.resume()}else{DZ.player.play()}};a.prototype.setTrackPosition=function(m){if(this.sound){this.sound.setPosition(Math.round(m*1000))}else{DZ.player.seek(Math.round(100*m/this.currentTrack.duration))}};a.prototype.setVolume=function(m){if(this.sound){this.sound.setVolume(Math.round(m*100))}else{DZ.player.setVolume(Math.round(m*100))}};function d(n){if(!k){var m=document.createElement("div");m.id="dz-root";document.getElementsByTagName("body")[0].appendChild(m);$.getScript(b,function(){console.log("DZ.override_https()",window.location.protocol==="https:");if(window.location.protocol==="https:"){DZ.override_https()}k=true;n()})}else{n()}}function l(m){DZ.init({appId:DEEZER_APP_ID,channelUrl:DEEZER_CHANNEL_URL,player:{onload:m}})}function j(m){DZ.Event.subscribe("player_position",function(q){var t=m.eventHandlers.onTrackInfo,r=m.eventHandlers.onEnded,p=q[0],s=q[1];if(t){m.currentTrack={position:p,duration:s};t(m.currentTrack)}if((s-p<=1.5)&&r){r(m)}});function n(p){return function(){var q=m.eventHandlers[c[p]];q&&q(m)}}for(var o in c){DZ.Event.suscribe(o,n(o))}m.eventHandlers.onApiReady&&m.eventHandlers.onApiReady(m)}function h(m,n){return soundManager.createSound({id:"deezerSound"+Date.now(),url:n,autoLoad:true,autoPlay:true,whileplaying:function(){if(m.sound){m.currentTrack={position:m.sound.position/1000,duration:m.sound.duration/1000}}if(m.eventHandlers.onTrackInfo){m.eventHandlers.onTrackInfo(m.currentTrack)}},onplay:function(){if(m.eventHandlers.onPlaying){m.eventHandlers.onPlaying(m)}},onresume:function(){if(m.eventHandlers.onPlaying){m.eventHandlers.onPlaying(m)}},onfinish:function(){if(m.eventHandlers.onEnded){m.eventHandlers.onEnded(m)}}})}DeezerPlayer.login=function(){DZ.login(function(m){if(m.userID){f=true;showMessage("Login successful. Your Deezer tracks will be full length from now on!")}else{showMessage("Deezer login unsuccesful.",true)}},{perms:"email"})};DeezerPlayer.prototype=a.prototype;DeezerPlayer.super_=a})();function JamendoPlayer(){return JamendoPlayer.super_.apply(this,arguments)}(function(){var c={onplay:"onPlaying",onresume:"onPlaying",onpause:"onPaused",onstop:"onPaused",onfinish:"onEnded"};function a(g,d){this.label="Jamendo track";this.eventHandlers=g||{};this.embedVars=d||{};this.element=null;this.widget=null;this.isReady=false;this.trackInfo={};var e,h,f=this;this.soundOptions={id:null,url:null,autoLoad:true,autoPlay:true,ontimeout:function(j){f.eventHandlers.onError&&f.eventHandlers.onError(f,{code:"timeout",source:"JamendoPlayer"})}};for(e in c){(function(j){f.soundOptions[j]=function(){var k=g[c[j]];k&&k(f)}})(e)}h=setInterval(function(){try{if(window.soundManager){clearInterval(h);f.isReady=true;g.onApiReady&&g.onApiReady(f)}}catch(j){f.eventHandlers.onError&&f.eventHandlers.onError(f,{source:"JamendoFilePlayer",exception:j})}},200)}a.prototype.getEid=function(d){return/jamendo.com\/.*track\/(\d+)/.test(d)||/\/ja\/(\d+)/.test(d)?RegExp.$1:null};function b(e,g,d){var f="jaCallback_"+g.replace(/[-\/]/g,"__");window[f]=function(h){delete window[f];d(!h||!h.results||!h.results.length?null:{id:h.results[0].id,img:h.results[0].album_image,title:h.results[0].artist_name+" - "+h.results[0].name})};loader.includeJS("//api.jamendo.com/v3.0/tracks?client_id="+JAMENDO_CLIENT_ID+"&id="+g+"&callback="+f)}a.prototype.fetchMetadata=function(e,d){var f=this.getEid(e);if(!f){return d()}b(e,f,d)};a.prototype.getTrackInfo=function(f){var e=this,d=setInterval(function(){if(e.widget&&e.widget.duration){clearInterval(d);f(e.trackInfo={duration:e.widget.duration/1000,position:e.widget.position/1000})}},500)};a.prototype.getTrackPosition=function(e){var d=this;this.getTrackInfo(function(){e(d.trackInfo.position);d.eventHandlers.onTrackInfo&&d.eventHandlers.onTrackInfo(d.trackInfo)})};a.prototype.setTrackPosition=function(d){this.widget&&this.widget.setPosition(Math.floor(Math.min(this.widget.duration,d*1000)-2000))};a.prototype.embed=function(d){if(!d||!d.trackId){return}this.embedVars=d=d||{};this.soundOptions.id=d.playerId=d.playerId||"mp3Player"+(new Date()).getTime();this.soundOptions.url="//api.jamendo.com/v3.0/tracks/file?client_id="+JAMENDO_CLIENT_ID+"&action=stream&audioformat=mp32&id="+d.trackId;this.trackInfo={};if(this.widget){this.pause();this.widget=null;delete this.widget}this.widget=soundManager.createSound(this.soundOptions);this.eventHandlers.onEmbedReady&&this.eventHandlers.onEmbedReady(this);this.eventHandlers.onTrackInfo&&this.getTrackInfo(this.eventHandlers.onTrackInfo);this.play()};a.prototype.play=function(d){this.isReady&&this.embed({trackId:d})};a.prototype.resume=function(){this.isReady&&this.widget&&this.widget.resume()};a.prototype.pause=function(){try{this.isReady&&this.widget&&this.widget.pause()}catch(d){console.error("jamendo error:",d,d.stack)}};a.prototype.stop=function(){this.widget&&this.widget.stop()};a.prototype.setVolume=function(d){if(this.widget&&this.widget.setVolume&&this.soundOptions){soundManager.setVolume(this.soundOptions.id,100*d)}};JamendoPlayer.prototype=a.prototype;JamendoPlayer.super_=a})();function SoundCloudPlayer(){return SoundCloudPlayer.super_.apply(this,arguments)}(function(){var g={onplay:"onPlaying",onresume:"onPlaying",onpause:"onPaused",onstop:"onPaused",onfinish:"onEnded"},e=["onerror","ontimeout","onfailure","ondataerror"],c="https://api.soundcloud.com/resolve.json";function b(k,h){this.label="SoundCloud";this.eventHandlers=k||{};this.embedVars=h||{};this.element=null;this.widget=null;this.isReady=false;this.trackInfo={};this.soundOptions={autoPlay:true};var j=this;loader.includeJS("https://connect.soundcloud.com/sdk.js",function(){SC.initialize({client_id:SOUNDCLOUD_CLIENT_ID});for(var l in g){(function(n){j.soundOptions[n]=function(){var o=k[g[n]];o&&o(j)}})(l)}e.map(function(n){j.soundOptions[n]=function(o){console.error("SC error:",n,o,o.stack);j.eventHandlers.onError&&j.eventHandlers.onError(j,{code:n.substr(2),source:"SoundCloudPlayer"})}});j.isReady=true;try{soundManager.onready(function(){j.callHandler("onApiReady",j)})}catch(m){console.warn("warning: soundManager was not found => playem-soundcloud will not be able to stream music");j.callHandler("onApiReady",j)}});this.callHandler=function(l,n){try{k[l]&&k[l](n)}catch(m){console.error("SC error:",m,m.stack)}}}b.prototype.safeCall=function(h,k){try{if(this.widget&&this.widget[h]){this.widget[h](k)}}catch(j){console.error("SC safecall error",j.stack)}};function d(h){return/(soundcloud\.com)\/player\/?\?.*url\=([^\&\?]+)/.test(h)?decodeURIComponent(RegExp.lastParen):h.replace(/^\/sc\//,"http://soundcloud.com/")}b.prototype.getEid=function(h){h=d(h);if(/(soundcloud\.com)(\/[\w-_\/]+)/.test(h)){var j=RegExp.lastParen.split("/");return j.length===3&&RegExp.lastParen}else{if(/snd\.sc\/([\w-_]+)/.test(h)){return RegExp.lastMatch}}};function a(l,j,h){function m(o,n){setTimeout(function(){if(window[o]){n(window[o])}else{m(o,n)}},200)}function k(n){n.title=n.title||n.name;return{eId:"/sc"+n.permalink_url.substr(n.permalink_url.indexOf("/",10))+"#"+n.uri,img:n.img||n.artwork_url||"/images/cover-soundcloud.jpg",url:n.url||n.permalink_url+"#"+n.uri,title:(n.title.indexOf(" - ")==-1?n.user.username+" - ":"")+n.title,playerLabel:"Soundcloud"}}m("SC",function(n){n.get("/tracks",{q:l,limit:j},function(p){if(p instanceof Array){var o=p.map(k);h(o)}})})}b.prototype.searchTracks=function(k,j,h){a(k,j,h)};function f(j,h){var n,l,k;j=d(j);n=j.split("?");l=n.length>1?n[1]+"&":"";k=/\/tracks\/(\d+)/.test(n[0])?RegExp.lastParen:null;var m=(!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/))?"loadJSONP":"loadJSON";if(k){loader[m]("https://api.soundcloud.com/tracks/"+k+".json?"+l+"client_id="+SOUNDCLOUD_CLIENT_ID,h)}else{loader[m](c+"?client_id="+SOUNDCLOUD_CLIENT_ID+"&url="+encodeURIComponent("http://"+j.replace(/^(https?\:)?\/\//,"")),h)}}b.prototype.fetchMetadata=function(j,h){var k={};if(!this.getEid(j)){return h()}f(j,function(l){if(l&&l.kind=="track"){k.id=""+l.id;k.eId="/sc/"+l.permalink_url.substr(l.permalink_url.indexOf("/",10)+1)+"#"+l.stream_url;k.img=l.artwork_url||k.img;k.title=l.title;if(k.title.indexOf(" - ")==-1&&(l.user||{}).username){k.title=l.user.username+" - "+k.title}}h(k)})};b.prototype.getTrackPosition=function(h){h(this.trackInfo.position=this.widget.position/1000);if(this.widget.durationEstimate){this.eventHandlers.onTrackInfo&&this.eventHandlers.onTrackInfo({duration:this.widget.duration/1000})}};b.prototype.setTrackPosition=function(h){this.safeCall("setPosition",h*1000)};b.prototype.play=function(k){this.trackInfo={};var j=this;function h(l){j.embedVars.trackId=l;SC.stream(l,j.soundOptions,function(m){j.widget=m;j.callHandler("onEmbedReady",j)})}if(k.indexOf("/tracks/")==0){return h(k)}k="http://"+(!k.indexOf("/")?"soundcloud.com":"")+k;f(k,function(l){h((l||{}).id)})};b.prototype.resume=function(){this.safeCall("play")};b.prototype.pause=function(){this.safeCall("pause")};b.prototype.stop=function(){this.safeCall("stop")};b.prototype.setVolume=function(h){this.safeCall("setVolume",100*h)};SoundCloudPlayer.prototype=b.prototype;SoundCloudPlayer.super_=b})();function SpotifyPlayer(){return SpotifyPlayer.super_.apply(this,arguments)}(function(){var b={onplay:"onPlaying",onresume:"onPlaying",onpause:"onPaused",onstop:"onPaused",onfinish:"onEnded"};function a(e,c){var d=this;this.label="Spotify track";this.eventHandlers=e||{};this.embedVars=c||{};this.widget=null;this.isReady=false;this.trackInfo={};this.soundOptions={id:null,url:null,autoLoad:true,autoPlay:true,ontimeout:function(f){e.onError&&e.onError(d,{code:"timeout",source:"SpotifyPlayer"})}};Object.keys(b).map(function(f){d.soundOptions[f]=function(){var g=e[b[f]];g&&g(d)}});window.soundManager.onready(function(){d.isReady=true;e.onApiReady&&e.onApiReady(d)})}a.prototype.getEid=function(c){return/spotify.com\/track\/(\w+)/.test(c)?RegExp.$1:null};a.prototype.getTrackInfo=function(e){var d=this,c=setInterval(function(){if(d.widget&&d.widget.duration){clearInterval(c);e(d.trackInfo={duration:d.widget.duration/1000,position:d.widget.position/1000})}},500)};a.prototype.getTrackPosition=function(d){var c=this;this.getTrackInfo(function(){d(c.trackInfo.position);c.eventHandlers.onTrackInfo&&c.eventHandlers.onTrackInfo(c.trackInfo)})};a.prototype.setTrackPosition=function(c){this.widget&&this.widget.setPosition(Math.floor(Math.min(this.widget.duration,c*1000)-2000))};a.prototype.embed=function(d){var c=this;if(!d||!d.trackId){return}this.embedVars=d=d||{};this.soundOptions.id=d.playerId=d.playerId||"mp3Player"+(new Date()).getTime();loader.loadJSON("https://api.spotify.com/v1/tracks/"+d.trackId,function(e){c.soundOptions.url=e.preview_url;c.trackInfo={};if(c.widget){c.pause();c.widget=null;delete c.widget}c.widget=soundManager.createSound(c.soundOptions);c.eventHandlers.onEmbedReady&&c.eventHandlers.onEmbedReady(c);c.eventHandlers.onTrackInfo&&c.getTrackInfo(c.eventHandlers.onTrackInfo);c.play()})};a.prototype.play=function(c){this.isReady&&this.embed({trackId:c})};a.prototype.resume=function(){this.isReady&&this.widget&&this.widget.resume()};a.prototype.pause=function(){try{this.isReady&&this.widget&&this.widget.pause()}catch(c){console.error("spotify error:",c,c.stack)}};a.prototype.stop=function(){this.widget&&this.widget.stop()};a.prototype.setVolume=function(c){if(this.widget&&this.widget.setVolume&&this.soundOptions){soundManager.setVolume(this.soundOptions.id,100*c)}};SpotifyPlayer.prototype=a.prototype;SpotifyPlayer.super_=a})();function VimeoPlayer(){return VimeoPlayer.super_.apply(this,arguments)}(function(){var f={onPlay:"onPlaying",onResume:"onPlaying",onPause:"onPaused",onFinish:"onEnded",onProgress:function(g,h){g.trackInfo.position=Number(h);g.eventHandlers.onTrackInfo&&g.eventHandlers.onTrackInfo(g.trackInfo)},getDuration:function(g,h){g.trackInfo.duration=Number(h)}},a=["play","pause","finish","playProgress"];function e(g){return Object.keys(g).map(function(h){return encodeURIComponent(h)+"="+encodeURIComponent(g[h])}).join("&")}function c(j){if(j.origin.indexOf("vimeo.com")==-1){return}try{var g=this,h={};j.data.split("&").map(function(k){var l=k.split("=");h[l[0]]=l[1]});h.params=(h.params||"").split(",");h.player_id=h.player_id||h.params.pop();if(h.player_id==this.embedVars.playerId){if(h.method=="onLoad"){a.map(this.post.bind(this,"addEventListener"));this.post("getDuration")}else{setTimeout(function(){var k=g.eventHandlers[f[h.method]]||f[h.method];if(typeof k=="function"){k.apply(g,[g].concat(h.params))}else{console.warn("vimeo missing handler for event",h.method)}})}}}catch(j){console.log("VimeoPlayer error",j,j.stack);this.eventHandlers.onError&&this.eventHandlers.onError(this,{source:"VimeoPlayer",exception:j})}}function b(j,g){var h=this;this.label="Vimeo";this.element=null;this.eventHandlers=j||{};this.embedVars=g||{};this.isReady=false;this.trackInfo={};if(window.addEventListener){window.addEventListener("message",c.bind(this),false)}else{window.attachEvent("onmessage",c.bind(this),false)}h.isReady=true;j.onApiReady&&j.onApiReady(h)}b.prototype.post=function(j,h){var g={method:j};if(h){g.value=h}try{return this.element.contentWindow.postMessage(JSON.stringify(g),this.element.src.split("?")[0])}catch(k){console.log(k)}};b.prototype.getEid=function(g){return/(vimeo\.com\/(clip\:|video\/)?|\/vi\/)(\d+)/.test(g)&&RegExp.lastParen};function d(h,g){loader.loadJSON("https://vimeo.com/api/v2/video/"+h+".json",function(j){g(!j||!j.map?null:{id:h,title:j[0].title,img:j[0].thumbnail_medium})})}b.prototype.fetchMetadata=function(h,g){var j=this.getEid(h);if(!j){return g()}d(j,g)};b.prototype.setTrackPosition=function(g){this.pause();this.post("seekTo",g);this.resume()};b.prototype.embed=function(h){this.embedVars=h=h||{};this.embedVars.playerId=this.embedVars.playerId||"viplayer";this.trackInfo={};this.element=document.createElement("iframe");var g={id:this.embedVars.playerId,width:this.embedVars.width||"200",height:this.embedVars.height||"200",frameborder:"0",webkitAllowFullScreen:true,mozallowfullscreen:true,allowScriptAccess:"always",allowFullScreen:true,src:"//player.vimeo.com/video/"+h.videoId+"?"+e({api:1,js_api:1,player_id:this.embedVars.playerId,title:0,byline:0,portrait:0,autoplay:1})};for(i in g){this.element.setAttribute(i,g[i])}this.embedVars.playerContainer.appendChild(this.element);if(this.eventHandlers.onEmbedReady){this.eventHandlers.onEmbedReady()}};b.prototype.play=function(g){if(g&&(!this.currentId||this.currentId!=g)){this.embedVars.videoId=g;this.embed(this.embedVars)}};b.prototype.resume=function(){this.post("play")};b.prototype.pause=function(){this.post("pause")};b.prototype.stop=function(){if(this.element){this.post("unload")}if((this.element||{}).parentNode){this.element.parentNode.removeChild(this.element)}if((this.otherElement||{}).parentNode){this.otherElement.parentNode.removeChild(this.otherElement)}};b.prototype.setVolume=function(g){this.post("setVolume",100*g)};VimeoPlayer.prototype=b.prototype;VimeoPlayer.super_=b})();window.$=window.$||function(){return window.$};$.show=$.show||function(){return $};$.attr=$.attr||function(){return $};$.getScript=$.getScript||function(b,a){loader.includeJS(b,a)};function YoutubePlayer(){return YoutubePlayer.super_.apply(this,arguments)}(function(){var h={0:"onEnded",1:"onPlaying",2:"onPaused"};var f="https://apis.google.com/js/client.js?onload=initYT",k=false,m="https://www.youtube.com/iframe_api",a={width:"200",height:"200",playerVars:{autoplay:1,version:3,enablejsapi:1,controls:0,modestbranding:1,showinfo:0,wmode:"opaque",iv_load_policy:3,allowscriptaccess:"always"}};var d=false,e="id,snippet",l;window.initYT=function(){gapi.client.setApiKey(YOUTUBE_API_KEY);gapi.client.load("youtube","v3",function(){d=true;if(l){l()}})};if(typeof YOUTUBE_API_KEY!=="undefined"){g()}function c(q,o){this.eventHandlers=q||{};this.embedVars=o||{};this.label="Youtube";this.isReady=false;this.trackInfo={};this.player={};var p=this;window.onYoutubeStateChange=function(s){if(s.data==YT.PlayerState.PLAYING){p.trackInfo.duration=p.player.getDuration()}var r=h[s.data];if(r&&p.eventHandlers[r]){p.eventHandlers[r](p)}};window.onYoutubeError=function(r){q.onError&&q.onError(p,{source:"YoutubePlayer",code:r})};window.onYouTubeIframeAPIReady=function(){p.player=new YT.Player(p.embedVars.playerId||"ytplayer",a);p.player.addEventListener("onStateChange","onYoutubeStateChange");p.player.addEventListener("onError","onYoutubeError");p.element=p.player.getIframe();p.player.addEventListener("onReady",function(r){p.safeClientCall("onEmbedReady");p.player.loadVideoById(p.embedVars.videoId)})};p.isReady=true;if(p.eventHandlers.onApiReady){p.eventHandlers.onApiReady(p)}}c.prototype.safeCall=function(q,s){try{var p=Array.apply(null,arguments).slice(1),o=(this.element||{})[q];o&&o.apply(this.element,p)}catch(r){console.error("YT safecall error",r,r.stack)}};c.prototype.safeClientCall=function(o,q){try{if(this.eventHandlers[o]){this.eventHandlers[o](q)}}catch(p){console.error("YT safeclientcall error",p.stack)}};c.prototype.embed=function(p){this.embedVars=p=p||{};this.embedVars.playerId=this.embedVars.playerId||"ytplayer";this.trackInfo={};this.element=document.createElement("div");this.element.id=this.embedVars.playerId;this.embedVars.playerContainer.appendChild(this.element);$(this.element).show();var o=document.createElement("script");o.src=m;document.body.appendChild(o)};c.prototype.getEid=function(o){if(/(youtube\.com\/(v\/|embed\/|(?:.*)?[\?\&]v=)|youtu\.be\/)([a-zA-Z0-9_\-]+)/.test(o)||/^\/yt\/([a-zA-Z0-9_\-]+)/.test(o)||/youtube\.com\/attribution_link\?.*v\%3D([^ \%]+)/.test(o)||/youtube.googleapis.com\/v\/([a-zA-Z0-9_\-]+)/.test(o)){return RegExp.lastParen}};function b(r,p,o){function s(t){setTimeout(function(){if(d){t()}else{s(t)}},200)}function q(u){var v=u.id.videoId;var t={id:v,eId:"/yt/"+v,img:u.snippet.thumbnails["default"].url,url:"https://www.youtube.com/watch?v="+u.id.videoId,title:u.snippet.title,playerLabel:"Youtube"};return t}if(!o){return}s(function(){gapi.client.youtube.search.list({part:"snippet",q:r,type:"video",maxResults:p}).execute(function(t){results=t.items.map(q);o(results)})})}c.prototype.searchTracks=function(q,p,o){b(q,p,o)};function j(p,o){b(p,1,function(q){o(q[0])})}c.prototype.fetchMetadata=function(p,o){var q=this.getEid(p);if(!q){return o()}else{j(q,o)}};function n(o){return/([a-zA-Z0-9_\-]+)/.test(o)&&RegExp.lastParen}c.prototype.play=function(o){o=n(o);if(!this.currentId||this.currentId!=o){this.embedVars.videoId=o;this.embed(this.embedVars)}};c.prototype.pause=function(){if(this.player&&this.player.pauseVideo){this.player.pauseVideo()}};c.prototype.resume=function(){if(this.player&&this.player.playVideo){this.player.playVideo()}};c.prototype.stop=function(){if(this.player&&this.player.stopVideo){this.player.stopVideo()}};c.prototype.getTrackPosition=function(o){if(o&&this.player&&this.player.getCurrentTime){o(this.player.getCurrentTime())}};c.prototype.setTrackPosition=function(o){if(this.player&&this.player.seekTo){this.player.seekTo(o)}};c.prototype.setVolume=function(o){if(this.player&&this.player.setVolume){this.player.setVolume(o*100)}};function g(){if(!k){$.getScript(f,function(){k=true})}}YoutubePlayer.prototype=c.prototype;YoutubePlayer.super_=c})();