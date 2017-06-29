"use strict";
exports.__esModule = true;
var request = require("request");
var express = require("express");
var bodyParser = require("body-parser");
var ChiwawaConfig_1 = require("./ChiwawaConfig");
var SampleBot = (function () {
    function SampleBot() {
        this.config = ChiwawaConfig_1.ChiwawaConfig.getInstance();
        // Webサーバインスタンス化
        this.app = express();
        // bodyのエンコード設定
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        // bodyのJSONパース設定
        this.app.use(bodyParser.json());
    }
    /**
     * 鸚鵡返しBOTをセットアップ
     */
    SampleBot.prototype.setupParrot = function () {
        var _this = this;
        // POSTリスナを追加
        this.addWebhookListener(this.config.server.path, function (request, response) {
            var body = request.body;
            console.dir(body);
            // メッセージを投稿
            _this.postMessage(body.message.groupId, body.message.text, function (error, response, body) {
                // メッセージ投稿成功
                console.log('Post succeed!!');
                console.dir(body);
            }, function (error, response, body) {
                // メッセージ投稿失敗
                console.log('Post failed...');
                console.dir(error);
            });
        });
    };
    /**
     * Webhook受付用サーバの起動
     */
    SampleBot.prototype.start = function () {
        this.app.listen(this.config.server.port);
    };
    /**
     * Webサーバにリスナを追加
     *
     * @param endpoint      リスナエンドポイント
     * @param callback      Webhookアクセス時のコールバック
     */
    SampleBot.prototype.addWebhookListener = function (endpoint, callback) {
        var _this = this;
        this.app.post(endpoint, function (req, res) {
            // Webhookの検証
            if (_this.config.verifyToken == req.headers['x-chiwawa-webhook-token']) {
                callback(req, res);
            }
            res.json({ 'result': 'ok' });
        });
    };
    /**
     * 非同期で知話輪にメッセージを投稿
     *
     * @param groupId       投稿先グループID
     * @param text          投稿するメッセージ本文
     * @param success       メッセージ投稿成功時のコールバック
     * @param failure       メッセージ投稿失敗時のコールバック
     */
    SampleBot.prototype.postMessage = function (groupId, text, success, failure) {
        var options = {
            uri: this.generatePostMessageUri(groupId),
            headers: {
                'X-Chiwawa-API-Token': this.config.apiToken
            },
            json: {
                'text': text
            }
        };
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                success(error, response, body);
            }
            else {
                failure(error, response, body);
            }
        });
    };
    /**
     * メッセージ投稿APIのURIを生成
     *
     * @param groupId       投稿先グループID
     * @returns {string}    URI
     */
    SampleBot.prototype.generatePostMessageUri = function (groupId) {
        return this.config.protocol
            + '://'
            + this.config.companyId
            + '.'
            + this.config.domain
            + this.config.chiwawaBaseUrl
            + '/groups/'
            + groupId
            + '/messages';
    };
    return SampleBot;
}());
exports.SampleBot = SampleBot;
