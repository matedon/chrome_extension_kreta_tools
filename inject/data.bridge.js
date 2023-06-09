/*!
 * https://github.com/adampietrasiak/jquery.initialize
 *
 * Copyright (c) 2015-2016 Adam Pietrasiak
 * Released under the MIT license
 * https://github.com/pie6k/jquery.initialize/blob/master/LICENSE
 *
 * This is based on MutationObserver
 * https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */
!function(e){"use strict";var t=[" ",">","+","~"],i=["+","~"],r=["ATTR","PSEUDO","ID","CLASS"];Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector);var n=function(n,o,a){this.selector=n.trim(),this.callback=o,this.options=a,function(n){if(!e.find.tokenize)return n.isCombinatorial=!0,n.isFraternal=!0,void(n.isComplex=!0);n.isCombinatorial=!1,n.isFraternal=!1,n.isComplex=!1;for(var o=e.find.tokenize(n.selector),a=0;a<o.length;a++)for(var s=0;s<o[a].length;s++)-1!=t.indexOf(o[a][s].type)&&(n.isCombinatorial=!0),-1!=i.indexOf(o[a][s].type)&&(n.isFraternal=!0),-1!=r.indexOf(o[a][s].type)&&(n.isComplex=!0)}(this)},o=[];o.initialize=function(t,i,r){var o=[],a=function(){-1==o.indexOf(this)&&(o.push(this),e(this).each(i))};e(r.target).find(t).each(a);var s=new n(t,a,r);this.push(s);var l=new MutationObserver((function(t){for(var i=[],r=0;r<t.length;r++)if("attributes"==t[r].type&&(t[r].target.matches(s.selector)&&i.push(t[r].target),s.isFraternal?i.push.apply(i,t[r].target.parentElement.querySelectorAll(s.selector)):i.push.apply(i,t[r].target.querySelectorAll(s.selector))),"childList"==t[r].type)for(var n=0;n<t[r].addedNodes.length;n++)t[r].addedNodes[n]instanceof Element&&(t[r].addedNodes[n].matches(s.selector)&&i.push(t[r].addedNodes[n]),s.isFraternal?i.push.apply(i,t[r].addedNodes[n].parentElement.querySelectorAll(s.selector)):i.push.apply(i,t[r].addedNodes[n].querySelectorAll(s.selector)));for(var o=0;o<i.length;o++)e(i[o]).each(s.callback)})),c={childList:!0,subtree:!0,attributes:s.isComplex};return l.observe(r.target,r.observer||c),l},e.fn.initialize=function(t,i){if(console.warn("jQuery.initialiaze: Deprecated API, see: https://github.com/pie6k/jquery.initialize/issues/6 and https://api.jquery.com/selector/"),void 0===this.selector)throw console.error("jQuery.initialiaze: $.fn.initialize() is not supported in your version of jQuery. Use $.initialize() instead."),new Error("jQuery.initialiaze: .selector is removed in jQuery versions >= 3.0");return o.initialize(this.selector,t,e.extend({},e.initialize.defaults,i))},e.initialize=function(t,i,r){return o.initialize(t,i,e.extend({},e.initialize.defaults,r))},e.initialize.defaults={target:document.documentElement,observer:null}}(jQuery);

console.log('data.bridge.js')
$.initialize('.fc-time-grid-event', function () {
    const thd = $(this)
    if (thd && thd.fcSeg) {
        console.log(thd.fcSeg)
    }
})