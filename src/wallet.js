import { BeaconWallet } from '@taquito/beacon-wallet';

const options = {
  name: 'MyAwesomeDapp',
  iconUrl: 'https://tezostaquito.io/img/favicon.png',
  preferredNetwork: 'florencenet',
  eventHandlers: {
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log('permission data:', data);
      }
    }
  }
};
export const wallet = new BeaconWallet(options);
