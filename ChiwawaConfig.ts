export class ChiwawaConfig {
    readonly protocol = 'https';
    readonly domain = 'chiwawa.one';
    readonly chiwawaBaseUrl = '/api/public/v1';
    // 企業ID
    readonly companyId = process.env.CBSTS_COMPANY_ID || '************************************';
    // ボット用ユーザID
    readonly botUserId = process.env.CBSTS_BOT_USER_ID || '********************';
    // APIトークン
    readonly apiToken = process.env.CBSTS_API_TOKEN || '********************************';
    // Webhook検証URL
    readonly verifyToken = process.env.CBSTS_VERIFY_TOKEN || '********************************';
    // Webhook受付サーバ設定
    readonly server = {
        // Webhook受付エンドポイント
        path: '/ChiwawaBotSample',
        // Webhook受付ポート
        port: process.env.CBSTS_PORT || process.env.PORT || '3000'
    };

    // インスタンス
    private static _instance: ChiwawaConfig;

    constructor() {}

    /**
     * インスタンスの取得
     */
    public static getInstance(): ChiwawaConfig
    {
        if (!this._instance) {
            this._instance = new ChiwawaConfig();
        }

        // 生成済みのインスタンスを返す
        return this._instance;
    }
}
