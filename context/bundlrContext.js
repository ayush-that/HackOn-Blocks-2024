import { WebBundlr } from '@bundlr-network/client';
import BigNumber from 'bignumber.js';
import { providers, utils } from 'ethers';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const TEST_MODE = true;
const BundlrContext = createContext({
  initialiseBundlr: async () => {},
  fundWallet: (_) => {},
  balance: '',
  uploadFile: async (_file) => {},
  uploadURI: async (_file) => {},
  bundlrInstance: null,
});

const BundlrContextProvider = ({ children }) => {
  const [bundlrInstance, setBundlrInstance] = useState();
  const [balance, setBalance] = useState(TEST_MODE ? '1.0' : '');

  useEffect(() => {
    if (bundlrInstance) {
      fetchBalance();
    }
  }, [bundlrInstance]);

  const initialiseBundlr = async () => {
    if (TEST_MODE) {
      setBundlrInstance({ test: true });
      setBalance('1.0');
      return;
    }

    const { ethereum } = window;
    const provider = new providers.Web3Provider(ethereum);
    await provider._ready();
    const bundlr = new WebBundlr('https://devnet.bundlr.network', 'matic', provider, {
      providerUrl: process.env.NEXT_PUBLIC_RPC_URL,
    });
    await bundlr.ready();
    setBundlrInstance(bundlr);
  };

  async function fundWallet(amount) {
    if (TEST_MODE) {
      toast.success('Test mode: Funds added successfully');
      setBalance('1.0');
      return;
    }

    console.log(amount);
    try {
      if (bundlrInstance) {
        console.log(bundlrInstance);
        if (!amount) return;
        const amountParsed = parseInput(amount);
        console.log(amountParsed);
        if (amountParsed) {
          toast.info('Adding funds please wait', { progress: 1 });
          console.log('Adding...');
          let response = await bundlrInstance.fund(amountParsed);
          console.log('Wallet funded: ', response);
          toast.success('Funds added', { progress: 1 });
        }
        fetchBalance();
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error.message || 'Something went wrong!');
    }
  }

  function parseInput(input) {
    if (TEST_MODE) return new BigNumber(input);

    const conv = new BigNumber(input).multipliedBy(bundlrInstance?.currencyConfig.base[1]);
    if (conv.isLessThan(1)) {
      console.log('error: value too small');
      toast.error('Error: value too small');
      return;
    } else {
      return conv;
    }
  }

  async function fetchBalance() {
    if (TEST_MODE) {
      setBalance('1.0');
      return;
    }

    if (bundlrInstance) {
      const bal = await bundlrInstance.getLoadedBalance();
      console.log('bal: ', utils.formatEther(bal.toString()));
      setBalance(utils.formatEther(bal.toString()));
    }
  }

  async function uploadFile(file) {
    if (TEST_MODE) {
      const mockTxId = `test-image-${Date.now()}`;
      return { data: { id: mockTxId } };
    }

    try {
      let tx = await bundlrInstance.uploader.upload(file, [
        { name: 'Content-Type', value: 'image/png' },
      ]);
      return tx;
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
      return null;
    }
  }

  async function uploadURI(file) {
    if (TEST_MODE) {
      const mockTxId = `test-uri-${Date.now()}`;
      return { data: { id: mockTxId } };
    }

    try {
      console.log(file);
      let tx = await bundlrInstance.uploader.upload(file, [
        { name: 'Content-Type', value: 'application/json' },
      ]);
      return tx;
    } catch (error) {
      toast.error(error.message || 'Something went wrong!');
      return null;
    }
  }

  return (
    <BundlrContext.Provider
      value={{
        initialiseBundlr,
        fundWallet,
        balance,
        uploadFile,
        uploadURI,
        bundlrInstance,
      }}
    >
      {children}
    </BundlrContext.Provider>
  );
};

export default BundlrContextProvider;

export const useBundler = () => {
  return useContext(BundlrContext);
};
