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

let obs = [] // array for $.initialize.disconnect
const fnObsDisconnect = function () {
  $.each(obs, function (i, o) {
    o.disconnect()
  })
  obs = []
}
const fnObsRow = function(sel, fn, delay) {
  // console.log('fnObsRow call', sel)
  if (typeof delay === typeof void 0) {
    delay = 300
  }
  obs.push($.initialize(sel, function () {
    const self = this
    // console.log('fnObsRow init', sel)
    setTimeout(function () {
      // console.log('fnObsRow run', sel)
      fn.call(self)
    }, delay)
  }))
}

console.log('KRETA TOOLS - DELETE ALL')

const snipClass = 'snip-ktxc9364'
const snipClassTb = snipClass + '-toolbar'
const snipClassTbClr = snipClassTb + '-btn-clr'
const snipClassTbDel = snipClassTb + '-btn-del'
const snipClassTbStop = snipClassTb + '-btn-stop'
const snipClassTbClose = snipClassTb + '-btn-close'
const snipClassTbBtnAct = snipClassTb + '-btn-active'
const snipClassTbNap = snipClassTb + '-btn-nap'
const snipClassTbFil = snipClassTb + '-filter'
const snipClassTbNth = snipClassTb + '-nth'
const snipClassTbFind = snipClassTb + '-find'
const snipClassTbTop = snipClass + '-topic'
const snipClassTbPres = snipClass + '-presence'
const snipClassTbDone = snipClass + '-done'
const snipClassTbVal = snipClassTb + '-kij'
const snipClassTbDay = snipClassTb + '-day'
const snipClassTbDays = snipClassTb + '-days'
const snipClassCell = snipClass + '-cell'
const snipIdStyle = snipClass + '-style'

$().ready(function () {
    console.log('ready!')
    $.ajax({
        'method' : 'GET',
        'dataType' : 'html',
        'url' : chrome.runtime.getURL('inject/inject.html'),
        'success' : function (res) {
            console.log(res)
            $('.' + snipClassTb).remove()
            $('body').append(res)
        }
    })
    $.ajax({
        'method' : 'GET',
        'dataType' : 'text/css',
        'url' : chrome.runtime.getURL('inject/inject.css'),
        'success' : function (res) {
            console.log(res)
            $('#' + snipIdStyle).remove()
            $('body').append('<style id="' + snipIdStyle + '">' + res + '</style>')
            fnMain()
        }
    })
})

const fnMain = function () {
    const $snip = $('.' + snipClassTb)
    $snip.find('.' + snipClassTbStop).on('click', function () {
        fnObsDisconnect()
    })
    $snip.find('.' + snipClassTbDays).on('click', function () {
        $(this).toggleClass(snipClassTbBtnAct)
    })
    $snip.find('.' + snipClassTbClr).on('click', function () {
        $snip.find(':input').val('')
        $snip.find('.' + snipClassTbDays).removeClass(snipClassTbBtnAct)
        $('.fc-time-grid-event').removeClass(snipClassCell)
    }).trigger('click')
    $snip.find('.' + snipClassTbFind).on('click', function () {
        const $btn = $(this)
        $snip.find('button').removeClass(snipClassCell)
        $btn.addClass(snipClassCell)
        findFilterOra()
    })
    $snip.find('.' + snipClassTbDel).on('click', function () {
        const $btn = $(this)
        $snip.find('button').removeClass(snipClassCell)
        $btn.addClass(snipClassCell)
        if (confirm('Delete ' + $('.fc-time-grid-event.' + snipClassCell).length + '?')) {
        delNextOra()
        }
    })
    $snip.find('.' + snipClassTbNap).on('click', function () {
        const $btn = $(this)
        $snip.find('button').removeClass(snipClassCell)
        $btn.addClass(snipClassCell)
        if (confirm('Naplóz ' + findFilterOra().length + '?')) {
        napNextOra()
        }
    })
    $snip.find('.' + snipClassTbStop).on('click', function () {
        const $btn = $(this)
        $('.fc-time-grid-event').removeClass(snipClassCell)
        $snip.find('button').removeClass(snipClassCell)
        $btn.addClass(snipClassCell)
    })
    $snip.find('.' + snipClassTbClose).on('click', function () {
        $('.' + snipClassTb).remove()
        $('#' + snipIdStyle).remove()
        $('.fc-time-grid-event').removeClass(snipClassCell)
    })
}


const findFilterOra = function () {
  let $mindenOra = $('.fc-title').closest('.fc-time-grid-event')
  $mindenOra.removeClass(snipClassCell)
  let dayNums = []
  $('.' + snipClassTbDays).each(function (nth) {
    if ($(this).hasClass(snipClassTbBtnAct)) {
      dayNums.push(nth)
    }
  })
  let fil = $('.' + snipClassTbFil).val().toLowerCase()
  const nthVal = $('.' + snipClassTbNth).val()
  let nth = nthVal.length ? nthVal.split(',') : []
  const noTema = $('.' + snipClassTbDone).val()[0]
  const $orak = $mindenOra.filter(function () {
    const $ora = $(this)
    const oraData = $ora.data()
    let ret = [false, false]
    if (dayNums && dayNums.length) {
      const dayStart = (new Date(oraData.fcSeg.start._i)).getDay() - 1
      if (dayNums.indexOf(dayStart) > -1) {
        ret[0] = true
      } else {
        ret[0] = false
      }
    } else {
      ret[0] = true
    }
    if (fil.length) {
      if ($ora.text().toLowerCase().includes(fil)) {
        ret[1] = true
      } else {
        ret[1] = false
      }
    } else {
      ret[1] = true
    }
    if (nth.length) {
      if (nth.includes(oraData.fcSeg.event.hanyadikora + '')) {
        ret[2] = true
      } else {
        ret[2] = false
      }
    } else {
      ret[2] = true
    }
    if (noTema && noTema.length) {
      if ((noTema == '0' && oraData.fcSeg.event.colorEnum == 6) ||
        (noTema == '1' && oraData.fcSeg.event.colorEnum == 9)) {
        ret[3] = true
      } else {
        ret[3] = false
      }
    } else {
      ret[3] = true
    }
    let ret_all = true
    $.each(ret, function (k, rr) {
      ret_all = ret_all && rr
    })
    return ret_all
  })
  return $orak.addClass(snipClassCell)
}
const delNextOra = function () {
  const $orak = findFilterOra()
  if ($orak.length == 0) {
    $snip.find('.' + snipClassTbStop).trigger('click')
    return false
  }
  if ($snip.find('.' + snipClassTbStop).hasClass(snipClassCell)) {
    return false
  }
  $snip.find('.' + snipClassTbVal).val($orak.length)
  const fctLen = $('.fc-title').length
  fnObsDisconnect()
  fnObsRow('#modOrarendiOraDeleteDay', function () {
    fnObsRow('.closeYesConfirm', function () {
      let iter = setInterval(function () {
        if ($('.fc-title').length == fctLen - 1) {
          clearInterval(iter)
          fnObsDisconnect()
          delNextOra()
        }
      }, 300)
      $(this).trigger('click')
    })
    $(this).trigger('click')
  })
  $orak.eq(0).trigger('click')
}
const napNextOra = function () {
  const $orak = findFilterOra()
  if ($orak.length == 0) {
    $snip.find('.' + snipClassTbStop).trigger('click')
    return false
  }
  if ($snip.find('.' + snipClassTbStop).hasClass(snipClassCell)) {
    return false
  }
  $snip.find('.' + snipClassTbVal).val($orak.length)
  const fctLen = $orak.length
  fnObsDisconnect()
  fnObsRow('#tanoraMuveletWindow', function () {
    $dial = $(this)
    $dial.find('[name="Tema_input"]')
      .trigger('focusin')
      .val($('.' + snipClassTbTop).val())
      .trigger('keyup')
      .trigger('focusout')
    if ($snip.find('.' + snipClassTbPres).val()[0] == '1') {
      $dial.find('.mulasztasGridColumnHeaderJelen').trigger('click')
    }
    if ($snip.find('.' + snipClassTbPres).val()[0] == '2') {
      $dial.find('[data-inputparentgrid="MulasztasokNaplozasaGrid"]').each(function () {
        const $self = $(this)
        const $act = $self.find('.activebar')
        if ($act.length == 0) {
          $self.find('li[val=1498]').trigger('click')
        }
      })
    }
    let submitTimer = setTimeout(function () {
      $dial.find('#naplozas').trigger('click')
    }, 200)
    let iter = setInterval(function () {
      if (findFilterOra().length == fctLen - 1) {
        clearInterval(iter)
        fnObsDisconnect()
        napNextOra()
      }
    }, 300)
  })
  $orak.eq(0).trigger('click')
}
