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

  async disconnectWallet () {
    console.log(this.wallet);
    // not implemented in @taquito/beacon-wallet": "^6.4.0-ledger.0"
    // await this.wallet.clearActiveAccount();
    await this.wallet.client.setActiveAccount();
    this.address = null;
  }

  async getBalance (address = this.address) {
    const rawBalance = await this.tk.tz.getBalance(address);
    const balance = rawBalance.toNumber() / 1000000;
    return balance;
  }
}
