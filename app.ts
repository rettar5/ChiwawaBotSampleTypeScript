import { SampleBot } from './SampleBot';
import { ChiwawaConfig } from './ChiwawaConfig';
// BOTの設定情報を取得
const config = new ChiwawaConfig();

const bot = new SampleBot(config);
bot.start();
