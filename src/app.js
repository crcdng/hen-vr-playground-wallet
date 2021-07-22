import { TezosToolkit } from '@taquito/taquito';
import { wallet } from './wallet.js';

export class App {
  constructor (rcpClient = 'https://api.tez.ie/rpc/mainnet') {
    this.tk = new TezosToolkit(rcpClient);
    this.wallet = wallet;
  }

  async connectWallet (network) {
    await wallet.requestPermissions({
      network: {
        type: network || 'mainnet'
      }
    });
    this.tk.setWalletProvider(this.wallet);
    this.address = await wallet.getPKH();
    return this.wallet;
  }

  // TODO disonnectWallet

  async getBalance (address = this.address) {
    const rawBalance = await this.tk.tz.getBalance(address);
    const balance = rawBalance.toNumber() / 1000000;
    return balance;
  }
}
