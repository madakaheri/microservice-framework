/**
 * service/src/actions 以下の各アクションのコードから docs/actions 以下に
 * ドキュメント用のマークダウンファイルを自動生成するスクリプト
 */

import {makeDocs} from './actions/make-docs.js';

await makeDocs();

console.info('✅ docs generated.\n');
