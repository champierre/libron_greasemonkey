// @name          libron mie module
// @author        naoki.iimura (http://github.com/amatubu)

var libron = libron ? libron : new Object();
libron.mie = {
  name: '三重県',
  groups: ['県立','三重大','北勢(桑員)','北勢(三泗鈴亀)','中勢','松阪飯多','南勢志摩','伊賀','東紀州'],
  libraries: {
// 県立
  'mieken': {'group':'県立', 'name':'三重県立図書館', 'booking':1},

// 三重大
  'miedai': {'group':'三重大', 'name':'三重大学附属図書館', 'booking':0},

// 北勢(桑員)
  'kuwana':    {'group':'北勢(桑員)', 'name':'桑名市立中央図書館', 'booking':0},
  'tado':      {'group':'北勢(桑員)', 'name':'ふるさと多度文学館', 'booking':1},
  'nagashima': {'group':'北勢(桑員)', 'name':'長島輪中図書館', 'booking':0},
  'hokusei':   {'group':'北勢(桑員)', 'name':'いなべ市北勢図書館', 'booking':0},
  'inabe':     {'group':'北勢(桑員)', 'name':'いなべ市員弁図書館', 'booking':0},
  'daian':     {'group':'北勢(桑員)', 'name':'いなべ市大安図書館', 'booking':0},
  'fujiwara':  {'group':'北勢(桑員)', 'name':'いなべ市藤原図書館', 'booking':0},
  'touin':     {'group':'北勢(桑員)', 'name':'東員町立図書館', 'booking':0},

// 北勢(三泗鈴亀)
  'yokkaichi': {'group':'北勢(三泗鈴亀)', 'name':'四日市市立図書館', 'booking':0},
  'kusu':      {'group':'北勢(三泗鈴亀)', 'name':'四日市市楠公民館図書室', 'booking':0},
  'asake':     {'group':'北勢(三泗鈴亀)', 'name':'あさけプラザ図書館', 'booking':0},
  'komono':    {'group':'北勢(三泗鈴亀)', 'name':'菰野町図書館', 'booking':1},
  'asahi':     {'group':'北勢(三泗鈴亀)', 'name':'あさひライブラリー', 'booking':0},
  'kawagoe':   {'group':'北勢(三泗鈴亀)', 'name':'川越町あいあいセンター図書室', 'booking':0},
  'suzuka':    {'group':'北勢(三泗鈴亀)', 'name':'鈴鹿市立図書館', 'booking':0},
  'kameyama':  {'group':'北勢(三泗鈴亀)', 'name':'亀山市立図書館', 'booking':0},

// 中勢
  'tsu':      {'group':'中勢', 'name':'津市津図書館', 'booking':0},
  'hisai':    {'group':'中勢', 'name':'津市久居ふるさと文学館', 'booking':0},
  'kawage':   {'group':'中勢', 'name':'津市河芸図書館', 'booking':0},
  'geinou':   {'group':'中勢', 'name':'津市芸濃図書館', 'booking':0},
  'misato':   {'group':'中勢', 'name':'津市美里図書館', 'booking':0},
  'anou':     {'group':'中勢', 'name':'津市安濃図書館', 'booking':0},
  'kirameki': {'group':'中勢', 'name':'津市きらめき図書館', 'booking':0},
  'ichishi':  {'group':'中勢', 'name':'津市一志図書館', 'booking':0},
  'uguisu':   {'group':'中勢', 'name':'津市うぐいす図書館', 'booking':0},

// 松阪飯多
  'matsusaka': {'group':'松阪飯多', 'name':'松阪市松阪図書館', 'booking':0},
  'ureshino':  {'group':'松阪飯多', 'name':'松阪市嬉野図書館', 'booking':0},
//  'mikumo':  {'group':'松阪飯多', 'name':'松阪市三雲公民館図書室', 'booking':0},
  'taki':      {'group':'松阪飯多', 'name':'多気町立多気図書館', 'booking':0},
  'seiwa':     {'group':'松阪飯多', 'name':'多気町立勢和図書館', 'booking':0},
  'meiwa':     {'group':'松阪飯多', 'name':'明和町立図書館', 'booking':0},
  'odai':      {'group':'松阪飯多', 'name':'大台町立図書館', 'booking':0},

// 南勢志摩
  'ise':   {'group':'南勢志摩', 'name':'伊勢市立伊勢図書館', 'booking':0},
  'obata': {'group':'南勢志摩', 'name':'伊勢市立小俣図書館', 'booking':0},
  'toba':  {'group':'南勢志摩', 'name':'鳥羽市立図書館', 'booking':0},
  'shima': {'group':'南勢志摩', 'name':'志摩市立志摩図書館', 'booking':0},
  'ago':   {'group':'南勢志摩', 'name':'志摩市立阿児図書館', 'booking':0},
  'isobe': {'group':'南勢志摩', 'name':'志摩市立磯部図書館', 'booking':0},

// 伊賀
  'iga':    {'group':'伊賀', 'name':'伊賀市上野図書館', 'booking':0},
  'nabari': {'group':'伊賀', 'name':'名張市立図書館', 'booking':0},

// 東紀州
  'owase':  {'group':'東紀州', 'name':'尾鷲市立図書館', 'booking':0},
  'kumano': {'group':'東紀州', 'name':'熊野市立図書館', 'booking':0},
  'udono':  {'group':'東紀州', 'name':'紀宝町立鵜殿図書館', 'booking':0},
  },
  checkLibrary: function(div, isbn){
    if(libron[selectedPrefecture].libraries[selectedLibrary].name == "三重県立図書館") {
      postdata = "code_genre1=2&code_value1=" + isbn + "&library_name1=dummy&area_check1=dummy&area1=dummy&possess_division1=dummy&newarv11=dummy&tkd_poss1=dummy&classflg=0";
      baseurl = "https://www9.milai.pref.mie.jp/MEPLIB/servlet/search.result";
      naurl = "http://www.milai.pref.mie.jp/mie-lib/";
      libron.mie._checkLibraryMieken(div, baseurl, postdata, naurl);
    } else {
      postdata = "code_genre1=2&code_value1=" + isbn + "&data_division1=dummy&area_check1=dummy&possess_division1=dummy&title_kind1=dummy&medium_kind1=dummy&newarvl1=dummy&tkd_poss1=dummy&classflg=0";
      baseurl = "https://idx.milai.pref.mie.jp/MEPUTL/servlet/search.result";
      naurl = "http://www.milai.pref.mie.jp/";
      libron.mie._checkLibrary(div, baseurl, postdata, naurl);
    }
  },
  _checkLibraryMieken: function(div, baseurl, postdata, naurl) {
    GM_xmlhttpRequest({
      method: "POST",
      headers: {'Content-type': 'application/x-www-form-urlencoded;'},
      url: baseurl,
      data: postdata,
      onload: function(response){
        var regex = /HREF=\"\.\/(search.detail_list\?.*?)\"/im;
        var match = regex.exec(response.responseText);

        if (match && match[1]){
          var linkurl = "https://www9.milai.pref.mie.jp/MEPLIB/servlet/" + match[1];
          addLink(div, linkurl);
        } else {
          addNALink(div, naurl);
        }
      },
      onerror: function(response){
        addERLink(div, naurl);
      }
    });
  },
  _checkLibrary: function(div, baseurl, postdata, naurl) {
    GM_xmlhttpRequest({
      method: "POST",
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      url: baseurl,
      data: postdata,
      onload: function(response){
        var regex = /HREF=\"\.\/(search.detail_list\?.*?)\"/im;
        var match = regex.exec(response.responseText);

        if(match && match[1]) {
          var linkurl = "https://idx.milai.pref.mie.jp/MEPUTL/servlet/" + match[1];
          var libname = libron[selectedPrefecture].libraries[selectedLibrary].name;
          GM_xmlhttpRequest({
            method: "GET",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            url: linkurl,
            onload: function(response){
              var i = response.responseText.indexOf("<STRONG>　" + libname + "</STRONG>");
              if (i != -1) {
                if (libron[selectedPrefecture].libraries[selectedLibrary].booking == 1){
                  addLink(div, linkurl);
                } else {
                  addAvailableLink(div, linkurl);
                }
              } else {
                addNALink(div, linkurl);
              }
            },
            onerror: function(response){
              addERLink(div, naurl);
            }
          });
        } else {
          addNALink(div, naurl);
        }
      },
      onerror: function(response){
        addERLink(div, naurl);
      }
    });
  }
};