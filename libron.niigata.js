// @name libron Niigata module
// @author Shinichiro Oguma(http://github.com/ogumashin)

var libron = libron ? libron : new Object();
libron.niigata = {
  name: '新潟県',
  groups: ['県立の図書館', 'Aグループ','Bグループ','政令指定都市','その他'],
  libraries: {
  // ISBNで検索すると、エラーを返す図書館をコメントアウト
  'niigata':{'group':'政令指定都市', 'name':'新潟市の図書館', 'code':'LIBSEL0', 'key':'NIIGATA'},
  },
  searchId : [],
  checkLibrary: function(div, isbn){
    var base = 'http://opac.niigatacitylib.jp/cgi-bin/Sopcsken.sh';
    var url = '?p_mode=1&g_mode=0&ryno=&c_key=&c_date=&list_cnt=10&mad_list_cnt=&brws=ncdet&ktyp9=shk|atk|spk|kek&itfg9=c&ser_type=0&stkb=&tgid=tyo%3A010A&sgid=spno&srsl1=1&srsl2=2&srsl3=3&ktyp0=shk|ser&key0=&itfg0=c&ron0=a&ktyp1=atk&key1=&itfg1=c&ron1=a&ktyp2=spk&key2=&itfg2=c&ron2=a&ktyp3=shk|atk|spk|kek|kjk|txt|ser&key3=&itfg3=c&ron3=a&ktyp4=kek|kjk&key4=&itfg4=c&kkey=&skey=&dispcnt=10&lckns=01&lckns=12&lckns=21&lckns=22&lckns=31&lckns=32&lckns=33&lckns=41&lckns=62&lckns=71&lckns=72&lckns=73&lckns=82&lckns=83&tkey=' + isbn;
    libron.niigata._getRedirectUrl(div, base, url);
  },
  _getRedirectUrl: function(div, base, url){
    setTimeout(function(){
    GM_xmlhttpRequest({
      method:"GET",
      url: base + url,
      onload:function(response){
        var i = response.responseText.indexOf("該当資料はありません");
        if (i != -1) {
            addNALink(div, base + url);
        } else {
            addLink(div, base + url);
        }
        return;
      },
    });
    }, Math.floor(Math.random()*10000));
  }
};
