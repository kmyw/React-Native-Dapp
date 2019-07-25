package com.reactnativedapp;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import java.util.Map;

import web3go.Web3go;

public class Web3goModule extends ReactContextBaseJavaModule {

  private static String path = "m/44'/60'/0'/0/0";
  private static String nodeIP = "http://127.0.0.1:8545";

  public Web3goModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "Web3go";
  }

  @ReactMethod
  public void generateWallet(Promise promise) {
    String mnemonic;
    web3go.Wallet wallet;
    web3go.Account account;
    String address;
    String privateKey;
    String publicKey;
    try {
      mnemonic = Web3go.newMnemonic(128);
      wallet = Web3go.newFromMnemonic(mnemonic);
      account = wallet.derive(path, false);
      address = wallet.addressHex(account);
      privateKey = wallet.privateKeyHex(account);
      publicKey = wallet.publicKeyHex(account);
      String walletInfo = mnemonic + "**" + address + "**" + privateKey + "**" + publicKey;
      promise.resolve(walletInfo);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void importWalletFromMnemonic(String mnemonic, Promise promise) {
    web3go.Wallet wallet;
    web3go.Account account;
    String address;
    String privateKey;
    String publicKey;
    try {
      wallet = Web3go.newFromMnemonic(mnemonic);
      account = wallet.derive(path, false);
      address = wallet.addressHex(account);
      privateKey = wallet.privateKeyHex(account);
      publicKey = wallet.publicKeyHex(account);
      String walletInfo = address + "**" + privateKey + "**" + publicKey;
      promise.resolve(walletInfo);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void importWalletFromPrivateKey(String privateKey, Promise promise) {
    try {
      web3go.PrivateKey privKey = Web3go.hexToECDSA(privateKey);
      web3go.PublicKey p = privKey.public_();
      byte[] pub = Web3go.fromECDSAPub(p);
      String publicKey = Web3go.encode(pub);
      web3go.Address a = Web3go.pubkeyToAddress(p);
      String address = a.getHex();
      String walletInfo = address + "**" + publicKey;
      promise.resolve(walletInfo);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void ERC20getBalance(String address, String contractAddress, Promise promise) {
    try {
      web3go.EthereumClient client = Web3go.newEthereumClient(nodeIP);
      web3go.Address address1 = Web3go.newAddressFromHex(contractAddress);
      web3go.Address address2 = Web3go.newAddressFromHex(address);
      web3go.ERC20 erc20 = Web3go.newERC20(address1, client);
      web3go.BigInt a = erc20.balanceOf(address2);
      String ammout = a.getString(10);
      promise.resolve(ammout);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void getBalance(String address, Promise promise) {
    try {
      web3go.EthereumClient client = Web3go.newEthereumClient(nodeIP);
      web3go.Context ctx = Web3go.newContext();
      web3go.Address address1 = Web3go.newAddressFromHex(address);
      web3go.BigInt a = client.getBalanceAt(ctx, address1, -1);
      String ammout = a.getString(10);
      promise.resolve(ammout);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void ERC20SendTransaction(String fromAddress, String toAddress, String privateKey, String contractAddress, Promise promise) {
    try {
      web3go.EthereumClient client = Web3go.newEthereumClient(nodeIP);
      web3go.Context ctx = Web3go.newContext();
      web3go.Address address1 = Web3go.newAddressFromHex(contractAddress);
      web3go.Address address2 = Web3go.newAddressFromHex(fromAddress);
      web3go.Address address3 = Web3go.newAddressFromHex(toAddress);
      web3go.ERC20 erc20 = Web3go.newERC20(address1, client);
      web3go.TransactOpts opts = Web3go.newTransactOpts(privateKey);
      long nonce = client.getPendingNonceAt(ctx, address2);
      web3go.BigInt gasPrise = client.suggestGasPrice(ctx);
      opts.setNonce(nonce);
      opts.setGasLimit(300000);
      opts.setGasPrice(gasPrise);
      // 转账值 value 需要乘以10的该币小数点位数次方， 比如，前端传过来的值是2000，该币小数点位数3，则发送区块链数据value为2000000
      web3go.BigFloat value1 = Web3go.newBigFloat(1000);
      web3go.BigFloat value2 = Web3go.newBigFloat(5.32);
      web3go.BigFloat value3 = value1.mul(value2);
      web3go.BigInt value = value3.getBigInt();
      web3go.Transaction txHashAct = erc20.transfer(opts, address3, value);
      web3go.Hash tx = txHashAct.getHash();
      String txHash = tx.getHex();
      promise.resolve(txHash);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }

  @ReactMethod
  public void sendTransaction(String fromAddress, String toAddress, String pk, Promise promise) {
    try {
      web3go.EthereumClient client = Web3go.newEthereumClient(nodeIP);
      web3go.Context ctx = Web3go.newContext();
      web3go.Address address1 = Web3go.newAddressFromHex(fromAddress);
      web3go.Address address2 = Web3go.newAddressFromHex(toAddress);
      web3go.PrivateKey privateKey = Web3go.hexToECDSA(pk);
      long nonce = client.getPendingNonceAt(ctx, address1);
      web3go.BigFloat value1 =  Web3go.newBigFloat(1000000000000000000.0);
      web3go.BigFloat value2 =  Web3go.newBigFloat(10.25);
      web3go.BigFloat value3 = value1.mul(value2);
      web3go.BigInt value = value3.getBigInt();
      long gasLimit = 300000;
      byte[] data = new byte[]{1};
      web3go.BigInt gasPrise = client.suggestGasPrice(ctx);
      web3go.Transaction tx = Web3go.newTransaction(nonce, address2, value, gasLimit, gasPrise, data);
      web3go.Transaction signTx = Web3go.signTx(tx, Web3go.newHomesteadSigner(), privateKey);
      client.sendTransaction(ctx, signTx);
      web3go.Hash t = signTx.getHash();
      String txHash = t.getHex();
      promise.resolve(txHash);
    } catch (Exception e) {
      promise.reject(e.getMessage());
    }
  }
}
