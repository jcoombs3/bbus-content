import { Environment } from './type';
import { services } from './extensions/index';

const pageModel: any = {
  name: 'app-container',
  properties: {},
  children: []
};

const EXPERIENCE_NAME = 'bbus-content-app';

// Aymme: fetch model from CX
const fetchModel = function(): Promise<Response> {
  return fetch(
    'http://localhost:3003/v1/_api/portals/simpleModel/' + EXPERIENCE_NAME
  );
};

export const environment: Environment = {
  production: false,
  bootstrap: {
    services,
    pageModel
  },
  fetchModel: fetchModel
};