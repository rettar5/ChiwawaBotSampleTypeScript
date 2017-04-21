export class ChiwawaConfig {
    protocol = 'https';
    domain = 'chiwawa.one';
    // 企業ID
    companyId = '************************************';
    // ボット用ユーザID
    botUserId = '********************';
    // APIトークン
    apiToken = '********************************';
    // Webhook検証URL
    verifyToken = '********************************';
    // Webhook受付サーバ設定
    server = {
        // Webhook受付エンドポイント
        path: '/ChiwawaBotSample',
        // Webhook受付ポート
        port: '3000'
    };

    constructor() {}
}
