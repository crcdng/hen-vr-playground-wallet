import { BeaconWallet } from '@taquito/beacon-wallet';

const options = {
  name: 'H=NVRExperiment',
  iconUrl: 'https://tezostaquito.io/img/favicon.png',
  preferredNetwork: 'mainnet',
  eventHandlers: {
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log('permission data:', data);
      }
    }
  }
};
export const wallet = new BeaconWallet(options);
