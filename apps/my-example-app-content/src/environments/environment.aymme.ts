import { Environment } from './type';
import { ExternalServices } from '@backbase/foundation-ang/start';
import { contentItem } from './contentitem';

const services: ExternalServices = {
  auth: () => ({
    login: (username: any, password: any) => Promise.resolve(),
    logout: () => Promise.resolve(),
    goToLoginPage: () => {},
    register: (countdown: any) => () => {},
    refresh: () => Promise.resolve(),
    timeToLive: () => 100
  }),
  eventBus: () => ({
    publish: (eventName: any, data: any) => {
      console.log(`eventBus published '${eventName}' with payload:`, data);
    },
    subscribe: (eventName: any, listener: any) => {
      console.log(`eventBus subscribed '${eventName}' to listener:`, listener);
    },
    unsubscribe: (eventName: any, listener: any) => {
      console.log(
        `eventBus unsubscribed '${eventName}' from listener:`,
        listener
      );
    }
  }),
  navigation: () => ({
    getBreadcrumbs: (uuid: any, depth: any) => {
      return Promise.resolve({
        type: 'externalLink',
        title: 'Backbase',
        url: 'http://www.backbase.com',
        isCurrent: true,
        properties: {}
      });
    },
    getTree: (uuid: any, depth: any) => {
      return Promise.resolve({
        type: 'externalLink',
        title: 'Backbase',
        url: 'http://www.backbase.com',
        isCurrent: true,
        isInPath: false,
        properties: {},
        children: []
      });
    }
  }),
  pageConfig: () => ({
    apiRoot: '/api',
    staticResourcesRoot: '/api/portal',
    portalName: 'bbus-content-app',
    pageName: 'index',
    currentLink: '',
    version: '6',
    locale: 'en-US'
  }),
  portalContent: () => ({
		getContent: (contentRef: any) => {
			return Promise.resolve(contentItem);
		},
    get: (contentRef: any) => {
      return Promise.resolve({});
    }
  })
};
export const environment: Environment = {
  production: false
};

const EXPERIENCE_NAME = 'bbus-content-app';

fetch('http://localhost:3003/v1/_api/portals/simpleModel/' + EXPERIENCE_NAME)
  .then(function(response: any) {
    if (response.status !== 200) {
      console.log(
        'Unexpected error: Unable to retrieve Experience Model. Status Code: ' +
          response.status
      );
      return;
    }
    // Examine the text in the response
    response.json().then(function(data: any) {
      window.BB.startSingleApp(services).then((app: any) =>
        app.bootstrap(data.children[0])
      );
    });
  })
  .catch(function(err) {
    console.log('Fetch Error: Unable to retrieve Experience Model', err);
  });
