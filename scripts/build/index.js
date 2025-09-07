/**
 * AST（コードの木構造）解析ツール esprima を使って
 * service/src/actions 以下の各アクションのコードから
 * service-client/src/actions 以下に SDK 用のコードを自動生成するスクリプト
 */

import {makeSdkActions} from './actions/make-sdk-actions.js';
import {makeSdkActionsIndex} from './actions/make-sdk-actions-index.js';
import {makeSdkActionMethods} from './actions/make-sdk-action-methods.js';

await makeSdkActions();
await makeSdkActionsIndex();
await makeSdkActionMethods();

console.info('✅ SDK actions generated.\n');
