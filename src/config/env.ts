import * as dotenv from 'dotenv';

dotenv.config();

class Env {
    nodeEnv = this.get('NODE_ENV');

    get(variable: any): any {
        return process.env[variable]
    }

    getBackendUrl(): string {
        if (this.nodeEnv === 'development') {
            return this.get('BASE_URL_DEV');
        }
        return this.get('BASE_URL_URL_PROD');
    }
}

export default new Env();