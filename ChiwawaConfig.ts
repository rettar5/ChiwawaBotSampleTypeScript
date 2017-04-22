export class ChiwawaConfig {
    readonly protocol = 'https';
    readonly domain = 'chiwawa.one';
    // 企業ID
    readonly companyId = '************************************';
    // ボット用ユーザID
    readonly botUserId = '********************';
    // APIトークン
    readonly apiToken = '********************************';
    // Webhook検証URL
    readonly verifyToken = '********************************';
    // Webhook受付サーバ設定
    readonly server = {
        // Webhook受付エンドポイント
        path: '/ChiwawaBotSample',
        // Webhook受付ポート
        port: '3000'
    };

    constructor() {}
}
