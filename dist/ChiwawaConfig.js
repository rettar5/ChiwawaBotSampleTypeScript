"use strict";
exports.__esModule = true;
var ChiwawaConfig = (function () {
    function ChiwawaConfig() {
        this.protocol = 'https';
        this.domain = 'chiwawa.one';
        this.chiwawaBaseUrl = '/api/public/v1';
        // 企業ID
        this.companyId = process.env.CBSTS_COMPANY_ID || '************************************';
        // ボット用ユーザID
        this.botUserId = process.env.CBSTS_BOT_USER_ID || '********************';
        // APIトークン
        this.apiToken = process.env.CBSTS_API_TOKEN || '********************************';
        // Webhook検証URL
        this.verifyToken = process.env.CBSTS_VERIFY_TOKEN || '********************************';
        // Webhook受付サーバ設定
        this.server = {
            // Webhook受付エンドポイント
            path: '/ChiwawaBotSample',
            // Webhook受付ポート
            port: process.env.CBSTS_PORT || process.env.PORT || '3000'
        };
    }
    /**
     * インスタンスの取得
     */
    ChiwawaConfig.getInstance = function () {
        if (!this._instance) {
            this._instance = new ChiwawaConfig();
        }
        // 生成済みのインスタンスを返す
        return this._instance;
    };
    return ChiwawaConfig;
}());
exports.ChiwawaConfig = ChiwawaConfig;
