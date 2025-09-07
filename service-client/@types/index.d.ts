export const serviceSDK: SDK;
export default serviceSDK;
declare class SDK {
    config: {
        profile: any;
        functionName: string;
    };
    /**
     * 初期設定のオーバーライド
     * @param {Object} config
     * @param {string} config.profile - AWS profile name
     * @param {string} config.functionName - lambda function name
     * @returns {void}
     */
    configure(config?: {
        profile: string;
        functionName: string;
    }): void;
    /** OVERRIDE_ACTIONS_START */
    fuga: typeof action.fuga;
    hoge: typeof action.hoge;
    ping: typeof action.ping;
}
import * as action from './actions/index.js';
//# sourceMappingURL=index.d.ts.map