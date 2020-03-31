var config = require('./config');
var fs =require('fs');
// nodeのコアモジュールのhttpを使う
var http = require('http');
var server = http.createServer();
var msg;

server.on('request', function(req, res) {
    // ファイルを読み込む処理は時間がかかるので、callbackにして、ノンブロッキング処理にする
    fs.readFile(__dirname + '/hello.html', 'utf-8', function (err, data) {
        // エラー発生時
        if (err) {
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.write('page not found');
            // returnを使って、ここで処理を終了させる
            return res.end();
        }

        // 表示させるのはtextじゃなくて、htmlなので、text/htmlにする
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(data);
        res.end();
});
});
// サーバを待ち受け状態にする
// 第1引数: ポート番号
// 第2引数: IPアドレス
server.listen(config.port);

