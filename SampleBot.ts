import * as request from 'request';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ChiwawaConfig } from './ChiwawaConfig';

export class SampleBot {
    private app;

    constructor(private config: ChiwawaConfig) {
        this.app = express();

        // webhookのbodyをエンコード
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // webhookのbodyをjson形式に
        this.app.use(bodyParser.json());

        // /ChiwawaBotSample へのPOSTを受付
        this.app.post(this.config.serverListenPath, (req, res) => {
            // Webhookの検証
            if (this.config.verifyToken == req.headers["x-chiwawa-webhook-token"]) {
                const body = req.body;
                console.dir(body);
                // メッセージを投稿
                this.postMessage(this.config.protocol, this.config.companyId, this.config.domain, this.config.apiToken, body.message.groupId, body.message.text);
            }

            res.json({ "result": "ok" });
        });
    }

    start(): void {
        // リッスン開始
        this.app.listen(process.env.PORT || this.config.serverListenPort);
    }

    /**
     * 非同期で知話輪にメッセージを投稿
     *
     * @param protocol      アクセスプロトコル
     * @param companyId     知話輪企業ID
     * @param domain        知話輪ドメイン
     * @param token         知話輪APIトークン
     * @param groupId       投稿先グループID
     * @param text          投稿するメッセージ本文
     */
    private postMessage(protocol: string,
                        companyId: string,
                        domain: string,
                        token: string,
                        groupId: string,
                        text: string): void {
        const options = {
            uri: this.generatePostMessageUri(protocol, companyId, domain, groupId),
            headers: {
                "X-Chiwawa-API-Token": token
            },
            json: {
                "text": text
            }
        };

        request.post(options, (error, response, body) => {
            if (error) {
                console.log("Post failed...");
                console.dir(error);
            } else {
                console.log("Post succeed!!");
                console.dir(body);
            }
        });
    }

    /**
     * メッセージ投稿APIのURIを生成
     *
     * @param protocol       アクセスプロトコル
     * @param companyId     知話輪企業ID
     * @param domain        知話輪ドメイン
     * @param groupId       投稿先グループID
     * @returns {string}    URI
     */
    private generatePostMessageUri(protocol: string,
                                   companyId: string,
                                   domain: string,
                                   groupId: string): string {
        return protocol + "://" + companyId + "." + domain + "/api/public/v1/groups/" + groupId + "/messages";
    }
}
