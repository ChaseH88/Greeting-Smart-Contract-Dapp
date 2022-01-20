import React, { FC, useState } from "react";
import { ethers } from "ethers";

// Types
import { Ethereum } from '../../types/interfaces';

// Hooks
import { useAppState } from '../../hooks';

declare global {
  interface Window {
    ethereum: Ethereum
  }
}

interface SendTokensProps {
  requestAccount: () => Promise<void>
}

const SendTokens: FC<SendTokensProps> = ({ requestAccount }): JSX.Element => {

  const [ coinsToSend, setCoinsToSend ] = useState<number>(0);
  const [ userToSend, setUserToSend ] = useState<string>('');
  const { tokenAddress, contracts: { Token } } = useAppState();

  const sendTokens = async () => {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userToSend, coinsToSend);
      transaction.wait();
    }
  }

  return (
    <div>
      <h3>
        Send Tokens
      </h3>
      <input
        type="number"
        name="tokens"
        onChange={({ target: { value } }) => setCoinsToSend(+value)}
        value={coinsToSend}
      />
      <input
        type="text"
        name="userToSend"
        onChange={({ target: { value } }) => setUserToSend(value)}
        value={userToSend}
      />
      <button
        onClick={sendTokens}
      >
        Send Tokens!
      </button>
    </div>
  )
}

export { SendTokens }
