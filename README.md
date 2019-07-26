## Installation
> This is because React Native uses JavaScriptCore execution environment, and depending on how the Node standard library APIs like buffer, crypto or stream are mocked or implemented for the React Native app, it might need to link some native dependencies; therefore, you may need to relies on a library web3go with golang, and then you can use web3 in your react native dapp.

- install web3go
```
git clone https://github.com/bcl-chain/web3.go.git
```

- use gomobile compile web3go to generate framework and arr for ios android
```javascript
// generate framework
gomobile bind -target=ios ./github.com/bcl-chain/web3.go/mobile

// generate arr jar
gomobile bind -target=android ./github.com/bcl-chain/web3.go/mobile
```

- link framework and arr jar to ios android

- use ganache-cli to deployment of local test Ethernet workshop
![](https://github.com/AppScaffold/Navi/blob/master/Screenshot%20TipsView.png?raw=true)
- Getting Started
```
yarn
react-native run-android
react-native run-ios
```
- this dapp have generate Hardware Wallet, import wallet with privateKey, import wallet with mnemonic, sendTransaction(contain ERC20), getBalance(contain ERC20)
![](https://github.com/AppScaffold/Navi/blob/master/Screenshot%20TipsView.png?raw=true)
![](https://github.com/AppScaffold/Navi/blob/master/Screenshot%20TipsView.png?raw=true)