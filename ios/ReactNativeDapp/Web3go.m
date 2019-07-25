//
//  Web3go.m
//  ReactNativeDapp
//
//  Created by 域乎 on 2019/7/24.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "Web3go.h"
#import <Web3go/Web3go.h>

@implementation Web3go

NSString* path = @"m/44'/60'/0'/0/0";
NSString* nodeIP = @"http://127.0.0.1:8545";

RCT_EXPORT_MODULE();

// 创建钱包
RCT_EXPORT_METHOD(generateWallet:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  // 助记词
  NSString* mnemonic = Web3goNewMnemonic(128, nil);
  Web3goWallet* hdwallet = Web3goNewFromMnemonic(mnemonic, nil);
  @try {
    Web3goAccount* account = [hdwallet derive:path pin:false error:nil];
    // 地址
    NSString* address = [hdwallet addressHex:account error:nil];
    // 私钥
    NSString* privateKey = [hdwallet privateKeyHex:account error:nil];
    // 公钥
    NSString* publicKey = [hdwallet publicKeyHex:account error:nil];
    NSLog(@"%@", mnemonic);
    NSLog(@"%@", address);
    NSLog(@"%@", privateKey);
    NSLog(@"%@", publicKey);
    NSString * wallet = [NSString stringWithFormat:@"%@**%@**%@**%@", mnemonic, address, privateKey, publicKey];
    NSLog(@"%@", wallet);
    resolve(wallet);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}

// 通过助记词导入钱包
RCT_EXPORT_METHOD(importWalletFromMnemonic:
                  (NSString*) mnemonic:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  
  Web3goWallet* hdwallet = Web3goNewFromMnemonic(mnemonic, nil);
  @try {
    Web3goAccount* account = [hdwallet derive:path pin:false error:nil];
    // 地址
    NSString* address = [hdwallet addressHex:account error:nil];
    // 私钥
    NSString* privateKey = [hdwallet privateKeyHex:account error:nil];
    // 公钥
    NSString* publicKey = [hdwallet publicKeyHex:account error:nil];
    NSLog(@"%@", mnemonic);
    NSLog(@"%@", address);
    NSLog(@"%@", privateKey);
    NSLog(@"%@", publicKey);
    NSString * wallet = [NSString stringWithFormat:@"%@**%@**%@**%@", mnemonic, address, privateKey, publicKey];
    NSLog(@"%@", wallet);
    resolve(wallet);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}

// 通过私钥导入钱包
RCT_EXPORT_METHOD(importWalletFromPrivateKey:
                  (NSString*) privateKey:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  @try {
    Web3goPrivateKey* privKey = Web3goHexToECDSA(privateKey, nil);
    Web3goPublicKey* p = [privKey public];
    NSData* pub = Web3goFromECDSAPub(p);
    NSString* pubkey = Web3goEncode(pub);
    Web3goAddress* a = Web3goPubkeyToAddress(p);
    NSString* address = [a getHex];
    NSLog(@"%@", address);
    NSLog(@"%@", pubkey);
    NSString * wallet = [NSString stringWithFormat:@"%@**%@", address, pubkey];
    NSLog(@"%@", wallet);
    resolve(wallet);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}

// 获取ERC20余额
  RCT_EXPORT_METHOD(ERC20getBalance:
                  (NSString*) address:
                  (NSString*) contractAddress:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    // ip地址
    Web3goEthereumClient* client = Web3goNewEthereumClient(nodeIP, nil);
    // 合约地址
    Web3goAddress* address1 = Web3goNewAddressFromHex(contractAddress, nil);
    // 账户地址
    Web3goAddress* address2 = Web3goNewAddressFromHex(address, nil);
    Web3goERC20* erc20 = Web3goNewERC20(address1, client, nil);
    @try {
      Web3goBigInt* a = [erc20 balanceOf:address2 error:nil];
      NSString* ammount = [a getString:10];
      NSLog(@"%@", ammount);
      resolve(ammount);
    } @catch (NSError *exception) {
      NSLog(@"NSError: %@", exception);
      reject(@"NSError: %@", @"There were no events", exception);
    } @finally {
      NSLog(@"finally");
    }
  
}

// 获取ETH余额
RCT_EXPORT_METHOD(getBalance:
                  (NSString*) address:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  // ip地址
  Web3goEthereumClient* client = Web3goNewEthereumClient(nodeIP, nil);
  Web3goContext* ctx = Web3goNewContext();
  // 账户地址
  Web3goAddress* address1 = Web3goNewAddressFromHex(address, nil);
  @try {
    Web3goBigInt* a = [client getBalanceAt:ctx account:address1 number:-1 error:nil];
    NSString* ammount = [a getString:10];
    NSLog(@"%@", ammount);
    resolve(ammount);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}

// ETH发送交易
RCT_EXPORT_METHOD(sendTransaction:
                  (NSString*) from:
                  (NSString*) to:
                  (NSString*) pk:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  // ip地址
  Web3goEthereumClient* client = Web3goNewEthereumClient(nodeIP, nil);
  Web3goContext* ctx = Web3goNewContext();
  // 发送账户地址
  Web3goAddress* address1 = Web3goNewAddressFromHex(from, nil);
  // 转账目的地址
  Web3goAddress* address2 = Web3goNewAddressFromHex(to, nil);
  // 私钥编译，发送账户私钥
  Web3goPrivateKey* privateKey = Web3goHexToECDSA(pk, nil);
  @try {
    int64_t nonce = 0;
    [client getPendingNonceAt:ctx account:address1 nonce:&nonce error:nil];
    // 转账值 value 需要乘以10的18次方， 比如下面一行例子，前端传过来的值是2，则发送区块链数据value为2000000000000000000
    Web3goBigFloat* value1 = Web3goNewBigFloat(1000000000000000000);
    // value2 为前端传过来的值
    Web3goBigFloat* value2 = Web3goNewBigFloat(5.63);
    Web3goBigFloat* value3 = [value1 mul:value2];
    Web3goBigInt* value = [value3 getBigInt:nil];
    
    
    int64_t gasLimit = 300000;
    Web3goBigInt* gasPrise = [client suggestGasPrice:ctx error:nil];
    NSData* data;
    Web3goTransaction* tx = Web3goNewTransaction(nonce, address2, value, gasLimit, gasPrise, data);
    Web3goTransaction* signedTx = Web3goSignTx(tx, Web3goNewHomesteadSigner(), privateKey, nil);
    // 发送交易
    [client sendTransaction:ctx tx:signedTx error:nil];
    NSLog(@"%@", signedTx);
    // 交易hash
    Web3goHash* t = [signedTx getHash];
    NSString* txHash = [t getHex];
    NSLog(@"%@", txHash);
    resolve(txHash);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}

// ERC20发送交易
RCT_EXPORT_METHOD(ERC20SendTransaction:
                  (NSString*) from:
                  (NSString*) to:
                  (NSString*) pk:
                  (NSString*) cont:
                  (RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  // ip地址
  Web3goEthereumClient* client = Web3goNewEthereumClient(nodeIP, nil);
  Web3goContext* ctx = Web3goNewContext();
  // 合约地址
  Web3goAddress* address1 = Web3goNewAddressFromHex(cont, nil);
  // 账户地址
  Web3goAddress* address2 = Web3goNewAddressFromHex(from, nil);
  // 转账目的地址
  Web3goAddress* address3 = Web3goNewAddressFromHex(to, nil);
  Web3goERC20* erc20 = Web3goNewERC20(address1, client, nil);
  Web3goTransactOpts* opts = Web3goNewTransactOpts(pk);
  @try {
    int64_t nonce = 0;
    [client getPendingNonceAt:ctx account:address2 nonce:&nonce error:nil];
    Web3goBigInt* gasPrise = [client suggestGasPrice:ctx error:nil];
    [opts setNonce:nonce];
    [opts setGasLimit:300000];
    [opts setGasPrice:gasPrise];
    // 转账值 value 需要乘以10的该币小数点位数次方， 比如，前端传过来的值是2000，该币小数点位数3，则发送区块链数据value为2000000
    Web3goBigInt* value;
    int decimals = 3; // 这里是erc20小数位，demo里写的3，真实要用接口获取的值
    if (decimals > 0) { // decimals > 0
      Web3goBigFloat* value1 = Web3goNewBigFloat(1000);
      // value2 为前端传过来的值
      Web3goBigFloat* value2 = Web3goNewBigFloat(5.22);
      Web3goBigFloat* value3 = [value1 mul:value2];
      value = [value3 getBigInt:nil];
    } else { // decimals = 0
      // 这里直接传前端的值
      value = Web3goNewBigInt(10.63);
    }
    // 发送交易
    Web3goTransaction* txHashAct = [erc20 transfer:opts to:address3 value:value error:nil];
    Web3goHash* tx = [txHashAct getHash];
    NSString* txHash = [tx getHex];
    NSLog(@"%@", txHash);
    resolve(txHash);
  } @catch (NSError *exception) {
    NSLog(@"NSError: %@", exception);
    reject(@"NSError: %@", @"There were no events", exception);
  } @finally {
    NSLog(@"finally");
  }
  
}



@end
