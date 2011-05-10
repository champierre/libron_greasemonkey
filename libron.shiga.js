// @name          libron Shiga module
// @author        sowt (http://sowt.on-air.ne.jp/)

var libron = libron ? libron : new Object();
libron.shiga = {
  name: '滋賀県',
  groups: ['県立図書館','大津・志賀地域','湖南地域','甲賀地域','東近江地域','湖東地域','湖北地域','湖西地域'],
  libraries: {
  'shiga':{'group':'県立図書館', 'name':'滋賀県立図書館', 'code':'1'},
  'ohtsu':{'group':'大津・志賀地域', 'name':'大津市立図書館', 'code':'2'},
  'kusatsu':{'group':'湖南地域', 'name':'草津市立図書館', 'code':'3'},
  //'moriyama':{'group':'湖南地域', 'name':'守山市立図書館', 'code':'4'},
	////理由は不明だが、横断検索に対応していない模様。守山市立図書館のウェブページからは検索できる('10/01/18)
  'rittou':{'group':'湖南地域', 'name':'栗東市立図書館', 'code':'5'},	//ISBN検索非対応
  'yasu':{'group':'湖南地域', 'name':'野洲市立図書館', 'code':'6'},
  'konan':{'group':'湖南地域', 'name':'湖南市立図書館', 'code':'36'},
  'koka':{'group':'甲賀地域', 'name':'甲賀市立図書館', 'code':'45'},
  'ohmihachiman':{'group':'東近江地域', 'name':'近江八幡市立図書館', 'code':'10'},
  'hino':{'group':'東近江地域', 'name':'日野町立図書館', 'code':'11'},
  'higashiohmi':{'group':'東近江地域', 'name':'東近江市立図書館', 'code':'12'},
  'ryuo':{'group':'東近江地域', 'name':'竜王町立図書館', 'code':'42'},
  'hikone':{'group':'湖東地域', 'name':'彦根市立図書館', 'code':'13'},	//ISBN検索非対応
  'koura':{'group':'湖東地域', 'name':'甲良町立図書館', 'code':'14'},
  'taga':{'group':'湖東地域', 'name':'多賀町立図書館', 'code':'15'},
  'aisho':{'group':'湖東地域', 'name':'愛荘町立図書館', 'code':'37'},
  'nagahama':{'group':'湖北地域', 'name':'長浜市立図書館', 'code':'16'},
  'nagahama_k':{'group':'湖北地域', 'name':'長浜市立湖北図書館', 'code':'20'},
  'nagahama_t':{'group':'湖北地域', 'name':'長浜市立高月図書館', 'code':'44'},
  'takashima':{'group':'湖西地域', 'name':'高島市立図書館', 'code':'41'}
  },
  checkLibrary: function(div, isbn){
    var url = 'http://cross.shiga-pref-library.jp/cgi-bin/shiga_hit.cgi';
    var data = 'isbn=' + isbn + '&LIBRARY='+ libron[selectedPrefecture].libraries[selectedLibrary].code;
    libron.shiga._checkLibrary(div, url, data);
  },
  _checkLibrary: function(div, url, data){
    GM_xmlhttpRequest({
      method:"POST",
      url: url,
      onload:function(res){

        var regex = /src="(.*?)"/im;
        var match = regex.exec(res.responseText);

        if(match && match[1]){
          var base = 'http://cross.shiga-pref-library.jp';
          var search_uri = base + match[1];
          GM_xmlhttpRequest({
            method:"GET",
            url: search_uri,
            onload:function(res){
            var regex = /size="\+1">(\d*)<\/font>/im;
            var match = regex.exec(res.responseText);
            if(match && match[1] > 0){
              addLink(div, search_uri);
            }
            else{
              addNALink(div, search_uri);
            }
          },
          });
        }
      },
      data: data
    });
  }
};

