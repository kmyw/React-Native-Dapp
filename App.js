/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  NativeModules,
  ScrollView,
  Button,
  Dimensions,
  Clipboard,
  Vibration,
  Linking
} from 'react-native';

const screen = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      address: "",
      privateKey: "",
      publicKey: "",
      mnemonic: "",
      defmnemonic: "flee sausage evoke reward slam casual help news glide equip spread danger",
      mnaddress: "",
      mnprivateKey: "",
      mnpublicKey: "",
      praddress: "",
      defprivateKey: "9ef5430e8aebf9c644b3b335a385c3e8a63db21e86cc2d9b236a7cd0ce1e5e60",
      prpublicKey: "",
      defGaAddress: "0x425714B9d71F1E1B008B9471839780BAaF40b976",
      defErcAddress: "0x425714B9d71F1E1B008B9471839780BAaF40b976",
      defContract: "0x5AA7De815d9b6587C1962DEA41F53bF093d7D4bB",
      gaAmmount: "",
      ercAmmount: "",
      txHash: "",
      eTxHash: ""
    }
  }

  // 创建钱包
  async generateWallet() {
    try {
      var wallet = await NativeModules.Web3go.generateWallet();
      var walletArr = wallet.split("**")
      this.setState({
        mnemonic: walletArr[0],
        address: walletArr[1],
        privateKey: walletArr[2],
        publicKey: walletArr[3]
      })
    } catch (e) {
      console.error(e);
    }
  }

  // 通过私钥导入钱包
  async importWalletFromPrivateKey() {
    try {
      var wallet = await NativeModules.Web3go.importWalletFromPrivateKey(this.state.defprivateKey);
      var walletArr = wallet.split("**")
      this.setState({
        praddress: walletArr[0],
        prpublicKey: walletArr[1]
      })
    } catch (e) {
      console.error(e);
    }
  }

  // 通过助记词导入钱包
  async importWalletFromMnemonic() {
    try {
      var wallet = await NativeModules.Web3go.importWalletFromMnemonic(this.state.defmnemonic);
      var walletArr = wallet.split("**")
      this.setState({
        mnaddress: walletArr[0],
        mnprivateKey: walletArr[1],
        mnpublicKey: walletArr[2]
      })
    } catch (e) {
      console.error(e);
    }
  }

  // ERC20获取账户余额
  async ERC20getBalance() {
    try {
      var ammount = await NativeModules.Web3go.ERC20getBalance(this.state.defErcAddress, this.state.defContract);
      this.setState({
        ercAmmount: ammount
      })
    } catch (e) {
      console.error(e);
    }
  }

  // GA获取账户余额
  async getBalance() {
    try {
      var ammount = await NativeModules.Web3go.getBalance(this.state.defGaAddress);
      this.setState({
        gaAmmount: ammount
      })
    } catch (e) {
      console.error(e);
    }
  }

  // 发送交易
  async sendTransaction() {
    try {
      var txHash = await NativeModules.Web3go.sendTransaction("0x425714B9d71F1E1B008B9471839780BAaF40b976", "0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24", "cebbcb788363dd6a4d206d30bfea69ae1bddee8693198f4abc55401fe03e7518");
      this.setState({
        txHash: txHash
      })
    } catch (e) {
      console.error(e);
    }
  }

  // GA获取账户余额
  async ERC20SendTransaction() {
    try {
      var eTxHash = await NativeModules.Web3go.ERC20SendTransaction("0x425714B9d71F1E1B008B9471839780BAaF40b976", "0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24", "cebbcb788363dd6a4d206d30bfea69ae1bddee8693198f4abc55401fe03e7518", "0x5AA7De815d9b6587C1962DEA41F53bF093d7D4bB");
      this.setState({
        eTxHash: eTxHash
      })
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.mnemonic)
                alert(`已复制${this.state.mnemonic}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>mnemonic：</Text>{this.state.mnemonic}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.address);
                alert(`已复制${this.state.address}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>address：</Text>{this.state.address}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.privateKey);
                alert(`已复制${this.state.privateKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>privateKey：</Text>{this.state.privateKey}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.publicKey);
                alert(`已复制${this.state.publicKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>publicKey：</Text>{this.state.publicKey}</Text>
            <Button
              style={styles.instructions}
              title="创建钱包"
              onPress={() => {
                this.generateWallet()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defmnemonic)
                alert(`已复制${this.state.defmnemonic}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>mnemonic：</Text>{this.state.defmnemonic}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.mnaddress);
                alert(`已复制${this.state.mnaddress}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>address：</Text>{this.state.mnaddress}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.mnprivateKey);
                alert(`已复制${this.state.mnprivateKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>privateKey：</Text>{this.state.mnprivateKey}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.mnpublicKey);
                alert(`已复制${this.state.mnpublicKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>publicKey：</Text>{this.state.mnpublicKey}</Text>
            <Button
              style={styles.instructions}
              title="助记词导入钱包"
              onPress={() => {
                this.importWalletFromMnemonic()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defprivateKey)
                alert(`已复制${this.state.defprivateKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>privateKey：</Text>{this.state.defprivateKey}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.praddress);
                alert(`已复制${this.state.praddress}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>address：</Text>{this.state.praddress}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.prpublicKey);
                alert(`已复制${this.state.prpublicKey}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>publicKey：</Text>{this.state.prpublicKey}</Text>
            <Button
              style={styles.instructions}
              title="私钥导入钱包"
              onPress={() => {
                this.importWalletFromPrivateKey()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defErcAddress)
                alert(`已复制${this.state.defErcAddress}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>address：</Text>{this.state.defErcAddress}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.ercAmmount);
                alert(`已复制${this.state.ercAmmount}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>ammount：</Text>{this.state.ercAmmount}</Text>
            <Button
              style={styles.instructions}
              title="ERC20获取账户余额"
              onPress={() => {
                this.ERC20getBalance()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defGaAddress)
                alert(`已复制${this.state.defGaAddress}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>address：</Text>{this.state.defGaAddress}</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制${this.state.gaAmmount}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>ammount：</Text>{this.state.gaAmmount}</Text>
            <Button
              style={styles.instructions}
              title="获取ETH账户余额"
              onPress={() => {
                this.getBalance()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defGaAddress)
                alert(`已复制0x425714B9d71F1E1B008B9471839780BAaF40b976到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>from：</Text>0x425714B9d71F1E1B008B9471839780BAaF40b976</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>to：</Text>0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制${this.state.txHash}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>txHash：</Text>{this.state.txHash}</Text>
            <Button
              style={styles.instructions}
              title="ETH发送交易"
              onPress={() => {
                this.sendTransaction()
              }}
            />
          </View>

          <View style={styles.box}>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.defGaAddress)
                alert(`已复制0x425714B9d71F1E1B008B9471839780BAaF40b976到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>from：</Text>0x425714B9d71F1E1B008B9471839780BAaF40b976</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>to：</Text>0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>contractAddress：</Text>0xdd7E43e4A3B38725687d8Cf1eFA3882bF106da24</Text>
            <Text
              style={{ marginBottom: 10 }}
              onLongPress={() => {
                Vibration.vibrate([0, 500, 1000, 500], true)
                Clipboard.setString(this.state.gaAmmount);
                alert(`已复制${this.state.eTxHash}到剪贴板`)
                Vibration.cancel()
              }}
            ><Text style={{ fontWeight: "bold" }}>txHash：</Text>{this.state.eTxHash}</Text>
            <Button
              style={styles.instructions}
              title="ERC20发送交易"
              onPress={() => {
                this.ERC20SendTransaction()
              }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  contentContainer: {
    width: screen.width - 40,
    paddingVertical: 20
  },
  box: {
    flex: 1,
    borderColor: "#fec400",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginBottom: 20
  }
});
