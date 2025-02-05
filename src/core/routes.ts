import { Route } from '@edfi/admin-console-shared-sdk'

interface AppRoute {
    home: Route
    // onBoardingWizard: Route
    // setUpWizard: Route
    console: Route
    instance: Route
    addInstance: Route
    stateSummary: Route
    debug: Route
    authCallback: Route
    internalError: Route
    unauthorized: Route
    notFound: Route
}

const routes: AppRoute = {
  home: {
    url: '/',
    name: 'Home' 
  },
  // onBoardingWizard: {
  //   url: '/onBoarding',
  //   name: 'On Boarding Wizard' 
  // },
  // setUpWizard: {
  //   url: '/setupwizard',
  //   name: 'Set Up Wizard' 
  // },
  console: {
    url: '/console',
    name: 'Console' 
  },
  instance: {
    url: '/instance/:odsInstanceId',
    name: 'Instance' 
  },
  addInstance: {
    url: '/addInstance',
    name: 'Add Instance' 
  },
  debug: {
    url: '/debug',
    name: 'Debug' 
  },
  stateSummary: {
    url: '/summary',
    name: 'Summary' 
  },
  authCallback: {
    url: '/callback',
    name: 'Auth Callback' 
  },
  internalError: {
    url: '/server-error',
    name: 'Internal Server Error' 
  },
  unauthorized: {
    url: '/unauthorized',
    name: 'Unauthorized' 
  },
  notFound: {
    url: '/not-found',
    name: 'Not Found' 
  }
}

export default routes