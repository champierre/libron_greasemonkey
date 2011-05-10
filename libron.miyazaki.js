// @name          libron Miyazaki module
// @author        Seiya ISHIMARU (http://github.com/ishimaru-s)

// 【未対応情報】
// 1. ISBNチェックディジットによる問題。（チェックディジット部がISBN-13のもの）
//    ※ ISBN-13対応以前の出版物は問題なし。
//    →宮崎市立佐土原図書館, 串間市立図書館, 三股町立図書館, 国富町立図書館, 綾てるは図書館, 都農町民図書館, 宮崎公立大学附属図書館
// 2. ISBN未登録書籍による問題。
//    →串間市立図書館
// 3. 横断検索システムの不具合。
//    →都城市立図書館, 延岡市立図書館

var libron = libron ? libron : new Object();
libron.miyazaki = {
  name: '宮崎県',
  groups: ['県', '市', '北諸県郡', '東諸県郡', '児湯郡', '東臼杵郡', '西臼杵郡', '大学'],
  libraries: {
// 公共図書館
    'miyazaki-p': {'group':'県', 'name':'宮崎県立図書館', 'opac':'Ilis21', 'url':'https://www.lib.pref.miyazaki.lg.jp/'},
    'miyazaki': {'group':'市', 'name':'宮崎市立図書館', 'opac':'Ilis21', 'url':'http://www.city.miyazaki.miyazaki.jp/library/'},
    'sadowara': {'group':'市', 'name':'宮崎市立佐土原図書館', 'opac':'Clis', 'url':'http://www.sadowara-lib.jp/'},
//  'miyakonojo': {'group':'市', 'name':'都城市立図書館', 'opac':'Miyazaki', 'url':''},
//  'nobeoka': {'group':'市', 'name':'延岡市立図書館', 'opac':'', 'url':'http://www.lib.city.nobeoka.miyazaki.jp/'},
//  'nichinan': {'group':'市', 'name':'日南市立図書館', 'opac':'', 'url':''},
    'kobayashi': {'group':'市', 'name':'小林市立図書館', 'opac':'Miyazaki', 'url':''},
    'hyuga': {'group':'市', 'name':'日向市立図書館', 'opac':'Miyazaki', 'url':'https://www.lib.city.hyuga.miyazaki.jp/'},
    'kushima': {'group':'市', 'name':'串間市立図書館', 'opac':'Miyazaki', 'url':'http://www.kushima-lib.jp/'},
    'saito': {'group':'市', 'name':'西都市立図書館', 'opac':'Miyazaki', 'url':''},
//  'ebino': {'group':'市', 'name':'えびの市民図書館', 'opac':'', 'url':''},
    'mimata': {'group':'北諸県郡', 'name':'三股町立図書館', 'opac':'Ilis21', 'url':'http://library.town.mimata.miyazaki.jp/'},
    'kunitomi': {'group':'東諸県郡', 'name':'国富町立図書館', 'opac':'Miyazaki', 'url':'http://libjrn.town.kunitomi.miyazaki.jp/'},
    'aya': {'group':'東諸県郡', 'name':'綾てるは図書館', 'opac':'Ilis21', 'url':'http://lib.town.aya.miyazaki.jp/'},
    'kawaminami': {'group':'児湯郡', 'name':'川南町立図書館', 'opac':'Ilis21', 'url':'http://lib.town.kawaminami.miyazaki.jp/'},
    'tsuno': {'group':'児湯郡', 'name':'都農町民図書館', 'opac':'Miyazaki', 'url':'http://lib.town.tsuno.miyazaki.jp/'},
    'kadogawa': {'group':'東臼杵郡', 'name':'門川町立図書館', 'opac':'Ilis21', 'url':'http://www.kadogawa-lib.jp/'},
//  'takachiho': {'group':'西臼杵郡', 'name':'高千穂町立図書館', 'opac':'', 'url':''},

// 大学図書館
    'uom': {'group':'大学', 'name':'宮崎大学附属図書館', 'opac':'Miyazaki', 'url':''},
    'mmu': {'group':'大学', 'name':'宮崎公立大学附属図書館', 'opac':'Miyazaki', 'url':''},
//  'msu': {'group':'大学', 'name':'宮崎産業経営大学附属図書館', 'opac':'', 'url':'http://furujyo.miyasankei-u.ac.jp/'},
//  'mic': {'group':'大学', 'name':'宮崎学園図書館', 'opac':'', 'url':''},
    'mku': {'group':'大学', 'name':'南九州大学・南九州短期大学図書館', 'opac':'Nalis', 'url':'http://mint-6.nankyudai.ac.jp/'},
//  'mpu': {'group':'大学', 'name':'宮崎県立看護大学附属図書館', 'opac':'', 'url':''},
//  'kuhw': {'group':'大学', 'name':'九州保健福祉大学附属図書館', 'opac':'', 'url':''},
  },
  checkLibrary: function(div, isbn) {
    libron[selectedPrefecture]['checkLibrary' + libron[selectedPrefecture].libraries[selectedLibrary].opac](div, isbn);
  },

// [FUJITSU] iLiswing21/UX+
  checkLibraryIlis21: function(div, isbn) {
    var url = libron[selectedPrefecture].libraries[selectedLibrary].url;
    if(selectedLibrary == 'miyazaki') {
      var topUrl = url + 'cgi-bin/Smycsmin.sh';
      var resUrl = url + 'cgi-bin/Smycsken.sh?srsl1=1&srsl2=2&srsl3=3&tgid=tyo:010A&tkey=' + isbn;
    } else {
      var topUrl = url + 'cgi-bin/Sopcsmin.sh';
      var resUrl = url + 'cgi-bin/Sopcsken.sh?srsl1=1&srsl2=2&srsl3=3&tgid=tyo:010A&tkey=' + isbn;
    }
    GM_xmlhttpRequest({
      method: 'POST',
      url: resUrl,
      onload: function(res) {
        try {
          var htmldoc = parseHTML(res.responseText);
          if(res.finalUrl) {
            this.requestURL = res.finalUrl;
          }
          relativeToAbsolutePath(htmldoc, this.requestURL);
        } catch(e) {
          return;
        }
        var links = $X('//a[starts-with(@onclick, \'dispDetail\')]', htmldoc);
        if(links.length > 0) {
          addLink(div, resUrl);
        } else {
          addNALink(div, topUrl);
        }
      }
    });
  },

// [NTT DATA] NALIS
  checkLibraryNalis: function(div, isbn) {
    var url = libron[selectedPrefecture].libraries[selectedLibrary].url;
    var resUrl = url + 'cgi-bin/opc/seek.cgi?isbn=' + isbn + '&search_type=detail';
    var topUrl = url + 'opc/';
    GM_xmlhttpRequest({
      method: 'GET',
      url: resUrl,
      onload: function(res) {
        if(res.responseText.indexOf('検索に該当する書誌情報はありませんでした。') == -1) {
          addLink(div, resUrl);
        } else {
          addNALink(div, topUrl);
        }
      }
    });
  },

// [SDC] CLIS/400
  checkLibraryClis: function(div, isbn) {
    var url = libron[selectedPrefecture].libraries[selectedLibrary].url;
    var resUrl = url + 'cgi-bin/search/Search.dll?EcSearch';
    var data = 'max=1&sry1=1&sry2=1&sry3=1&sry4=1&sry5=1&isbnno=' + isbn;
    GM_xmlhttpRequest({
      method: 'POST',
      url: resUrl,
      onload: function(res) {
        try {
          var htmldoc = parseHTML(res.responseText);
          if(res.finalUrl) {
            this.requestURL = res.finalUrl;
          }
          relativeToAbsolutePath(htmldoc, this.requestURL);
        } catch(e) {
          return;
        }
        var links = $X('//a', htmldoc);
        if(links.length == 5) {
          var link = links[2];
          addLink(div, link);
        } else if (links.length > 5) {
          var link = resUrl + '&' + data;
          addLink(div, link);
        } else {
          addNALink(div, url);
        }
      },
      data: data
    });
  },

// 宮崎県内図書館横断検索
  checkLibraryMiyazaki: function(div, isbn) {
    var code;
    switch(libron[selectedPrefecture].libraries[selectedLibrary].group) {
      case '県':
        code = 'prefmiyazaki';
        break;
      case '市':
        if(selectedLibrary == 'sadowara') {
          code = 'townsadowara';
        } else {
          code = 'city' + selectedLibrary;
        }
        break;
      case '大学':
        if(selectedLibrary == 'uom') {
          code = 'univmiyazaki';
        } else if(selectedLibrary == 'mmu') {
          code = 'univkoritsu';
        }
        break;
      default:
        code = 'town' + selectedLibrary;
        break;
    }
    var resUrl = 'http://www2.lib.pref.miyazaki.lg.jp/cgi-bin/ilisod/tougou_odsearch_plus.sh';
    var topUrl = 'http://www2.lib.pref.miyazaki.lg.jp/cgi-bin/ilisod/odplus.sh';
    var data = 'GROUP_A=&INPUTCODE=UTF8&SRCKIND=4&U_CHARSET=utf-8&all_title=&author1=&author1m=1&class1=&dbflg=1&dbsort=' + code + '&errortpl=&isbn=' + isbn + '&lang=japanese&pubdate1=&pubdate2=&publish=&sortname=title&subject=&successtpl=&title1=&title1m=1&title1r=1&title2=&title2m=1&title2r=1&title3=&title3m=1&mergflg=1';
    GM_xmlhttpRequest({
      method: 'GET',
      url: topUrl,
      onload: function(res) {
        GM_xmlhttpRequest({
          method: 'POST',
          url: resUrl,
          onload: function(res) {
            try {
              var htmldoc = parseHTML(res.responseText);
              if(res.finalUrl) {
                this.requestURL = res.finalUrl;
              }
              relativeToAbsolutePath(htmldoc, this.requestURL);
            } catch(e) {
              return;
            }
            var forms = $X('//form', htmldoc);
            if(forms.length > 1) {
              var resolver = path_resolver(this.requestURL);
              var form = forms[1];
              form.id = randomString('0123456789abcdefghijklmnopqrstuvwxyz', 10);
              form.action = resolver(form.getAttribute('action'));
              form.target = '_blank';
              form.setAttribute('accept-charset', 'utf-8');
              addForm(div, form);
            } else {
              addNALink(div, topUrl);
            }
          },
          data: data
        });
      }
    });
  }
};
