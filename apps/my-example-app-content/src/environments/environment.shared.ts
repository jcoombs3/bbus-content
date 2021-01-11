import { createMocksInterceptor } from '@backbase/foundation-ang/data-http';

import { Environment } from './type';

export const environment: Environment = {
  production: false,
  mockProviders: [createMocksInterceptor()],
};
