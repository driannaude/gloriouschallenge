export interface IWalletAccount {
  address: string;
  balance: number;
  nonce: number;
}

export interface IWalletRequest {
  address: string;
}
