/* global AFRAME, M */
import { App } from './app';

const app = new App();

document.addEventListener('DOMContentLoaded', function () {});

// AFRAME components should be registered before the <a-scene> tag
// These components need access to the global Taquito app instance.

// Component to collect directly from H=N
AFRAME.registerComponent('hencollect', {
  schema: { objktid: { type: 'number' } },
  init: function () {
    console.log('registering component hencollect');
  },
  update: function () {
    const objktId = this.data.objktid;
    this.el.addEventListener('click', function (evt) {
      console.log('clicked on hencollect');
      app.collect(objktId);
    });
  }
});

// Component to show the artwork on H=N in a popup iframe window
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

// Component to connect / disconnect a wallet via Beacon
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

// Component to retrieve the balance of the active wallet address
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

/* const vertexShader = "varying vec3 vWorldPosition;\n\nvoid main() {\n\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\tvWorldPosition = worldPosition.xyz;\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";

const fragmentShader = "uniform vec3 bottomColor;\nuniform vec3 topColor;\nuniform float offset;\nuniform float exponent;\nvarying vec3 vWorldPosition;\n\nvoid main() {\n    float h = normalize( vWorldPosition + offset ).y;\n    float rB = bottomColor.x/255.0;\n    float gB = bottomColor.y/255.0;\n    float bB = bottomColor.z/255.0;\n    vec3 bColor = vec3(rB,gB,bB);\n    float rT = topColor.x/255.0;\n    float gT = topColor.y/255.0;\n    float bT = topColor.z/255.0;\n    vec3 tColor = vec3(rT,gT,bT);\n    gl_FragColor = vec4( mix( bColor, tColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );\n}";

AFRAME.registerShader('gradient', {
  schema: {
    topColor: {type: 'vec3', default: '255 0 0', is: 'uniform'},
    bottomColor: {type: 'vec3', default: '0 0 255', is: 'uniform'},
    offset: {type: 'float', default: 400, is: 'uniform'},
    exponent: {type: 'float', default: 0.6, is: 'uniform'}
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader
});

AFRAME.registerPrimitive('a-gradient-sky', {
    defaultComponents: {
      geometry: {
        primitive: 'sphere',
        radius: 5000,
        segmentsWidth: 64,
        segmentsHeight: 20
      },
      material: {
        shader: 'gradient'
      },
      scale: '-1 1 1'
    },

    mappings: {
      topColor: 'material.topColor',
      bottomColor: 'material.bottomColor',
      offset: 'material.offset',
      exponent: 'material.exponent'
    }
}); */
