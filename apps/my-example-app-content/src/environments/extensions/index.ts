import { ExternalServices } from '@backbase/foundation-ang/start';

const auth = () => ({
  login: (username: any, password: any) => Promise.resolve(),
  logout: () => Promise.resolve(),
  goToLoginPage: () => {},
  register: (countdown: any) => () => {},
  refresh: () => Promise.resolve(),
  timeToLive: () => 100
});

const eventBus = () => ({
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
});

const navigation = () => ({
  getBreadcrumbs: (uuid: any, depth: any) => {
    return Promise.resolve({
      type: 'externalLink',
      title: 'Backbase',
      url: 'https://community.backbase.com/',
      isCurrent: true,
      properties: {}
    });
  },
  getTree: (uuid: any, depth: any) => {
    return Promise.resolve({
      type: 'externalLink',
      title: 'Backbase',
      url: 'https://community.backbase.com/',
      isCurrent: true,
      isInPath: false,
      properties: {},
      children: []
    });
  }
});

const pageConfig = () => ({
  apiRoot: '/api',
  staticResourcesRoot: '/api/portal',
  portalName: 'bnp-standalone',
  pageName: 'index',
  currentLink: '',
  version: '6',
  locale: 'es-PE'
});

const portalContent = () => ({
  get: (contentRef: string) => {
    return Promise.resolve({});
  },
  getContent: (contentRef: string) => {
    return new Promise((resolutionFunc, rejectionFunc) => {
      fetch(`${pageConfig().apiRoot}/aymme-contentservices/${contentRef}`)
        .then((res: Response) => {
          if (res.status !== 200) {
            throw new Error(
              'Unexpected error: Unable to retrieve Content. Status Code: ' +
                res.status
            );
          }
          res.json().then(function(data: any) {
            resolutionFunc(data);
          });
        })
        .catch(function(err: any) {
          console.log('Fetch Error: Unable to retrieve Content', err);
          rejectionFunc(err);
        });
    });
  }
});

export const services: ExternalServices = {
  auth: auth,
  eventBus: eventBus,
  navigation: navigation,
  pageConfig: pageConfig,
  portalContent: portalContent
};
