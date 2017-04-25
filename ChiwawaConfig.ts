export class ChiwawaConfig {
    readonly protocol = 'https';
    readonly domain = 'chiwawa.one';
    readonly chiwawaBaseUrl = '/api/public/v1';
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
