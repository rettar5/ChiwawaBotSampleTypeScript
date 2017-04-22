import * as request from 'request';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ChiwawaConfig } from './ChiwawaConfig';

export class SampleBot {
    private app;
    private config: ChiwawaConfig;

    constructor(config: ChiwawaConfig) {
        this.config = config;
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
    setupParrot(): void {
        // POSTリスナを追加
        this.addWebhookListener(this.config.server.path, (request, response) => {
            const body = request.body;
            console.dir(body);
            // メッセージを投稿
            this.postMessage(body.message.groupId, body.message.text, (error, response, body) => {
                    // メッセージ投稿成功
                    console.log('Post succeed!!');
                    console.dir(body);
                },
                (error, response, body) => {
                    // メッセージ投稿失敗
                    console.log('Post failed...');
                    console.dir(error);
                });
        });
    }

    /**
     * Webhook受付用サーバの起動
     */
    start(): void {
        this.app.listen(process.env.PORT || this.config.server.port);
    }

    /**
     * Webサーバにリスナを追加
     *
     * @param endpoint      リスナエンドポイント
     * @param callback      Webhookアクセス時のコールバック
     */
    private addWebhookListener(endpoint: string, callback: (request, response) => void) {
        this.app.post(endpoint, (req, res) => {
            // Webhookの検証
            if (this.config.verifyToken == req.headers['x-chiwawa-webhook-token']) {
                callback(req, res);
            }
            res.json({ 'result': 'ok' });
        });
    }

    /**
     * 非同期で知話輪にメッセージを投稿
     *
     * @param groupId       投稿先グループID
     * @param text          投稿するメッセージ本文
     * @param success       メッセージ投稿成功時のコールバック
     * @param failure       メッセージ投稿失敗時のコールバック
     */
    private postMessage(groupId: string,
                        text: string,
                        success: (error, response, body) => void,
                        failure: (error, response, body) => void): void {
        const options = {
            uri: this.generatePostMessageUri(groupId),
            headers: {
                'X-Chiwawa-API-Token': this.config.apiToken
            },
            json: {
                'text': text
            }
        };

        request.post(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                success(error, response, body);
            } else {
                failure(error, response, body);
            }
        });
    }

    /**
     * メッセージ投稿APIのURIを生成
     *
     * @param groupId       投稿先グループID
     * @returns {string}    URI
     */
    private generatePostMessageUri(groupId: string): string {
        return this.config.protocol + '://' + this.config.companyId + '.' + this.config.domain + '/api/public/v1/groups/' + groupId + '/messages';
    }
}
