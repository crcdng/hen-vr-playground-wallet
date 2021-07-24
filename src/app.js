import { TezosToolkit } from '@taquito/taquito';
import { wallet } from './wallet.js';

export class App {
  constructor (rcpClient = 'https://api.tez.ie/rpc/mainnet') {
    this.tk = new TezosToolkit(rcpClient);
    this.wallet = wallet;
  }

  async collect (objktId, contractAddress) {
    console.log(objktId);
    // default contract is Hic et nunc Markeplace (OBJKT Swap v2)
    const contract = await this.tk.wallet.at(contractAddress || 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn');
    console.log(contract);
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
