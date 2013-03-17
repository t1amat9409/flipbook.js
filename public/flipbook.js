/* FlipBook v1.0.0-58 */
(function(){if(!this.flipbook){var t={},e={},n=function(e){var n=[],e=e||"";for(var o in t)0===o.indexOf(e)&&n.push(o);return n},o=function(s,a){var l,u=i(a,s),p=e[u];if(p)return p.exports;if(!(l=t[u]||t[u=i(u,"./index")]))throw"module '"+s+"' not found";p={id:u,exports:{}};try{e[u]=p;var c=function(t){return o(t,r(u))};return c.modules=n,l(p.exports,c,p),p.exports}catch(d){throw delete e[u],d}},i=function(t,e){var n,o,i=[];n=/^\.\.?(\/|$)/.test(e)?[t,e].join("/").split("/"):e.split("/");for(var r=0,s=n.length;s>r;r++)o=n[r],".."==o?i.pop():"."!=o&&""!=o&&i.push(o);return i.join("/")},r=function(t){return t.split("/").slice(0,-1).join("/")};this.flipbook=function(t){return o(t,"")},this.flipbook.define=function(e){for(var n in e)t[n]=e[n]},this.flipbook.modules=n}return this.flipbook.define}).call(this)({"cog/events":function(t,e,n){var o,i=[].slice;o=function(){function t(){}return t.mixin=function(){var t,e,n,o,r,s,a;for(o=arguments.length>=1?i.call(arguments,0):[],r=0,s=o.length;s>r;r++){n=o[r],a=this.prototype;for(e in a)t=a[e],n[e]=t}return this},t.prototype.emit=function(){var t,e,n,o,r,s,a;if(e=arguments[0],t=arguments.length>=2?i.call(arguments,1):[],!(null!=(s=this._events)?s[e]:void 0))return!1;for(a=this._events[e],o=0,r=a.length;r>o;o++)n=a[o],n.apply(null,t);return!0},t.prototype.trigger=t.prototype.emit,t.prototype.fire=t.prototype.emit,t.prototype.addListener=function(t,e){var n,o,i;return this.emit("newListener",t,e),(null!=(o=(n=null!=(i=this._events)?i:this._events={})[t])?o:n[t]=[]).push(e),this},t.prototype.on=t.prototype.addListener,t.prototype.once=function(t,e){var n,o=this;return n=function(){return o.removeListener(t,n),e.apply(null,arguments)},this.on(t,n),this},t.prototype.removeListener=function(t,e){var n,o;return(null!=(o=this._events)?o[t]:void 0)?(this._events[t]=function(){var o,i,r,s;for(r=this._events[t],s=[],o=0,i=r.length;i>o;o++)n=r[o],n!==e&&s.push(n);return s}.call(this),this):this},t.prototype.off=t.prototype.removeListener,t.prototype.removeAllListeners=function(t){return null!=this._events&&delete this._events[t],this},t.prototype.listeners=function(t){var e;return(null!=(e=this._events)?e[t]:void 0)?this.events[t]:[]},t.prototype.listenTo=function(t,e,n){var o,i,r,s,a;return null==t||null==e||null==n?this:(o=null!=(r=t._emitterId)?r:t._emitterId=uid(),null==(s=(i=null!=(a=this._emitterBindings)?a:this._emitterBindings={})[o])&&(i[o]=[]),this._emitterBindings[o].push({target:t,message:e,action:n}),t.on(e,n),this)},t.prototype.stopListening=function(t,e,n){var o,i,r,s,a,l,u,p,c,d,f,h;if(null==this._emitterBindings)return this;if(null===t){h=this._emitterBindings;for(s in h)i=h[s],u=i.target,a=i.message,o=i.action,u.off(a,o);this._emitterBindings={}}else{if(r=this._emitterBindings[t._emitterId],null==i)return this;if(l=[],null===e)for(;i=r.pop();)u=i.target,a=i.message,o=i.action,u.off(a,o);else if(null===n)for(p=0,d=r.length;d>p;p++)i=r[p],i.message===e&&(u=i.target,a=i.message,o=i.action,u.off(a,o),l.push(i));else for(c=0,f=r.length;f>c;c++)i=r[c],i.message===e&&i.action===n&&(u=i.target,a=i.message,o=i.action,u.off(a,o),l.push(i));l.length>0&&(this._emitterBindings[t._emitterId]=arrayWithout(r,l))}return this},t}(),n.exports=o},"cog/view":function(t,e,n){var o,i,r;i=e("./events"),r=e("util/uid"),o=function(){function t(t){var e;this.options=null!=t?t:{},this.id=r("view-"),this.model=null!=(e=this.options.model)?e:{},this._createElem(),this.assignEvents(),"function"==typeof this.initialize&&this.initialize()}return i.mixin(t,t.prototype),t.prototype.tagName="div",t.prototype.className="view",t.prototype.template=null,t.prototype.events={},t.prototype.outlets={},t.prototype._createElem=function(){return this.elem=null!=this.options.elem?$(this.options.elem):$("<"+this.tagName+" class='"+this.className+"'></"+this.tagName+">")},t.prototype.assignEvents=function(){var t,e,n,o,i;i=this.events;for(n in i)t=i[n],e=n.split(" "),e.length>1?(n=e.shift(),o=e.join(" "),this.elem.on(n,o,this[t])):this.elem.on(n,this[t]);return this},t.prototype.unassignEvents=function(){var t,e,n,o,i;i=this.events;for(n in i)t=i[n],e=n.split(" "),e.length>1?(n=e.shift(),o=e.join(" "),this.elem.off(n,o,this[t])):this.elem.off(n,this[t]);return this},t.prototype.assignOutlets=function(){var t,e,n;this.ui={},n=this.outlets;for(t in n)e=n[t],this.ui[t]=this.elem.find(e),this[t]=this.elem.find(e);return this},t.prototype.unassignOutlets=function(){var t,e,n;n=this.ui;for(e in n)t=n[e],delete this.ui[e],delete this[e];return this},t.prototype.dispose=function(){return this.unassignEvents(),this.unassignOutlets(),this},t.prototype.close=function(){return"function"==typeof this.beforeClose&&this.beforeClose(),this.dispose(),this.elem.remove(),"function"==typeof this.onClose&&this.onClose(),this},t.prototype.getData=function(){var t,e;return null!=(e="function"==typeof(t=this.model).toJSON?t.toJSON():void 0)?e:this.model},t.prototype.appendTo=function(t){return this.render(),t.append(this.elem),"function"==typeof this.onDomActive?this.onDomActive():void 0},t.prototype.addView=function(){},t.prototype.replaceView=t.prototype.addView,t.prototype.appendView=function(){},t.prototype.render=function(){var t,e;return"function"==typeof this.beforeRender&&this.beforeRender(),this.fire("before:render",this),t=this.getData(),e=this.template(t),this.elem.html(e),this.assignOutlets(),this.fire("render",this),"function"==typeof this.onRender&&this.onRender(),this},t}(),n.exports=o},env:function(t,e,n){n.exports={version:e("version"),debug:!0,test:!1,mobile:null!=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)}},main:function(t,e){var n,o,i,r,s,a,l,u;i=e("env"),a=e("util/log").prefix("main:"),o=e("util/ensure"),l=e("scanner"),u=e("validator"),n=e("viewer/controller"),e("theme").activate(),r=function(){return i.mobile?(a.info("It's hammer time."),o.libs.hammer()):(a.info("Please hammer, dont' hurt 'em."),null)},o("jquery",r,function(t){if(null!=t)throw t;return $(s)}),s=function(){var t,e,o,r,s,p,c,d;for(i.debug&&a.level(2),a.info("FlipBook v"+i.version),a.info("ENV",i),a.info("Ready."),t=l.run(),s=0,p=t.length;p>s;s++)c=t[s],e=c.item,o=c.model,u(o)?(r=new n({model:o}),r.appendTo($(e).empty())):a.info("! Invalid model:",u.errors(),o);return null!=(d=$(".flipbook").get(0))?d.focus():void 0},i.debug&&i.mobile&&o("firebug",function(){return window.onerror=function(t){return a.info("ERROR!",t)}})},scanner:function(t,e,n){var o,i,r;i=e("util/log").prefix("scanner:"),r=[],n.exports=o={define:function(t){return r.push(t),this},run:function(){var t,e,n,o,i,s,a,l;for(e=[],o=0,s=r.length;s>o;o++)for(n=r[o],l=n(),i=0,a=l.length;a>i;i++)t=l[i],e.push(t);return e}},o.define(function(){var t;return t=[],$("[data-flipbook]").each(function(e,n){var o,i,r,s,a,l,u,p,c;for(o=$(n).data("flipbook"),r={},c=o.split(","),u=0,p=c.length;p>u;u++)a=c[u],s=a.split(":"),i=s.shift(),l=s.join(":"),r[$.trim(i)]=$.trim(l);return t.push({item:n,model:r})}),t}),o.define(function(){var t;return t=[],$("[data-flipbook-pages]").each(function(e,n){var o,i,r,s,a,l,u,p;for(e=$(n),i={},l=n.attributes,s=0,a=l.length;a>s;s++)o=l[s],r=(null!=(u=o.name)?u:o.nodeName)+"",0===r.indexOf("data-flipbook-")&&(r=r.replace("data-flipbook-",""),i[r]=null!=(p=o.value)?p:o.nodeValue);return t.push({item:n,model:i})}),t})},theme:function(t,e,n){var o=null,i='.flipbook div,\n.flipbook span,\n.flipbook object,\n.flipbook iframe,\n.flipbook h1,\n.flipbook h2,\n.flipbook h3,\n.flipbook h4,\n.flipbook h5,\n.flipbook h6,\n.flipbook p,\n.flipbook pre,\n.flipbook a,\n.flipbook abbr,\n.flipbook acronym,\n.flipbook address,\n.flipbook code,\n.flipbook del,\n.flipbook dfn,\n.flipbook em,\n.flipbook img,\n.flipbook dl,\n.flipbook dt,\n.flipbook dd,\n.flipbook ol,\n.flipbook ul,\n.flipbook li,\n.flipbook fieldset,\n.flipbook form,\n.flipbook label,\n.flipbook legend,\n.flipbook caption,\n.flipbook tbody,\n.flipbook tfoot,\n.flipbook thead,\n.flipbook tr {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  outline: 0;\n  font-weight: inherit;\n  font-style: inherit;\n  font-family: inherit;\n  font-size: 100%;\n  vertical-align: baseline;\n}\n.flipbook table {\n  border-collapse: separate;\n  border-spacing: 0;\n  vertical-align: middle;\n}\n.flipbook caption,\n.flipbook th,\n.flipbook td {\n  text-align: left;\n  font-weight: normal;\n  vertical-align: middle;\n}\n.flipbook a img {\n  border: none;\n}\n.flipbook {\n  font-family: "Helvetica Neue", Helvetica, Sans-Serif;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  width: 100%;\n  max-width: 100%;\n  cursor: default;\n  color: #555;\n}\n.flipbook:focus {\n  outline: 0;\n  border: 0;\n  color: #000;\n/*  \n    &.inactive\n      header, footer\n        opacity: 0.5\n    */\n}\n.flipbook header {\n  background: #c0c0c0;\n  -webkit-border-top-left-radius: 4px;\n  border-top-left-radius: 4px;\n  -webkit-border-top-right-radius: 4px;\n  border-top-right-radius: 4px;\n  margin: 0 4px;\n  padding: 5px;\n  z-index: 5;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n}\n.flipbook .screen-stack {\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  max-width: 100%;\n  -webkit-box-shadow: 0px 2px 9px #777;\n  box-shadow: 0px 2px 9px #777;\n  z-index: 10;\n}\n.flipbook .screen-stack .errors {\n  padding: 25px;\n  text-align: center;\n}\n.flipbook .screen-stack .screen {\n  position: absolute;\n  top: 0;\n  left: 0;\n  max-width: 100%;\n}\n.flipbook .screen-stack .screen img {\n  max-width: 100%;\n}\n.flipbook .screen-stack .screen.the-end {\n  display: none;\n  height: 100%;\n  background: rgba(0,0,0,0.7);\n  color: #fff;\n  width: 100%;\n  position: relative;\n  text-align: center;\n}\n.flipbook .screen-stack .screen.the-end .container {\n  display: table;\n  width: 100%;\n  height: 100%;\n}\n.flipbook .screen-stack .screen.the-end .body {\n  display: table-cell;\n  vertical-align: middle;\n  text-align: center;\n}\n.flipbook .screen-stack .screen.the-end .restart {\n  display: inline-block;\n  border: 3px dotted #fff;\n  -webkit-border-radius: 15px;\n  border-radius: 15px;\n  cursor: pointer;\n}\n.flipbook .screen-stack .screen.the-end .restart .icon {\n  text-align: center;\n  font-size: 75px;\n  display: block;\n  cursor: pointer;\n}\n.flipbook .screen-stack .screen.the-end .restart label {\n  text-align: center;\n  display: block;\n  font-size: 90%;\n  margin: 15px;\n  cursor: pointer;\n}\n.flipbook footer {\n  background: #ccc;\n  margin: 0 4px;\n  text-align: center;\n  z-index: 5;\n/*height: 44px */\n}\n.flipbook footer.copyright {\n  background: #bbb;\n  border-bottom: 1px solid #ddd;\n  font-size: 75%;\n  padding: 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n  text-overflow: ellipsis;\n}\n.flipbook footer.pager {\n  position: relative;\n  -webkit-border-bottom-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n  -webkit-border-bottom-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n  padding: 3px;\n  height: 28px;\n  line-height: 28px;\n}\n.flipbook footer.pager .progress {\n  display: block;\n  height: 28px;\n  margin: 0 33px;\n  position: relative;\n}\n.flipbook footer.pager .progress.errors .bar.background {\n  visibility: hidden;\n}\n.flipbook footer.pager .progress .bar {\n  -webkit-border-top-left-radius: 6px;\n  border-top-left-radius: 6px;\n  -webkit-border-bottom-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n  position: absolute;\n  height: 14px;\n  top: 7px;\n  overflow: hidden;\n}\n.flipbook footer.pager .progress .bar.done {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  width: 100%;\n}\n.flipbook footer.pager .progress .bar.background {\n  -webkit-border-radius: 6px;\n  border-radius: 6px;\n  background: #aaa;\n  width: 100%;\n}\n.flipbook footer.pager .progress .bar.loading {\n  background-color: #bbb;\n  width: 1%;\n  height: 10px;\n  top: 9px;\n}\n.flipbook footer.pager .progress .bar.location {\n  background-color: #ddd;\n  background-color: #ccc;\n  width: 0%;\n  height: 12px;\n  top: 8px;\n}\n.flipbook footer.pager .button {\n  width: 30px;\n  height: 28px;\n  overflow: hidden;\n  cursor: pointer;\n  font-size: 135%;\n  -webkit-border-radius: 4px;\n  border-radius: 4px;\n}\n.flipbook footer.pager .button.nextPage {\n  position: absolute;\n  top: 3px;\n  right: 3px;\n}\n.flipbook footer.pager .button.prevPage {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n}\n.flipbook footer.pager .button.disabled {\n  opacity: 0.3;\n  filter: alpha(opacity=30);\n  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";\n  cursor: default;\n}\n.flipbook.isDesktop .button:hover {\n  background: #fff;\n}\n.flipbook.isDesktop .button.disabled:hover {\n  background: none;\n}\n';n.exports={content:i,isActive:function(){return null!=o},activate:function(t){return null==o?(t=t||document.getElementsByTagName("HEAD")[0]||document.body||document,o=document.createElement("style"),o.innerHTML=i,t.appendChild(o),this):void 0},deactivate:function(){return null!=o&&(o.parentNode.removeChild(o),o=null),this}}},"util/ensure":function(t,e,n){var o,i,r,s,a=[].slice;o={angular:function(){return"undefined"!=typeof angular&&null!==angular?angular:"//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"},backbone:function(){return"undefined"!=typeof Backbone&&null!==Backbone?Backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js"},fastclick:function(){return"undefined"!=typeof FastClick&&null!==FastClick?FastClick:"//cdnjs.cloudflare.com/ajax/libs/fastclick/0.6.0/fastclick.min.js"},firebug:function(){return"undefined"!=typeof FBL&&null!==FBL?FBL:"https://getfirebug.com/releases/lite/1.4/firebug-lite.js"},hammer:function(){return"undefined"!=typeof Hammer&&null!==Hammer?Hammer:"https://raw.github.com/EightMedia/hammer.js/v1.0.3/dist/hammer.min.js"},jquery:function(){return"undefined"!=typeof jQuery&&null!==jQuery?jQuery:"//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"},jqueryui:function(){var t;return null!=(t="undefined"!=typeof jQuery&&null!==jQuery?jQuery.Widget:void 0)?t:"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"},underscore:function(){return"undefined"!=typeof _&&null!==_?_:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"},webfont:function(){return"undefined"!=typeof WebFont&&null!==WebFont?WebFont:"//ajax.googleapis.com/ajax/libs/webfont/1.1.2/webfont.js"},zepto:function(){return"undefined"!=typeof Zepto&&null!==Zepto?Zepto:"//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"}},s="file:"===location.protocol?"http:":"",i=function(t,e){var n,i,a,l;return i=null!=(a=null!=(l="function"==typeof t?t():void 0)?l:"function"==typeof o[t]?o[t]():void 0)?a:null,"string"!=typeof i?e(null):(n=document.createElement("script"),n.type="text/javascript",r.defer&&(n.defer=!0),r.async&&(n.async=!0),n.onload=function(){return e(null)},n.onerror=function(){return e(Error("Could not load external resource: "+t+" from "+i))},n.src="/"===i[0]?""+s+i:i,n.onreadystatechange=function(){return"loaded"===n.readyState||"complete"===n.readyState?(n.onreadystatechange=null,e(null)):void 0},document.getElementsByTagName("HTML")[0].appendChild(n),n)},r=function(){var t,e,n,o;return e=arguments.length>=1?a.call(arguments,0):[],t="function"==typeof e.slice(-1)[0]?e.pop():function(t){if(null!=t)throw t;return"undefined"!=typeof console&&null!==console?"function"==typeof console.log?console.log("Library loading complete."):void 0:void 0},o=e.shift(),n=function(r){return null!=r?t(r):0===e.length?t(null):(o=e.shift(),i(o,n))},i(o,n),null},r.async=!0,r.defer=!1,r.libs=o,n!==void 0&&null!==n?n.exports=r:this.ensure=r},"util/log":function(t,e,n){var o,i,r,s,a,l,u,p,c;l=1,o=function(){return"undefined"!=typeof console&&null!==console?function(t){return console.log.apply(console,t)}:function(){}}(),a=function(t){return null!=t&&(l=function(){switch(t){case-1:case"none":case"n":return-1;case 0:case"quiet":case"1":return 0;case 1:case"info":case"i":return 1;case 2:case"debug":case"d":return 2;default:return l}}()),l},p=function(){return 0>l?void 0:o(arguments)},s=function(){return 1>l?void 0:o(arguments)},i=function(){return 2>l?void 0:o(arguments)},r=function(){var t,e;return e=Error(),null!=e.stack&&(t=e.stack.split("\n"),"undefined"!=typeof console&&null!==console&&"function"==typeof console.error&&console.error("Error",t[2].trim())),o(arguments)},c=Array.prototype.slice,u=function(t){return{level:a,say:function(){var e;if(!(0>l))return(e=c.call(arguments)).unshift(t),p.apply(p,e)},info:function(){var e;if(!(1>l))return(e=c.call(arguments)).unshift(t),s.apply(s,e)},debug:function(){var e;if(!(2>l))return(e=c.call(arguments)).unshift(t),i.apply(i,e)},error:function(){var e;return(e=c.call(arguments)).unshift(t),r.apply(r,e)}}},n.exports={level:a,info:s,debug:i,error:r,say:p,prefix:u},Function.prototype.bind&&console&&"object"==typeof console.log&&["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(t){console[t]=this.bind(console[t],console)},Function.prototype.call)},"util/number/pad":function(t,e,n){var o;n.exports=o=function(t,e){var n;for(n=""+t;e>n.length;)n="0"+n;return n}},"util/uid":function(t,e,n){var o;o=1,n.exports=function(t){return null==t&&(t=""),t+ ++o}},validator:function(t,e,n){var o,i,r,s;r=e("util/log").prefix("validator:"),o=[],i=function(t){return"string"==typeof t.pages&&(t.pages=parseInt(t.pages,10)),t.start=null!=t.start?"string"==typeof t.start?parseInt(t.start,10):void 0:1},n.exports=s=function(t){return o=[],null==t.path&&o.push("path is missing"),null==t.pages&&o.push("pages is missing"),0===o.length?(i(t),!0):!1},s.errors=function(){return o.join(", ")}},version:function(t,e,n){n.exports="1.0.0-58"},"viewer/controller":function(t,e,n){var o,i,r,s,a,l,u,p,c,d,f,h,g,b={}.hasOwnProperty,m=function(t,e){function n(){this.constructor=t}for(var o in e)b.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},v=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1};s=e("env"),g=e("util/uid"),d=e("util/number/pad"),p=e("util/log").prefix("controller:"),a=e("cog/events"),f=e("./preloader"),o=e("cog/view"),l=function(t){var e;return null!=t.offsetX?t.offsetX:(e=$(t.target).offset(),null!=t.gesture?t.gesture.center.pageX-e.left:t.pageX-e.left)},u={ready:!1,init:function(){return this.ready||s.mobile?void 0:($(document).on("keydown",this.onKeyInput),this.ready=!0)},onKeyInput:function(t){return null!=i.active?i.active.onKeyInput(t):void 0}},r=function(t,e){return t=t.replace("####",d(e,4)),t=t.replace("###",d(e,3)),t=t.replace("##",d(e,2)),t=t.replace("#",e)},c=[39,32],h=[37],i=function(t){function n(){var t=this;return this.onLoadError=function(){return n.prototype.onLoadError.apply(t,arguments)},this.onLoad=function(){return n.prototype.onLoad.apply(t,arguments)},this.prevPage=function(){return n.prototype.prevPage.apply(t,arguments)},this.nextPage=function(){return n.prototype.nextPage.apply(t,arguments)},this.didBlur=function(){return n.prototype.didBlur.apply(t,arguments)},this.didFocus=function(){return n.prototype.didFocus.apply(t,arguments)},this.didDragScrubber=function(){return n.prototype.didDragScrubber.apply(t,arguments)},this.stopScrubbing=function(){return n.prototype.stopScrubbing.apply(t,arguments)},this.startScrubbing=function(){return n.prototype.startScrubbing.apply(t,arguments)},this.didTapScrubber=function(){return n.prototype.didTapScrubber.apply(t,arguments)},this.didTap=function(){return n.prototype.didTap.apply(t,arguments)},this.navigateTo=function(){return n.prototype.navigateTo.apply(t,arguments)},this.onKeyInput=function(){return n.prototype.onKeyInput.apply(t,arguments)},n.__super__.constructor.apply(this,arguments)}return m(n,t),n.active=null,n.prototype.className="flipbook",n.prototype.template=e("./template"),n.prototype.outlets={stack:".screen-stack",nextBtn:".nextPage",prevBtn:".prevPage",restartBtn:".restart",progressBar:".progress",locationBar:".progress .location",loadingBar:".progress .loading"},n.prototype.initialize=function(){return this.screenCount=this.model.pages,this.current=0,this.ready=!1,this.active=!1,this.atEnd=!1,this.elem.attr("tabindex",-1),this.elem.addClass("inactive"),s.mobile?this.elem.addClass("isMobile"):this.elem.addClass("isDesktop"),u.init()},n.prototype.onKeyInput=function(t){var e,n;if(this.ready&&this.active)return e=t.which,v.call(c,e)>=0?(this.atEnd||this.nextPage(t),!1):(n=t.which,v.call(h,n)>=0?(this.prevPage(t),!1):void 0)},n.prototype.navigateTo=function(t){return t===this.current||0>t||t===this.screenCount?void 0:(this.atEnd&&(this.stack.find(".the-end").hide(),this.atEnd=!1,this.nextBtn.toggleClass("disabled",this.atEnd)),this.hideCurrent(),this.current=t,this.showCurrent())},n.prototype.didTap=function(t){var e;if(!this.atEnd)return null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),null!=t&&"function"==typeof t.stopPropagation&&t.stopPropagation(),e=l(t),this.imageW/2>e?this.prevPage():this.nextPage(),!1},n.prototype.didTapScrubber=function(t){var e,n,o;return null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),null!=t&&"function"==typeof t.stopPropagation&&t.stopPropagation(),o=l(t),e=o/this.progressWidth,n=Math.floor(e*this.screenCount),n===this.screenCount&&(n=this.screenCount-1),this.navigateTo(n)},n.prototype.startScrubbing=function(t){return this.ready?(this.progressBar.on("mousemove",this.didTapScrubber),$(document).on("mouseup",this.stopScrubbing),this.didTapScrubber(t)):void 0},n.prototype.stopScrubbing=function(t){return this.progressBar.off("mousemove",this.didTapScrubber),$(document).off("mouseup",this.stopScrubbing),this.didTapScrubber(t)},n.prototype.didDragScrubber=function(t){return this.didTapScrubber(t)},n.prototype.didFocus=function(){return this.active=!0,this.elem.removeClass("inactive").addClass("active"),n.active=this},n.prototype.didBlur=function(){return this.active=!1,this.elem.removeClass("active").addClass("inactive"),n.active===this?n.active=null:void 0},n.prototype.nextPage=function(t){return null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),this.ready?this.current===this.screenCount-1?(this.atEnd?(this.hideCurrent(),this.current=0,this.atEnd=!1,this.stack.find(".the-end").hide(),this.showCurrent()):(this.stack.find(".the-end").show(),this.atEnd=!0,this.nextBtn.toggleClass("disabled",this.atEnd)),null!=t&&"function"==typeof t.stopPropagation&&t.stopPropagation(),!1):(this.hideCurrent(),this.current+=1,this.showCurrent()):void 0},n.prototype.prevPage=function(t){if(null!=t&&"function"==typeof t.preventDefault&&t.preventDefault(),this.ready){if(this.atEnd)return this.stack.find(".the-end").hide(),this.atEnd=!1,this.nextBtn.toggleClass("disabled",this.atEnd),void 0;if(0!==this.current)return this.hideCurrent(),this.current-=1,this.showCurrent()}},n.prototype.onLoad=function(){var t;return this.nextBtn.removeClass("disabled"),this.loadingBar.addClass("done"),this.locationBar.show(),this.showCurrent(),this.imageH=t=this.stack.show().find("img").height(),this.imageW=this.stack.find("img").width(),this.progressWidth=this.progressBar.width(),this.stack.find(".screen").hide(),this.showCurrent(),this.elem.css({width:this.imageW}),this.stack.css({opacity:0}).animate({height:t,opacity:1}),this.ready=!0},n.prototype.onLoadError=function(t){var e;return p.info("ERROR Loading image",t.target),this.progressBar.addClass("errors"),this.loadingBar.hide(),this.stack.find("img").remove(),e=$("<div class='errors'>There were errors loading the images, please refresh your browser!</div>").hide(),this.stack.append(e).show(),e.slideDown()},n.prototype.showCurrent=function(){var t;return $(this.stack.find(".screen").get(this.current)).show(),t=Math.ceil(100*((this.current+1)/this.screenCount)),this.locationBar.width(""+t+"%"),this.locationBar.toggleClass("done",t>=100),this.prevBtn.toggleClass("disabled",0===this.current),this.nextBtn.toggleClass("disabled",this.atEnd)},n.prototype.hideCurrent=function(){return $(this.stack.find(".screen").get(this.current)).hide()},n.prototype.getData=function(){var t,e,n,o,i,s,a;for(i=[],e=this.model.start,s=this.model.start+(this.screenCount-1),n=a=e;s>=e?s>=a:a>=s;n=s>=e?++a:--a)o={src:r(this.model.path,n)},i.push(o);return t=this.model,t.screens=i,t.id=this.id,t},n.prototype.onRender=function(){var t=this;return f(this.elem).onError(this.onLoadError).onLoad(this.onLoad).onProgress(function(e){return t.loadingBar.width(""+e+"%"),e>=100?t.loadingBar.addClass("done"):void 0}).start(),this.nextBtn.addClass("disabled"),this.prevBtn.addClass("disabled"),this.locationBar.hide(),this.progressWidth=this.progressBar.width(),this.elem.on("focus",this.didFocus).on("blur",this.didBlur),s.mobile?(Hammer(this.stack.get(0),{prevent_default:!0}).on("swipeleft",this.nextPage).on("swiperight",this.prevPage).on("tap",this.didTap),Hammer(this.nextBtn.get(0),{prevent_default:!0}).on("tap",this.nextPage),Hammer(this.prevBtn.get(0),{prevent_default:!0}).on("tap",this.prevPage),Hammer(this.restartBtn.get(0),{prevent_default:!0}).on("tap",this.nextPage),Hammer(this.progressBar.get(0),{prevent_default:!0}).on("tap",this.didTapScrubber).on("drag",this.didTapScrubber)):this.elem.on("click",".nextPage",this.nextPage).on("click",".restart",this.nextPage).on("click",".prevPage",this.prevPage).on("click",".screen",this.didTap).on("mousedown",".progress",this.startScrubbing)},n.prototype.onDomActive=function(){return this.options.autofocus?this.elem.focus():void 0},n}(o),n.exports=i},"viewer/preloader":function(t,e,n){var o,i;i=e("util/log").prefix("preloader:"),o=function(){function t(e){var n=this;this.didError=function(){return t.prototype.didError.apply(n,arguments)},this.didLoad=function(){return t.prototype.didLoad.apply(n,arguments)},this.elem=$(e)}return t.prototype.onError=function(t){return this.errorCallback=t,this},t.prototype.onProgress=function(t){return this.progressCallback=t,this},t.prototype.onLoad=function(t){return this.loadCallback=t,this},t.prototype.start=function(){var t;return t=this.elem.find("img"),this.total=t.length,this.count=0,t.on("error",this.didError).on("load",this.didLoad),this},t.prototype.didLoad=function(t){var e;return this.count+=1,e=Math.floor(100*(this.count/this.total)),"function"==typeof this.progressCallback&&this.progressCallback(e),this.count===this.total?("function"==typeof this.progressCallback&&this.progressCallback(100),this.elem.find("img").off(),delete this.elem,"function"==typeof this.loadCallback?this.loadCallback(t):void 0):void 0},t.prototype.didError=function(t){return"function"==typeof this.progressCallback&&this.progressCallback(100),this.elem.find("img").off(),delete this.elem,"function"==typeof this.errorCallback?this.errorCallback(t):void 0},t}(),n.exports=function(t){return new o(t)}},"viewer/template":function(t,e,n){n.exports=function(t){t||(t={});var e,n=[],o=function(t){return t&&t.ecoSafe?t:t!==void 0&&null!=t?r(t):""},i=t.safe,r=t.escape;return e=t.safe=function(t){if(t&&t.ecoSafe)return t;(void 0===t||null==t)&&(t="");var e=new String(t);return e.ecoSafe=!0,e},r||(r=t.escape=function(t){return(""+t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var t,e,i,r,s;for(n.push("<header><span>"),n.push(o(this.title)),n.push('</span></header>\n<div class="screen-stack">'),s=this.screens,t=i=0,r=s.length;r>i;t=++i)e=s[t],n.push(' \n<div class="screen"><img src="'),n.push(o(e.src)),n.push('"/></div> \n');n.push(' \n  <div class="screen the-end">\n    <div class="container">\n      <div class="body">\n        <div class="restart">\n          <span class="icon">&#8634;</span>\n          <label>Restart from<br/>beginning.</label>\n        </div>    \n      </div>\n    </div>\n  </div>\n</div> \n'),null!=this.copyright&&(n.push(' \n<footer class="copyright" title="'),n.push(o(this.copyright)),n.push('"><span>'),n.push(o(this.copyright)),n.push("</span></footer> \n")),n.push(' \n<footer class="pager"> \n<div class="prevPage button"><span>&lsaquo;</span></div> \n<div class="progress">\n  <div class="bar background"><span>&nbsp;</span></div>\n  <div class="bar loading done"><span>&nbsp;</span></div>\n  <div class="bar location"><span>&nbsp;</span></div>\n</div> \n<div class="nextPage button"><span>&rsaquo;</span></div> \n</footer>')}).call(this)}.call(t),t.safe=i,t.escape=r,n.join("")}}}),flipbook("main");