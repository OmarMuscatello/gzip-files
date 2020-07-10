const gzipme = require('gzipme');

module.exports = async function (...args) {
    return new Promise(resolve => {
        gzipme(...args, () => {
            resolve();
        });
    });
}