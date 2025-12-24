import devConfig from './dev.js';
import prodConfig from './prod.js';
// Si tu as un fichier local.mock.ts, importe-le aussi
// import localMockConfig from './local.mock';
const env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
let config;
switch (env) {
    case 'production':
        config = prodConfig;
        break;
    // case 'local:mock':
    // case 'local-mock':
    //   config = localMockConfig;
    //   break;
    case 'development':
    default:
        config = devConfig;
}
export default config;
//# sourceMappingURL=index.js.map