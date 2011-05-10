// @name          libron Aichi module
// @author        noir.pur(noir.pur@gmail.com)

// 1. freelist.asp：ISBN-13対応以降の出版物がISBN-10では検索できない
// 2. toslist.asp：上記出版物の検索はできるが、稲沢市、江南市のISBNによる検索レスポンスが非常に遅い
// 以上の理由により、freelist.aspで検索できない場合のみtoslist.aspで検索を行っています
// 一宮市はfreelist.asp、toslist.asp共にISBN-10では検索できない場合が多いため、コメントアウト

var libron = libron ? libron : new Object();
libron.aichi = {
  name: '愛知県',
  groups: ['名古屋地区','尾張地区','三河地区'],
  libraries: {
//    'ichinomiya':  {'group': '尾張地区', 'name': '一宮市図書館', 'httpMethod': 'GET'},
    'inazawa':  {'group': '尾張地区', 'name': '稲沢市図書館', 'httpMethod': 'GET'},
    'konan':    {'group': '尾張地区', 'name': '江南市図書館', 'httpMethod': 'GET'},
    'toyoake':    {'group': '尾張地区', 'name': '豊明市図書館', 'httpMethod': 'GET'},
    'tokoname':    {'group': '尾張地区', 'name': '常滑市図書館', 'httpMethod': 'GET'},
    'yatomi':    {'group': '尾張地区', 'name': '弥富市図書館', 'httpMethod': 'GET'},
  },
  checkLibrary: function(div, isbn) {
    var url;
    var data = formatIsbn(isbn);
    var match;

    switch (selectedLibrary) {
    case 'ichinomiya':
      url = 'http://www.lib.city.ichinomiya.aichi.jp/SerlsWeb/';
      match = 'class="listpt1"';
      break;
    case 'inazawa':
      url = 'http://www4.city.inazawa.aichi.jp/tosho/';
      match = 'class="listpt1"';
      break;
    case 'konan':
      url = 'http://lib.city-konan-aichi.jp/SerlsWeb/';
      match = 'class="listpt1"';
      break;
    case 'toyoake':
      url = 'http://tosho.city.toyoake.aichi.jp/SerlsSystem/';
      match = 'class="listpt1"';
      break;
    case 'tokoname':
      url = 'http://search.library.tokoname.aichi.jp/';
      match ='class="listpt1"';
      break;
    case 'yatomi':
      url = 'http://www.lib.city.yatomi.lg.jp/Serls/';
      match = 'class="upper"';
      break;
    }
    libron.aichi._checkLibrary(div, isbn, url, data, match);
  },
  _checkLibrary: function(div, isbn, url, data, match) {
    var httpMethod = libron.aichi.libraries[selectedLibrary].httpMethod;
    var requestUrlFree;
    var postDataFree;
    var requestUrlDetail;
    var postDataDetail;

    switch (httpMethod) {
    case 'GET':
      //フリーワード検索
      requestUrlFree = url + 'freelist.asp';
      if (data) requestUrlFree += '?freekey1=' + data;
      postDataFree = null;
      //詳細検索
      requestUrlDetail = url + 'toslist.asp';
      if (data) requestUrlDetail += '?isbnkey1=' + data;
      postDataDetail = null;
      break;
    case 'POST':
      requestUrlFree = url + 'freelist.asp';
      postDataFree = '?freekey1=' + data;
      requestUrlDetail = url + 'toslist.asp';
      postDataDetail = '?isbnkey1=' + data;
      break;
    }

    if (httpMethod && requestUrlFree) {
      GM_xmlhttpRequest({
        method: httpMethod,
        url: requestUrlFree,
        //フリーワード検索
        onload: function(res) {
          if (res.responseText.indexOf(match, 0) > -1) {
            addLink(div, url + 'freelist.asp?freekey1=' + data);
            return;
          } else {
            //フリーワード検索で見つからない場合、詳細検索を行う
            if (httpMethod && requestUrlDetail) {
              GM_xmlhttpRequest({
                method: httpMethod,
                url: requestUrlDetail,
                onload: function(res) {
                  if (res.responseText.indexOf(match, 0) > -1) {
                      addLink(div, url + 'toslist.asp?isbnkey1=' + data);
                  } else {
                      addNALink(div, url + 'toslist.asp?isbnkey1=' + data);
                  }
                },
                data: postDataDetail
              });
            }
          }
        },
        data: postDataFree
      });
    }
  }
};
