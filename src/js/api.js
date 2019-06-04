import {instantiateStreaming} from '../../node_modules/assemblyscript/lib/loader/index.js';
import optimized from '../../wasm/optimized';

export const api = {};

const promise = instantiateStreaming(optimized).then(inst => Object.assign(api, {inst}));
export default () => promise;
