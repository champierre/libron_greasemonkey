// ==UserScript==
// @name          libron
// @namespace     http://libron.net
// @description	  Amazon のページから最寄りの図書館の蔵書を検索
// @author        Junya Ishihara(http://github.com/champierre)
// @include       http://www.amazon.*
// @require       http://github.com/champierre/libron/raw/master/libron.tokyo.js
// @require       http://github.com/champierre/libron/raw/master/libron.osaka.js
// @require       http://github.com/champierre/libron/raw/master/libron.kyoto.js
// @require       http://github.com/champierre/libron/raw/master/libron.kanagawa.js
// @require       http://github.com/champierre/libron/raw/master/libron.chiba.js
// @require       http://github.com/champierre/libron/raw/master/libron.hyogo.js
// @require       http://github.com/champierre/libron/raw/master/libron.gifu.js
// @require       http://github.com/champierre/libron/raw/master/libron.saitama.js
// @require       http://github.com/champierre/libron/raw/master/libron.mie.js
// @require       http://github.com/champierre/libron/raw/master/libron.niigata.js
// @require       http://github.com/champierre/libron/raw/master/libron.miyazaki.js
// @require       http://github.com/champierre/libron/raw/master/libron.shiga.js
// @require       http://github.com/champierre/libron/raw/master/libron.aichi.js
// using [ simple version of $X   ] (c) id:os0x
//       [ relativeToAbsolutePath ] (c) id:Yuichirou
//       [ parseHTML              ] copied from Pagerization (c) id:ofk
// merged with [ libron Osaka, Hyogo version ] (c) Mutsutoshi Yoshimoto(http://github.com/negachov)
// merged with [ libron Kyoto version ] (c) Takanobu Nishimura(http://github.com/takanobu)
// merged with [ libron Kanagawa version ] (c) Yukinori Suda(http://github.com/sudabon)
// merged with [ libron Gifu version ] (c)  Gifuron(http://github.com/gifuron)
// merged with [ libron Saitama version ] (c) MIKAMI Yoshiyuki(http://github.com/yoshuki)
//                                        (c) Akira Yoshida(acura1971@gmail.com)
// merged with [ libron Mie version ] (c) naoki.iimura(http://github.com/amatubu)
// merged with [ libron Niigata version ] (c) Shinichiro Oguma(http://github.com/ogumashin)
// merged with [ libron Miyazaki version ] (c) Seiya ISHIMARU (http://github.com/ishimaru-s)
// merged with [ libron Shiga version ] (c) sowt (http://sowt.on-air.ne.jp/)
// merged with [ libron Aichi version ] (c) noir.pur(noir.pur@gmail.com)
// thanks
// ==/UserScript==

var libron = libron ? libron : new Object();
libron.version = "1.97";

// http://ja.wikipedia.org/wiki/都道府県 の並び順
libron.prefectures = ['saitama', 'chiba', 'tokyo', 'kanagawa', 'niigata', 'gifu', 'aichi', 'mie', 'shiga', 'kyoto', 'osaka', 'hyogo', 'miyazaki'];

var okIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKfSURBVDjLpZPrS1NhHMf9O3bOdmwDCWRE'+
    'IYKEUHsVJBI7mg3FvCxL09290jZj2EyLMnJexkgpLbPUanNOberU5taUMnHZUULMvelCtWF0sW/n'+
    '7MVMEiN64AsPD8/n83uucQDi/id/DBT4Dolypw/qsz0pTMbj/WHpiDgsdSUyUmeiPt2+V7SrIM+b'+
    'Sss8ySGdR4abQQv6lrui6VxsRonrGCS9VEjSQ9E7CtiqdOZ4UuTqnBHO1X7YXl6Daa4yGq7vWO1D'+
    '40wVDtj4kWQbn94myPGkCDPdSesczE2sCZShwl8CzcwZ6NiUs6n2nYX99T1cnKqA2EKui6+TwphA'+
    '5k4yqMayopU5mANV3lNQTBdCMVUA9VQh3GuDMHiVcLCS3J4jSLhCGmKCjBEx0xlshjXYhApfMZRP'+
    '5CyYD+UkG08+xt+4wLVQZA1tzxthm2tEfD3JxARH7QkbD1ZuozaggdZbxK5kAIsf5qGaKMTY2lAU'+
    '/rH5HW3PLsEwUYy+YCcERmIjJpDcpzb6l7th9KtQ69fi09ePUej9l7cx2DJbD7UrG3r3afQHOyCo'+
    '+V3QQzE35pvQvnAZukk5zL5qRL59jsKbPzdheXoBZc4saFhBS6AO7V4zqCpiawuptwQG+UAa7Ct3'+
    'UT0hh9p9EnXT5Vh6t4C22QaUDh6HwnECOmcO7K+6kW49DKqS2DrEZCtfuI+9GrNHg4fMHVSO5kE7'+
    'nAPVkAxKBxcOzsajpS4Yh4ohUPPWKTUh3PaQEptIOr6BiJjcZXCwktaAGfrRIpwblqOV3YKdhfXO'+
    'IvBLeREWpnd8ynsaSJoyESFphwTtfjN6X1jRO2+FxWtCWksqBApeiFIR9K6fiTpPiigDoadqCEag'+
    '5YUFKl6Yrciw0VOlhOivv/Ff8wtn0KzlebrUYwAAAABJRU5ErkJggg==';

var ngIcon = 'data:image/png;base64,'+
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0'+
    'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVDjLpZNraxpBFIb3a0ggISmmNISW'+
    'XmOboKihxpgUNGWNSpvaS6RpKL3Ry//Mh1wgf6PElaCyzq67O09nVjdVlJbSDy8Lw77PmfecMwZg'+
    '/I/GDw3DCo8HCkZl/RlgGA0e3Yfv7+DbAfLrW+SXOvLTG+SHV/gPbuMZRnsyIDL/OASziMxkkKkU'+
    'QTJJsLaGn8/iHz6nd+8mQv87Ahg2H9Th/BxZqxEkEgSrq/iVCvLsDK9awtvfxb2zjD2ARID+lVVl'+
    'babTgWYTv1rFL5fBUtHbbeTJCb3EQ3ovCnRC6xAgzJtOE+ztheYIEkqbFaS3vY2zuIj77AmtYYDu'+
    'sPy8/zuvunJkDKXM7tYWTiyGWFjAqeQnAD6+7ueNx/FLpRGAru7mcoj5ebqzszil7DggeF/DX1nB'+
    'N82rzPqrzbRayIsLhJqMPT2N83Sdy2GApwFqRN7jFPL0tF+10cDd3MTZ2AjNUkGCoyO6y9cRxfQo'+
    'wFUbpufr1ct4ZoHg+Dg067zduTmEbq4yi/UkYidDe+kaTcP4ObJIajksPd/eyx3c+N2rvPbMDPbU'+
    'FPZSLKzcGjKPrbJaDsu+dQO3msfZzeGY2TCvKGYQhdSYeeJjUt21dIcjXQ7U7Kv599f4j/oF55W4'+
    'g/2e3b8AAAAASUVORK5CYII=';

var loadingIcon = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPQAAP///zMzM/n5+V9fX5ycnDc3N1FRUd7e3rm5uURERJGRkYSEhOnp6aysrNHR'+
    '0WxsbHd3dwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH+GkNy'+
    'ZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAA'+
    'EAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla'+
    '+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAAKAAEALAAAAAAQABAAAAVoICCKR9KM'+
    'aCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr'+
    '6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkEAAoAAgAsAAAAABAA'+
    'EAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoL'+
    'LoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkEAAoAAwAsAAAA'+
    'ABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7'+
    'baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAAKAAQALAAAAAAQABAAAAVgICCO'+
    'ZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYA'+
    'qrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAAKAAUALAAAAAAQABAAAAVf'+
    'ICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0Ua'+
    'FBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==';

var selectedLibrary;
var selectedPrefecture;

function initialize() {
  selectedPrefecture = GM_getValue("prefecture") || 'tokyo';
  selectedLibrary = GM_getValue("library") || 'tokyo';
  if (!libron[selectedPrefecture].libraries[selectedLibrary]) {
    selectedPrefecture = 'tokyo';
    selectedLibrary = 'tokyo';
  }
}

function addSelectBox() {
  var div = document.createElement("div");
  div.style.textAlign = "right";
  div.style.backgroundColor = "#ffffcc";
  div.style.padding = "3px 3px 3px 0";

  var titleDiv = document.createElement("div");
  titleDiv.id = "libron_title";

　　var titleSpan = document.createElement("span");
  titleSpan.innerHTML = "Libron ver." + libron.version + " ";
  titleSpan.style.fontWeight = "bold";
  titleSpan.style.color = "#e47911";

  var currentLibrary = document.createElement("span");
  currentLibrary.innerHTML = "[" + libron[selectedPrefecture].name + "]" + libron[selectedPrefecture].libraries[selectedLibrary].name + "で検索 "
  currentLibrary.style.color = "#666666";

  var showLink = document.createElement("a");
  showLink.href = "javascript:void(0);";
  showLink.addEventListener("click", showSelectBox, false);
  showLink.innerHTML = "変更";

  titleDiv.appendChild(titleSpan);
  titleDiv.appendChild(currentLibrary);
  titleDiv.appendChild(showLink);

  var selectBoxDiv = document.createElement("div");
  
  var prefectureSelect = document.createElement("select");
  prefectureSelect.style.marginLeft = "10px";

  for (var i in libron.prefectures) {    
    var option = document.createElement('option');
    option.value = libron.prefectures[i];
    option.innerHTML = libron[libron.prefectures[i]].name;
    if (libron.prefectures[i] == selectedPrefecture) {
      option.selected = true;
    }
    prefectureSelect.appendChild(option);
  }

  var select = createLibrarySelectBox(selectedPrefecture);

  var btn = document.createElement("button");
  btn.style.marginLeft = "10px";
  btn.innerHTML = "保存";

  var hideLink = document.createElement("a");
  hideLink.style.margin = "0 0 0 3px";
  hideLink.href = "javascript:void(0);";
  hideLink.addEventListener("click", hideSelectBox, false);
  hideLink.innerHTML = "キャンセル";

  selectBoxDiv.appendChild(prefectureSelect);
  selectBoxDiv.appendChild(select);
  selectBoxDiv.appendChild(btn);
  selectBoxDiv.appendChild(hideLink);
  selectBoxDiv.id = "libron_select_box";
  selectBoxDiv.style.display = "none";

  prefectureSelect.addEventListener("change", function(){
    selectedPrefecture = prefectureSelect.value;
    savePrefecture(prefectureSelect.value);
    selectBoxDiv.replaceChild(createLibrarySelectBox(prefectureSelect.value), selectBoxDiv.childNodes[1]);
  }, false);

  div.appendChild(titleDiv);
  div.appendChild(selectBoxDiv);

  // iframe内にはセレクトボックスを表示しない
  if (parent == self) {
    document.body.insertBefore(div, document.body.childNodes[0]);
  }

  btn.addEventListener("click", function(){
    saveLibrary(selectBoxDiv.childNodes[1].value);
    window.location.reload();
  }, false);
}

function showSelectBox() {
  document.getElementById('libron_title').style.display = 'none';
  document.getElementById('libron_select_box').style.display = 'block';
  return false;
}

function hideSelectBox() {
  document.getElementById('libron_title').style.display = 'block';
  document.getElementById('libron_select_box').style.display = 'none';
  return false;
}

function createLibrarySelectBox(prefecture) {
  var select = document.createElement("select");
  select.style.marginLeft = "10px";
  
  var optGroups = {};
  for (var i in libron[prefecture].groups) {
    optGroups[libron[prefecture]['groups'][i]] = document.createElement('optgroup');
    optGroups[libron[prefecture]['groups'][i]].label = libron[prefecture]['groups'][i];
  }

  for (var k in libron[prefecture].libraries) {
    var option = document.createElement('option');
    option.value = k;
    option.innerHTML = libron[prefecture].libraries[k]['name'];
    
    if (k == selectedLibrary) {
      option.selected = true;
    }
    
    optGroups[libron[prefecture].libraries[k]['group']].appendChild(option);  
  }

  for (var i in libron[prefecture].groups) {
    select.appendChild(optGroups[libron[prefecture]['groups'][i]]);
  }

  return select;
}

function libraryLinky(){
  var href = document.location.href;
  var matched = href.match(/\/(dp|ASIN|product)\/([\dX]{10})/);
  if (matched && matched[2]) {
    var isbn = matched[2];
    var div = document.getElementById('btAsinTitle').parentNode.parentNode;
    addLoadingIcon(div);
    libron[selectedPrefecture].checkLibrary(div, isbn);
  } else if ((href.indexOf('/s/') != -1) || (href.indexOf('/exec/') != -1) || (href.indexOf('/gp/search') != -1)){
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
      var div = divs[i];
      if (div.className.indexOf("productTitle") != -1) {
        var link = div.getElementsByTagName('a')[0];
        if (link) {
          var matched = link.href.match(/\/dp\/([\dX]{10})\/ref/);
          if (matched && matched[1]) {
            var isbn = matched[1];
            addLoadingIcon(div);
            libron[selectedPrefecture].checkLibrary(div, isbn);
          }
        }
      }
    }
  }
}

// Format ISBN like 4120031977 => 4-12-003197-7
function formatIsbn(str) {
  return str.replace(/(\d{1})(\d{2})(\d{6})([\d{1}X])/, "$1-$2-$3-$4");
}

function parseHTML(str) {
  str = str.replace(parseHTML.reg, '');
  var res;
  try {
    res = document.cloneNode(false);
    res.appendChild(res.importNode(document.documentElement, false));
  }
  catch(e) {
    res = document.implementation.createDocument(null, 'html', null);
  }
  var range = document.createRange();
  range.setStartAfter(document.body);
  var fragment = range.createContextualFragment(str);
  try {
    fragment = res.adoptNode(fragment); //for Firefox3 beta4
  } catch (e) {
    fragment = res.importNode(fragment, true);
  }
  res.documentElement.appendChild(fragment);
  return res;
}
parseHTML.reg = /^[\s\S]*?<html(?:\s[^>]+?)?>|<\/html\s*>[\S\s]*$/ig;

function relativeToAbsolutePath(htmldoc, base){
  var resolver = path_resolver(base);

  $X("descendant-or-self::a", htmldoc)
    .forEach(function(elm) {
    if(elm.getAttribute("href")) elm.href = resolver(elm.getAttribute("href"));
  });
  $X("descendant-or-self::img", htmldoc)
    .forEach(function(elm) {
    if(elm.getAttribute("src")) elm.src = resolver(elm.getAttribute("src"));
  });
  $X("descendant-or-self::embed", htmldoc)
    .forEach(function(elm) {
    if(elm.getAttribute("src")) elm.src = resolver(elm.getAttribute("src"));
  });
  $X("descendant-or-self::object", htmldoc)
    .forEach(function(elm) {
    if(elm.getAttribute("data")) elm.data = resolver(elm.getAttribute("data"));
  });
}

function path_resolver(base){
  var XHTML_NS = "http://www.w3.org/1999/xhtml"
  var XML_NS   = "http://www.w3.org/XML/1998/namespace"
  var a = document.createElementNS(XHTML_NS, 'a')
  a.setAttributeNS(XML_NS, 'xml:base', base)
  return function(url){
    a.href = url;
    return a.href;
  }
}

function $X (exp, context) {
	context || (context = document);
	var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
			context.namespaceURI || document.documentElement.namespaceURI || "";
	});

	var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
		switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
				// not ensure the order.
				var ret = [], i = null;
				while (i = result.iterateNext()) ret.push(i);
				return ret;
		}
	return null;
}

function addLoadingIcon(div) {
  var loadingIconDiv = document.createElement('div');
  loadingIconDiv.setAttribute('class', 'libron_loading_icon');
  loadingIconDiv.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc; color:#666;\">図書館を検索中</span> <image src="' + loadingIcon + '">';
  div.appendChild(loadingIconDiv);
}

function removeLoadingIcon(div) {
  for (i = 0; i < div.childNodes.length; i++) {
    if (div.childNodes[i].className == 'libron_loading_icon') {
      div.removeChild(div.childNodes[i]);
    }
  }
}

function addLink(div, url, target) {
  target = target || '_blank';
  var link = document.createElement('div');
  link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\"><a target="' + target + '" href="' + url + '">&raquo; ' + libron[selectedPrefecture].libraries[selectedLibrary].name + 'で予約</a></span>' +
    '<image src="' + okIcon + '">';
  removeLoadingIcon(div);
  div.appendChild(link);
}

function addAvailableLink(div, url) {
  var link = document.createElement('div');
  link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\"><a target="_blank" href="' + url + '">&raquo; ' + libron[selectedPrefecture].libraries[selectedLibrary].name + 'に蔵書あり</a></span>' +
    '<image src="' + okIcon + '">';
  removeLoadingIcon(div);
  div.appendChild(link);
}

function addNALink(div, url, target) {
  target = target || '_blank';
  var link = document.createElement('div');
  link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\"><a target="' + target + '" href="' + url + '">&raquo; ' + libron[selectedPrefecture].libraries[selectedLibrary].name + 'には見つかりません</a></span>' +
    '<image src="' + ngIcon + '">';
  removeLoadingIcon(div);
  div.appendChild(link);
}

function addERLink(div, url, target) {
  target = target || '_blank';
  var link = document.createElement('div');
  link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\"><a target="' + target + '" href="' + url + '">&raquo; エラーが発生しました</a></span>'　+
    '<image src="' + ngIcon + '">';
  removeLoadingIcon(div);
  div.appendChild(link);
}

function addForm(div, form) {
  var link = document.createElement('div');
  link.innerHTML = '<span style=\"font-size:90%; background-color:#ffffcc;\"><a href="javascript:void(0);" onclick="document.forms[\'' + form.id + '\'].submit();">&raquo; ' + libron[selectedPrefecture].libraries[selectedLibrary].name + 'で予約</a></span>' +
    '<image src="' + okIcon + '">';
  removeLoadingIcon(div);
  div.appendChild(link);
  div.appendChild(form);
}

function randomString(c,n){
  var s='';
  while(n--){
    s += (c.split(''))[parseInt(Math.random()*c.length)];
  }
  return s;
}

function savePrefecture(value){
  GM_setValue("prefecture", value);
}

function saveLibrary(value){
  GM_setValue("library", value);
}

initialize();
addSelectBox();
libraryLinky();
