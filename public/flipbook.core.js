/* FlipBook v1.0.0-107 */
(function(){if(!this.flipbook){var e={},t={},n=function(t){var n=[],t=t||"";for(var o in e)0===o.indexOf(t)&&n.push(o);return n},o=function(s,a){var l,u=r(a,s),c=t[u];if(c)return c.exports;if(!(l=e[u]||e[u=r(u,"./index")]))throw"module '"+s+"' not found";c={id:u,exports:{}};try{t[u]=c;var p=function(e){return o(e,i(u))};return p.modules=n,l(c.exports,p,c),c.exports}catch(d){throw delete t[u],d}},r=function(e,t){var n,o,r=[];n=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var i=0,s=n.length;s>i;i++)o=n[i],".."==o?r.pop():"."!=o&&""!=o&&r.push(o);return r.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")};this.flipbook=function(e){return o(e,"")},this.flipbook.define=function(t){for(var n in t)e[n]=t[n]},this.flipbook.modules=n}return this.flipbook.define}).call(this)({"cog/events":function(e,t,n){var o,r=[].slice;o=function(){function e(){}return e.mixin=function(){var e,t,n,o,i,s,a;for(o=arguments.length>=1?r.call(arguments,0):[],i=0,s=o.length;s>i;i++){n=o[i],a=this.prototype;for(t in a)e=a[t],n[t]=e}return this},e.prototype.emit=function(){var e,t,n,o,i,s,a;if(t=arguments[0],e=arguments.length>=2?r.call(arguments,1):[],!(null!=(s=this._events)?s[t]:void 0))return!1;for(a=this._events[t],o=0,i=a.length;i>o;o++)n=a[o],n.apply(null,e);return!0},e.prototype.trigger=e.prototype.emit,e.prototype.fire=e.prototype.emit,e.prototype.addListener=function(e,t){var n,o,r;return this.emit("newListener",e,t),(null!=(o=(n=null!=(r=this._events)?r:this._events={})[e])?o:n[e]=[]).push(t),this},e.prototype.on=e.prototype.addListener,e.prototype.once=function(e,t){var n,o=this;return n=function(){return o.removeListener(e,n),t.apply(null,arguments)},this.on(e,n),this},e.prototype.removeListener=function(e,t){var n,o;return(null!=(o=this._events)?o[e]:void 0)?(this._events[e]=function(){var o,r,i,s;for(i=this._events[e],s=[],o=0,r=i.length;r>o;o++)n=i[o],n!==t&&s.push(n);return s}.call(this),this):this},e.prototype.off=e.prototype.removeListener,e.prototype.removeAllListeners=function(e){return null!=this._events&&delete this._events[e],this},e.prototype.listeners=function(e){var t;return(null!=(t=this._events)?t[e]:void 0)?this.events[e]:[]},e.prototype.listenTo=function(e,t,n){var o,r,i,s,a;return null==e||null==t||null==n?this:(o=null!=(i=e._emitterId)?i:e._emitterId=uid(),null==(s=(r=null!=(a=this._emitterBindings)?a:this._emitterBindings={})[o])&&(r[o]=[]),this._emitterBindings[o].push({target:e,message:t,action:n}),e.on(t,n),this)},e.prototype.stopListening=function(e,t,n){var o,r,i,s,a,l,u,c,p,d,f,h;if(null==this._emitterBindings)return this;if(null===e){h=this._emitterBindings;for(s in h)r=h[s],u=r.target,a=r.message,o=r.action,u.off(a,o);this._emitterBindings={}}else{if(i=this._emitterBindings[e._emitterId],null==r)return this;if(l=[],null===t)for(;r=i.pop();)u=r.target,a=r.message,o=r.action,u.off(a,o);else if(null===n)for(c=0,d=i.length;d>c;c++)r=i[c],r.message===t&&(u=r.target,a=r.message,o=r.action,u.off(a,o),l.push(r));else for(p=0,f=i.length;f>p;p++)r=i[p],r.message===t&&r.action===n&&(u=r.target,a=r.message,o=r.action,u.off(a,o),l.push(r));l.length>0&&(this._emitterBindings[e._emitterId]=arrayWithout(i,l))}return this},e}(),n.exports=o},"cog/object":function(e,t,n){var o,r,i;r=t("./events"),i=t("util/extend"),o=function(){function e(e){null==e&&(e={}),i(this,e)}return r.mixin(e.prototype),e.prototype.get=function(e,t){var n;return null!=(n=this[e])?n:t},e.prototype.toggle=function(e,t){return"boolean"==typeof t?this.set(e,t):this.set(e,!this.get(e)),this},e.prototype.set=function(e,t){var n,o,r,i,s;if(n={},o=!1,"string"==typeof e)this[e]!==t&&(i=this[e],this[e]=t,n[e]=[t,i],o=!0,this.fire("change:"+e,t,i,this));else for(r in e)s=e[r],this[r]!==s&&(i=this[r],this[r]=s,n[r]=[s,i],o=!0,this.fire("change:"+r,s,i,this));return o&&this.fire("change",n,this),this},e}(),n.exports=o},"cog/view":function(e,t,n){var o,r,i;r=t("./events"),i=t("util/uid"),o=function(){function e(e){var t,n,o,r;this.options=null!=e?e:{},t=null!=(n=null!=(o=this.constructor.name)?o:this.constructor.displayName)?n:"view",this.id=i(""+t+"-"),this.model=null!=(r=this.options.model)?r:{},this._createElem(),this.assignEvents(),"function"==typeof this.initialize&&this.initialize()}return r.mixin(e,e.prototype),e.prototype.tagName="div",e.prototype.className="view",e.prototype.template=null,e.prototype.events={},e.prototype.outlets={},e.prototype._createElem=function(){return this.elem=null!=this.options.elem?$(this.options.elem):$("<"+this.tagName+" id='"+this.id+"' class='"+this.className+"'></"+this.tagName+">")},e.prototype.assignEvents=function(){var e,t,n,o,r;r=this.events;for(n in r)e=r[n],t=n.split(" "),t.length>1?(n=t.shift(),o=t.join(" "),this.elem.on(n,o,this[e])):this.elem.on(n,this[e]);return this},e.prototype.unassignEvents=function(){var e,t,n,o,r;r=this.events;for(n in r)e=r[n],t=n.split(" "),t.length>1?(n=t.shift(),o=t.join(" "),this.elem.off(n,o,this[e])):this.elem.off(n,this[e]);return this},e.prototype.assignOutlets=function(){var e,t,n;this.ui={},n=this.outlets;for(e in n)t=n[e],this.ui[e]=this.elem.find(t),this[e]=this.elem.find(t);return this},e.prototype.unassignOutlets=function(){var e,t,n;n=this.ui;for(t in n)e=n[t],delete this.ui[t],delete this[t];return this},e.prototype.dispose=function(){return this.unassignEvents(),this.unassignOutlets(),this},e.prototype.close=function(){return"function"==typeof this.beforeClose&&this.beforeClose(),this.dispose(),this.elem.remove(),"function"==typeof this.onClose&&this.onClose(),this},e.prototype.remove=function(){return this.unassignEvents(),this.elem.remove(),this},e.prototype.detach=function(){return this.elem.detach(),this},e.prototype.getData=function(){var e,t;return null!=(t="function"==typeof(e=this.model).toJSON?e.toJSON():void 0)?t:this.model},e.prototype.appendTo=function(e){return this.render(),e.append(this.elem),this.containingElem=e,"function"==typeof this.onDomActive&&this.onDomActive(),this},e.prototype.render=function(){var e,t;return"function"==typeof this.beforeRender&&this.beforeRender(),this.fire("before:render",this),e=this.getData(),t=this.template(e),this.elem.html(t),this.assignOutlets(),this.fire("render",this),"function"==typeof this.onRender&&this.onRender(),this},e}(),n.exports=o},env:function(e,t,n){n.exports={version:t("version"),debug:!1,debug:!1,test:!1,mobile:null!=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)}},main:function(e,t){var n,o,r,i,s,a,l,u;r=t("env"),a=t("util/log").prefix("main:"),o=t("util/ensure"),l=t("scanner"),u=t("viewer/validator"),n=t("viewer/index"),i=function(){return r.mobile?o.libs.hammer():null},o("jquery",i,function(e){if(null!=e)throw e;return $(s)}),s=function(){var e,t,o,i,s,c,p,d;for(r.debug&&a.level(2),a.info("FlipBook v"+r.version),a.debug("ENV",r),a.info("Ready."),e=l.run(),d=[],s=0,c=e.length;c>s;s++)p=e[s],t=p.item,o=p.model,u(o)?(i=new n({model:o}),d.push(i.appendTo($(t).empty()))):d.push(a.info("! Invalid model:",u.errors(),o));return d},r.debug&&r.mobile&&o("firebug",function(){return window.onerror=function(e){return a.info("ERROR!",e)}})},scanner:function(e,t,n){var o,r,i;r=t("util/log").prefix("scanner:"),i=[],n.exports=o={define:function(e){return i.push(e),this},run:function(){var e,t,n,o,r,s,a,l;for(t=[],o=0,s=i.length;s>o;o++)for(n=i[o],l=n(),r=0,a=l.length;a>r;r++)e=l[r],t.push(e);return t}},o.define(function(){var e;return e=[],$("[data-flipbook]").each(function(t,n){var o,r,i,s,a,l,u,c,p;for(o=$(n).data("flipbook"),i={},p=o.split(","),u=0,c=p.length;c>u;u++)a=p[u],s=a.split(":"),r=s.shift(),l=s.join(":"),i[$.trim(r)]=$.trim(l);return e.push({item:n,model:i})}),e}),o.define(function(){var e,t;return t=[],e=/-([a-z])/g,$("[data-flipbook-pages]").each(function(n,o){var r,i,s,a,l,u,c,p,d;for(n=$(o),i={},c=o.attributes,l=0,u=c.length;u>l;l++)r=c[l],s=(null!=(p=r.name)?p:r.nodeName)+"",0===s.indexOf("data-flipbook-")&&(s=s.replace("data-flipbook-",""),a=s.replace(e,function(e){return e[1].toUpperCase()}),i[a]=null!=(d=r.value)?d:r.nodeValue);return t.push({item:o,model:i})}),t})},"util/ensure":function(e,t,n){var o,r,i,s,a=[].slice;o={angular:function(){return"undefined"!=typeof angular&&null!==angular?angular:"//ajax.googleapis.com/ajax/libs/angularjs/1.0.4/angular.min.js"},backbone:function(){return"undefined"!=typeof Backbone&&null!==Backbone?Backbone:"//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.10/backbone-min.js"},fastclick:function(){return"undefined"!=typeof FastClick&&null!==FastClick?FastClick:"//cdnjs.cloudflare.com/ajax/libs/fastclick/0.6.0/fastclick.min.js"},firebug:function(){return"undefined"!=typeof FBL&&null!==FBL?FBL:"https://getfirebug.com/releases/lite/1.4/firebug-lite.js"},hammer:function(){return"undefined"!=typeof Hammer&&null!==Hammer?Hammer:"https://raw.github.com/EightMedia/hammer.js/v1.0.3/dist/hammer.min.js"},jquery:function(){return"undefined"!=typeof jQuery&&null!==jQuery?jQuery:"//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"},jqueryui:function(){var e;return null!=(e="undefined"!=typeof jQuery&&null!==jQuery?jQuery.Widget:void 0)?e:"//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min.js"},underscore:function(){return"undefined"!=typeof _&&null!==_?_:"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"},webfont:function(){return"undefined"!=typeof WebFont&&null!==WebFont?WebFont:"//ajax.googleapis.com/ajax/libs/webfont/1.1.2/webfont.js"},zepto:function(){return"undefined"!=typeof Zepto&&null!==Zepto?Zepto:"//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js"}},s="file:"===location.protocol?"http:":"",r=function(e,t){var n,r,a,l;return r=null!=(a=null!=(l="function"==typeof e?e():void 0)?l:"function"==typeof o[e]?o[e]():void 0)?a:null,"string"!=typeof r?t(null):(n=document.createElement("script"),n.type="text/javascript",i.defer&&(n.defer=!0),i.async&&(n.async=!0),n.onload=function(){return t(null)},n.onerror=function(){return t(Error("Could not load external resource: "+e+" from "+r))},n.src="/"===r[0]?""+s+r:r,n.onreadystatechange=function(){return"loaded"===n.readyState||"complete"===n.readyState?(n.onreadystatechange=null,t(null)):void 0},document.getElementsByTagName("HTML")[0].appendChild(n),n)},i=function(){var e,t,n,o;return t=arguments.length>=1?a.call(arguments,0):[],e="function"==typeof t.slice(-1)[0]?t.pop():function(e){if(null!=e)throw e;return"undefined"!=typeof console&&null!==console?"function"==typeof console.log?console.log("Library loading complete."):void 0:void 0},o=t.shift(),n=function(i){return null!=i?e(i):0===t.length?e(null):(o=t.shift(),r(o,n))},r(o,n),null},i.async=!0,i.defer=!1,i.libs=o,n!==void 0&&null!==n?n.exports=i:this.ensure=i},"util/extend":function(e,t,n){n.exports=function(e){var t,n,o,r,i,s;for(s=Array.prototype.slice.call(arguments,1),r=0,i=s.length;i>r;r++)if(n=s[r])for(t in n)o=n[t],e[t]=o;return e}},"util/log":function(e,t,n){var o,r,i,s,a,l,u,c,p;l=1,o=function(){return"undefined"!=typeof console&&null!==console?function(e,t){return console[e].apply(console,t)}:function(){}}(),a=function(e){return null!=e&&(l=function(){switch(e){case-1:case"none":case"n":return-1;case 0:case"quiet":case"1":return 0;case 1:case"info":case"i":return 1;case 2:case"debug":case"d":return 2;default:return l}}()),l},c=function(){return 0>l?void 0:o("log",arguments)},s=function(){return 1>l?void 0:o("info",arguments)},r=function(){return 2>l?void 0:o("debug",arguments)},i=function(){var e,t;return t=Error(),null!=t.stack&&(e=t.stack.split("\n"),"undefined"!=typeof console&&null!==console&&"function"==typeof console.error&&console.error("Error",e[2].trim())),o("warn",arguments)},p=Array.prototype.slice,u=function(e){return{level:a,say:function(){var t;if(!(0>l))return(t=p.call(arguments)).unshift(e),c.apply(c,t)},info:function(){var t;if(!(1>l))return(t=p.call(arguments)).unshift(e),s.apply(s,t)},debug:function(){var t;if(!(2>l))return(t=p.call(arguments)).unshift(e),r.apply(r,t)},error:function(){var t;return(t=p.call(arguments)).unshift(e),i.apply(i,t)}}},n.exports={level:a,info:s,debug:r,error:i,say:c,prefix:u},Function.prototype.bind&&console&&"object"==typeof console.log&&["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(e){console[e]=this.bind(console[e],console)},Function.prototype.call)},"util/number/pad":function(e,t,n){var o;n.exports=o=function(e,t){var n;for(n=""+e;t>n.length;)n="0"+n;return n}},"util/positions":function(e,t,n){var o,r,i,s;s=t("./log").prefix("positions:"),r=function(e){var t,n;return t=$(null!=(n=e.delegateTarget)?n:e.currentTarget).offset(),null!=e.gesture?e.gesture.center.pageX-t.left:e.pageX-t.left},i=function(e){var t;return null!=e.offsetX?(s.info("offsetX",e.offsetX,e),e.offsetX):(t=$(e.currentTarget).offset(),null!=e.gesture?e.gesture.center.pageX-t.left:e.pageX-t.left)},o=r,n.exports={getX:o}},"util/preloader":function(e,t,n){var o,r;r=t("./log").prefix("preloader:"),o=function(){function e(t){var n=this;this.didError=function(){return e.prototype.didError.apply(n,arguments)},this.didLoad=function(){return e.prototype.didLoad.apply(n,arguments)},this.elem=$(t)}return e.prototype.onError=function(e){return this.errorCallback=e,this},e.prototype.onProgress=function(e){return this.progressCallback=e,this},e.prototype.onLoad=function(e){return this.loadCallback=e,this},e.prototype.start=function(){var e;return e=this.elem.find("img"),this.total=e.length,this.count=0,e.on("error",this.didError).on("load",this.didLoad),this.total===this.count&&this.didError(null),this},e.prototype.didLoad=function(e){var t;return this.count+=1,t=Math.floor(100*(this.count/this.total)),"function"==typeof this.progressCallback&&this.progressCallback(t),this.count===this.total?("function"==typeof this.progressCallback&&this.progressCallback(100),this.elem.find("img").off(),delete this.elem,"function"==typeof this.loadCallback?this.loadCallback(e):void 0):void 0},e.prototype.didError=function(e){return"function"==typeof this.progressCallback&&this.progressCallback(100),this.elem.find("img").off(),delete this.elem,"function"==typeof this.errorCallback?this.errorCallback(e):void 0},e}(),n.exports=function(e){return new o(e)}},"util/uid":function(e,t,n){var o;o=0,n.exports=function(e){return null==e&&(e=""),e+ ++o}},version:function(e,t,n){n.exports="1.0.0-107"},"viewer/concerns/buttons":function(e,t,n){var o,r;r=t("env"),o=function(e,t){return function(n,o){var i,s,a,l,u,c,p,d,f;for(s=e.find(n).addClass("disabled").hide(),a=o.action,i=o.update,t.once("change:ready",function(){return s.show(),null!=i?i.call(s):s.removeClass("disabled")}),f=(null!=(d=o.states)?d:"").split(","),c=0,p=f.length;p>c;c++)u=f[c],t.on("change:"+u,function(){return i.call(s)});return l=function(){return s.is(".disabled")?void 0:t.trigger(a)},r.mobile?Hammer(s.get(0),{prevent_default:!0}).on("tap",l):s.on("click",l)}},n.exports=function(e,t){var n;return n=o(e,t),n(".prevPage",{action:"cmd:page:prev",states:"currentPage",update:function(){return this.toggleClass("disabled",t.isFirstPage())}}),n(".nextPage",{action:"cmd:page:next",states:"currentPage,endScreen",update:function(){return this.toggleClass("disabled",t.isLastPage()&&t.endScreen)}}),n(".zoom",{action:"cmd:zoom:toggle"}),n(".help",{action:"cmd:help:toggle",states:"helpScreen,endScreen",update:function(){return this.toggleClass("disabled",t.endScreen),this.toggleClass("down",t.helpScreen)}})}},"viewer/concerns/end":function(e,t,n){var o;o=t("env"),n.exports=function(e,t){var n,r,i;return r=e.find(".the-end"),i=e.find(".restart"),n=function(){return t.set({currentPage:0,endScreen:!1,helpScreen:!1})},t.on("change:endScreen",function(e){return r.toggle(e)}),t.on("cmd:restart",n),o.mobile?Hammer(i.get(0),{prevent_default:!0}).on("tap",n):i.on("click",n)}},"viewer/concerns/focus":function(e,t,n){n.exports=function(e,t){var n=this;return t.on("change:active",function(t){return n.active=t,e.toggleClass("inactive",!t).toggleClass("active",t)}),e.on("focus",function(){return t.set({active:!0})}),e.on("blur",function(){return e.is(".zoomed")?void 0:t.set({active:!1})})}},"viewer/concerns/help":function(e,t,n){var o;n.exports=o=function(e,t){var n,o;return n=e.find(".help-content"),t.on("change:helpScreen",function(e){return n.toggle(e)}),o=function(){return t.ready&&!t.endScreen?t.toggle("helpScreen"):void 0},t.on("cmd:help:toggle",o)}},"viewer/concerns/keyboard":function(e,t,n){var o,r,i,s,a,l,u,c,p,d=[].indexOf||function(e){for(var t=0,n=this.length;n>t;t++)if(t in this&&this[t]===e)return t;return-1};r=t("env"),a=t("util/log").prefix("keyboard:"),o=null,i={listening:!1,init:function(){return r.mobile||this.listening?void 0:this.listen()},listen:function(){return r.mobile||this.listening?void 0:($(document).on("keydown",this.onKeyInput),this.listening=!0)},stopListening:function(){return!r.mobile&&this.listening?($(document).off("keydown",this.onKeyInput),this.listening=!1):void 0},onKeyInput:function(e){return null!=o?o.state.trigger("key:input",e):void 0}},l=[32,39,68,221],u=[37,65,219],p=[27],c=[],s={"cmd:page:next":[32,39,68,221],"cmd:page:prev":[37,65,219],"cmd:restart":[82],"cmd:zoom:out":[27],"cmd:zoom:toggle":[90],"cmd:help:toggle":[72,191]},n.exports=function(e,t){var n;return i.init(),n=function(e){var n,o,r;if(t.ready&&t.active){for(n in s)if(o=s[n],r=e.which,d.call(o,r)>=0)return t.trigger(n),!1;return null}},t.on("key:input",n),t.on("change:active",function(e){return o=e?t.controller:null})}},"viewer/concerns/loading":function(e,t,n){var o,r;o=t("util/log").prefix("loading:"),r=t("util/preloader"),n.exports=function(e,t){var n,o,i,s,a,l;return n=e.find(".progress .loading").show(),i=function(e){return n.width(""+e+"%")},o=function(e){return n.toggle(e),n.toggleClass("done"),t.off("change:loading",i)},t.on("change:loading",i),t.once("change:loaded",o),s=function(){return t.set({loaded:!1}),t.trigger("load:error")},a=function(){return t.set({loaded:!0}),t.trigger("loaded"),t.trigger("load:complete")},l=function(e){return t.set("loading",e)},r(e).onError(s).onLoad(a).onProgress(l).start()}},"viewer/concerns/metadata":function(e,t,n){var o,r;r=t("util/log").prefix("metadata:"),o=function(e,t){return function(n,o,r){var i,s;return i=e.find(o),s=function(e){return r.call(i,e)},t.on("change:"+n,s),s(t[n])}},n.exports=function(e,t){var n;return n=o(e,t),n("copyright",".copyright",function(e){return null!=e&&""!==e?this.html(e).attr("title",e).show():this.hide()})}},"viewer/concerns/progress":function(e,t,n){var o,r,i,s;o=t("env"),i=t("util/log").prefix("progressBar:"),r=t("util/positions").getX,n.exports=s=function(e,t){var n,i,s,a,l,u;return s=e.find(".progress"),i=e.find(".progress .location").hide(),u=function(){var e;return e=t.getPercentageRead(),i.width(""+e+"%"),i.toggleClass("done",t.isLastPage()),i.toggleClass("start",t.isFirstPage())},t.once("change:loaded",function(e){return i.toggle(e),u()}),t.on("change:currentPage",function(e){return t.isValidPage(e)?u():void 0}),n=function(e){var n,o,a,l,u,c,p;return n="mousemove"===e.type||"drag"===e.type,p=r(e),o=null,c=s.width(),a=p/c,u=a*(t.pages-1),l=n?Math.round(u):(o=i.width(),o>p?Math.floor(u):Math.ceil(u)),t.set({currentPage:l})},a=function(o){return t.ready?(s.find("span").hide().end().on("mousemove",n),e.on("mouseleave",l),$(document).on("mouseup",l),n(o)):void 0},l=function(){return s.find("span").show().end().off("mousemove",n),e.off("mouseleave",l),$(document).off("mouseup",l)},o.mobile?Hammer(s.get(0),{prevent_default:!0}).on("tap",n).on("drag",n):s.on("mousedown",a)}},"viewer/concerns/screen":function(e,t,n){var o,r,i;o=t("env"),i=t("util/log").prefix("screen:"),r=t("util/positions").getX,n.exports=function(e,t){var n,s,a,l,u,c,p,d,f,h;return p=e.find(".screen-stack"),u=null,t.on("change:loaded",function(e){return i.info("stack loaded?",e),p.toggle(e)}),a=function(n){return null==n&&(n=t.currentPage),e.find(".screen").get(n)},h=function(e,t){return a(e).style.display="table-cell",a(t).style.display="none"},c=function(){var e;return e="table-cell",a().style.display=e},l=function(){return $(a()).hide()},t.on("change:currentPage",h),t.on("change:ready",c),t.on("cmd:current:show",c),t.on("cmd:current:hide",l),s=function(e){var n,o;if(!t.endScreen&&!t.helpScreen&&t.ready)return n=$(null!=(o=e.delegateTarget)?o:e.currentTarget),null!=e&&"function"==typeof e.preventDefault&&e.preventDefault(),r(e)<n.width()/2?t.trigger("cmd:page:prev"):t.trigger("cmd:page:next"),!1},d=function(){return null!=u?(t.trigger(u),u=null):void 0},f=function(e){return function(){return t.trigger(e)}},n=function(e){return function(){return u=e}},o.mobile?Hammer(p.get(0),{prevent_default:!0}).on("swipeleft",f("cmd:page:next")).on("swiperight",f("cmd:page:prev")).on("tap",s).on("hold",f("cmd:help:toggle")).on("pinchout",n("cmd:zoom:in")).on("pinchin",n("cmd:zoom:out")).on("release",d):p.on("click",s)}},"viewer/concerns/sizing":function(e,t,n){var o;o=t("util/log").prefix("sizing:"),n.exports=function(e,t){var n,o,r,i,s,a,l,u,c,p;return a=0,s=0,i=0,r=0,l=0,p=e.find(".screen-stack"),t.on("resize",function(){return e.is(".zoomed")?u():c()}),n=function(){var n,l;return l=p.is(":visible"),l||p.show(),n=e.find("img").get(0),t.imageWidth=a=n.width,t.imageHeight=s=n.height,t.imageFullWidth=i=n.naturalWidth,t.imageFullHeight=r=n.naturalHeight,o(),l?void 0:p.hide()},o=function(){return t.progressWidth=l=e.find(".progress").width()},t.on("sizes:calc",n),c=function(){return e.css({height:""}),t.animated&&!t.ready?e.animate({width:t.imageWidth}):e.css({width:t.imageWidth}),t.ready&&p.css({height:t.imageHeight}),e.find("img").css({maxWidth:"100%",maxHeight:""})},u=function(){var t,n,o,s;return t=$(window),n=t.height(),o=t.width(),e.css({width:o,height:n}),n-=e.find(".pager").outerHeight(),n-=e.find("header").outerHeight(),n-=null!=(s=e.find(".copyright").outerHeight())?s:0,n-=6,p.css({height:n}),e.find("img").css({maxWidth:Math.min(o,i),maxHeight:Math.min(n,r)}),l=e.find(".progress").width()}}},"viewer/concerns/theme":function(e,t,n){var o;t("themes/embedded").activate(),o=function(e,n){null==n&&(n="light");try{t("themes/"+e.theme).activate()}catch(o){t("themes/"+n).activate(),e.theme=n}return"theme-"+e.theme},n.exports=function(e,t){var n;return e.addClass("theme-"+(null!=(n=t.theme)?n:"light"))}},"viewer/concerns/zoom":function(e,t,n){var o;o=t("util/log").prefix("zoom:"),n.exports=function(e,t){var n,o,r;return o=e.find(".screen-stack"),r=function(o){var r;if(!(o&&e.is(".zoomed")||!o&&!e.is(".zoomed")))return t.trigger("cmd:current:hide"),e.is(".zoomed")?(e.detach(),e.removeClass("zoomed"),t.controller.containingElem.append(e),$(window).off("resize",n),n()):(e.detach(),e.addClass("zoomed"),r=$("body"),r.after(e),$(window).on("resize",n),n()),e.focus(),t.trigger("cmd:current:show")},n=function(){return t.trigger("resize")},t.on("change:zoomed",r)}},"viewer/index":function(e,t,n){var o,r,i,s,a,l,u,c,p,d,f,h,g={}.hasOwnProperty,m=function(e,t){function n(){this.constructor=e}for(var o in t)g.call(t,o)&&(e[o]=t[o]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};l=t("env"),f=t("util/uid"),d=t("util/number/pad"),p=t("util/log").prefix("viewer:"),u=t("cog/events"),h=t("./validator"),r=t("cog/view"),o=t("cog/object"),c=t("util/positions").getX,a=function(e,t){return e=e.replace("####",d(t,4)),e=e.replace("###",d(t,3)),e=e.replace("##",d(t,2)),e=e.replace("#",t)},s=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}return m(t,e),t.prototype.isLastPage=function(){return this.currentPage===this.getLastPage()},t.prototype.isFirstPage=function(){return 0===this.currentPage},t.prototype.getNextPage=function(){return Math.min(this.currentPage+1,this.getLastPage())},t.prototype.getPrevPage=function(){return Math.max(this.currentPage-1,0)},t.prototype.getLastPage=function(){return this.pages-1},t.prototype.isValidPage=function(e){return e>=0&&this.pages>e},t.prototype.getPercentageRead=function(){return 0===this.currentPage?0:this.isLastPage()?100:Math.min(Math.round(100*(this.currentPage/this.getLastPage())),100)},t}(o),i=function(e){function n(){var e=this;return this.hideCurrent=function(){return n.prototype.hideCurrent.apply(e,arguments)},this.showCurrent=function(){return n.prototype.showCurrent.apply(e,arguments)},this.onLoadError=function(){return n.prototype.onLoadError.apply(e,arguments)},this.onReady=function(){return n.prototype.onReady.apply(e,arguments)},this.onLoad=function(){return n.prototype.onLoad.apply(e,arguments)},this.onPrevPage=function(){return n.prototype.onPrevPage.apply(e,arguments)},this.onNextPage=function(){return n.prototype.onNextPage.apply(e,arguments)},this.onPageChange=function(){return n.prototype.onPageChange.apply(e,arguments)},this.doZoomOut=function(){return n.prototype.doZoomOut.apply(e,arguments)},this.toggleZoom=function(){return n.prototype.toggleZoom.apply(e,arguments)},n.__super__.constructor.apply(this,arguments)}return m(n,e),n.prototype.className="flipbook",n.prototype.template=t("./template"),n.prototype.outlets={stack:".screen-stack",pagerArea:".pager",progressBar:".progress"},n.prototype.initialize=function(){if(!h(this.model,!0))throw"Invalid settings: "+h.errors();return this.elem.hide().data("controller",this),this.screenCount=this.model.pages,this.state=new s(this.model),this.state.set({controller:this,currentPage:0,ready:!1,active:!1,loaded:!1,zoomed:!1,endScreen:!1,helpScreen:!1}),this.state.on("ready",this.onReady),this.state.on("cmd:page:next",this.onNextPage),this.state.on("cmd:page:prev",this.onPrevPage),this.state.on("cmd:zoom:toggle",this.toggleZoom),this.state.on("cmd:zoom:out",this.doZoomOut),this.state.on("cmd:zoom:in",this.toggleZoom),this.state.on("load:complete",this.onLoad),this.state.on("load:error",this.onLoadError),this.screenCountIdx=this.screenCount-1,this.current=0,this.elem.attr("tabindex",-1).addClass("inactive").toggleClass("isMobile",l.mobile).toggleClass("isDesktop",!l.mobile)},n.prototype.toggleZoom=function(){return this.state.ready?this.state.toggle("zoomed"):void 0},n.prototype.doZoomOut=function(){return this.state.zoomed?this.state.set({zoomed:!1}):void 0},n.prototype.onPageChange=function(e){if(-1===e)return this.state.set({currentPage:this.state.getLastPage()});if(this.state.ready&&this.state.isValidPage(e))return this.state.set({endScreen:!1}),this.hideCurrent(),this.current=e,this.showCurrent()},n.prototype.onNextPage=function(){return this.state.ready?this.state.isLastPage()?this.state.set({endScreen:!0}):this.state.endScreen||this.state.helpScreen?this.state.set({endScreen:!1,helpScreen:!1}):this.state.set({currentPage:this.state.getNextPage()}):void 0},n.prototype.onPrevPage=function(){return this.state.ready?this.state.endScreen||this.state.helpScreen?this.state.set({endScreen:!1,helpScreen:!1}):this.state.set({currentPage:this.state.getPrevPage()}):void 0},n.prototype.onLoad=function(){return this.state.trigger("ready"),this.state.set({ready:!0})},n.prototype.onReady=function(){return p.info("onReady"),this.state.trigger("cmd:current:show"),this.state.trigger("sizes:calc"),p.info("resizing stack"),this.state.trigger("resize"),this.state.animated===!1?this.stack.css({height:this.state.imageHeight,opacity:1}):this.stack.css({opacity:0}).animate({height:this.state.imageHeight,opacity:1})},n.prototype.onLoadError=function(){var e;return p.info("ERROR Loading images"),this.elem.addClass("errors"),this.stack.find("img").remove(),e=$("<div class='errors'>There were errors loading the images, please refresh your browser!</div>").hide(),this.stack.append(e).show(),e.slideDown()},n.prototype.showCurrent=function(){return this.state.trigger("cmd:current:show")},n.prototype.hideCurrent=function(){return this.state.trigger("cmd:current:hide")},n.prototype.getData=function(){var e,t,n,o,r,i,s;for(r=[],t=this.model.start,i=this.model.start+this.screenCountIdx,n=s=t;i>=t?i>=s:s>=i;n=i>=t?++s:--s)o={src:a(this.model.path,n)},r.push(o);return e=this.model,e.screens=r,e.id=this.id,e.tapOrClick=function(){return l.mobile?"tap":"click"},e.isMobile=l.mobile,e},n.prototype.onRender=function(){var e,n,o,r,i;for(this.stack.find(".screen").hide(),r=t.modules("viewer/concerns/"),i=[],n=0,o=r.length;o>n;n++)e=r[n],i.push(t(e).call(this,this.elem,this.state));return i},n.prototype.onDomActive=function(){return this.state.animated===!1?this.elem.show():(this.elem.addClass("animated"),this.elem.fadeIn()),this.model.autofocus?this.elem.focus():void 0},n}(r),n.exports=i},"viewer/template":function(e,t,n){n.exports=function(e){e||(e={});var t,n=[],o=function(e){return e&&e.ecoSafe?e:e!==void 0&&null!=e?i(e):""},r=e.safe,i=e.escape;return t=e.safe=function(e){if(e&&e.ecoSafe)return e;(void 0===e||null==e)&&(e="");var t=new String(e);return t.ecoSafe=!0,t},i||(i=e.escape=function(e){return(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}),function(){(function(){var e,t,r,i,s;for(n.push('<header>\n  <div class="zoom button"><span>&#10132;</span></div>\n  <div class="help button"><span>i</span></div>\n  <h3 title="'),n.push(o(this.title)),n.push('">'),n.push(o(this.title)),n.push('</h3>\n</header>\n<div class="screen-stack">'),s=this.screens,e=r=0,i=s.length;i>r;e=++r)t=s[e],n.push(' \n<div class="screen"><img src="'),n.push(o(t.src)),n.push('"/></div> \n');n.push(' \n  <div class="screen the-end content-screen">\n    <div class="container">\n      <div class="body">\n        <div class="restart">\n          <span class="icon">&#8634;</span>\n          <label>Restart from<br/>beginning.</label>\n        </div>    \n      </div>\n    </div>\n  </div>\n  <div class="screen help-content content-screen">\n    <div class="container">\n      <div class="body">\n        '),n.push(o(this.tapOrClick())),n.push(' on the left or right half.\n\n        <p class="info"><small>FlipBook v1.0.0-107.</small></p>\n      </div>\n    </div>\n  </div>\n</div> \n<footer class="copyright" title="'),n.push(o(this.copyright)),n.push('"><span>'),n.push(o(this.copyright)),n.push('</span></footer> \n<footer class="pager"> \n<div class="prevPage button"><span>&#8227;</span></div><!-- lsaquo -->\n<div class="progress">\n  <div class="bar background done"><span>&nbsp;</span></div>\n  <div class="bar loading"><span>&nbsp;</span></div>\n  <div class="bar location"><span>&nbsp;</span></div>\n</div> \n<div class="nextPage button"><span>&#8227;</span></div><!-- rsaquo -->\n</footer>')}).call(this)}.call(e),e.safe=r,e.escape=i,n.join("")}},"viewer/validator":function(e,t,n){var o,r,i,s,a,l,u,c,p,d;u=t("util/log").prefix("validator:"),i=[],o=function(e,t){return null==e?t:"true"===e||"yes"===e},p=function(e,t){return null==e?t:e+""},l=function(e,t){return null==e?t:parseInt(e,10)},r=function(e,t,n){return e[t]=o(e[t],n)},a=function(e,t,n){return e[t]=l(e[t],n)},c=function(e,t,n){return e[t]=p(e[t],n)},s=function(e){return a(e,"pages"),a(e,"start",1),r(e,"animated",!0),c(e,"copyright","")},n.exports=d=function(e,t){return null==t&&(t=!1),i=[],null==e.path&&i.push("path is missing"),null==e.pages&&i.push("pages is missing"),0===i.length?(t&&s(e),!0):!1},d.errors=function(){return i.join(", ")}}}),flipbook("main");