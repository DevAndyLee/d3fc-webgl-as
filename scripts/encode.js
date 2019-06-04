'use strict';
const fs = require('fs');

let buff = fs.readFileSync('./wasm/optimized.wasm');
let base64data = buff.toString('base64');

let jsContent = `
  const encoded = '${base64data}';
  export default new Promise(resolve => {
    const decoded = atob(encoded);
    var len = decoded.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++) {
        bytes[i] = decoded.charCodeAt(i);
    }
    resolve(new Response(bytes, { status: 200, headers: { "Content-Type": "application/wasm" } }));
  });
`;
fs.writeFileSync('./wasm/optimized.js', jsContent);