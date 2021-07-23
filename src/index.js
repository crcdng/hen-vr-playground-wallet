/* global AFRAME, M */
import { App } from './app';

const app = new App();

document.addEventListener('DOMContentLoaded', function () {});

// AFRAME components should be registered before the <a-scene> tag
// These components need access to the global Taquito app instance.

AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' }, loc: { type: 'string', default: 'tab' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    const loc = this.data.loc;
    this.el.addEventListener('click', function (evt) {
      console.log('clicked on henlink');
      if (loc === 'tab') {
        window.open(url, '_blank');
      } else if (loc === 'frame') {
        const henWindowElement = document.querySelector('#henwindow');
        const henFrame = document.querySelector('#henframe');
        henFrame.setAttribute('src', url);
        const henWindowInstance = M.Modal.init(henWindowElement, { dismissible: false });
        henWindowInstance.open();
      }
    });
  }
});

AFRAME.registerComponent('wallet', {
  schema: {},
  init: function () {
    this.connected = false;
    console.log('registering component wallet');
  },
  update: function () {
    this.el.addEventListener('click', async (evt) => {
      console.log('click on component wallet');
      console.log(this.connected);
      if (this.connected === false) { // connect
        const wallet = await app.connectWallet();
        const address = await wallet.getPKH();
        console.log(wallet);
        console.log(address);
        if (wallet && address) {
          this.el.setAttribute('color', '#00ff00');
          this.connected = true;
        } else {
          this.el.setAttribute('color', '#BBBBBB');
        }
      } else { // disconnect
        console.log('disconnecting');
        await app.disconnectWallet();
        this.el.setAttribute('color', '#FFC65D');
        this.connected = false;
      }
    });
  }
});

AFRAME.registerComponent('balance', {
  schema: {},
  init: function () {
    console.log('registering component balance');
  },
  update: function () {
    this.el.addEventListener('click', async function (evt) {
      console.log('click on component balance');
      const balance = await app.getBalance();
      const textGeometryAttribute = `value: ${balance} Tz; font: #comic-sans-bold`;
      document.querySelector('#balance').setAttribute('text-geometry', textGeometryAttribute);
      console.log(balance);
    });
  }
});
