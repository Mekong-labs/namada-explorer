"use client";

import { IBlockReceipt } from "@/types";
import ercToken from "@/utils/ERC20.json";

import { useEffect, useState } from "react";
import { ReactNode, createContext, useContext } from "react";

import { BrowserProvider, JsonRpcProvider, ethers } from "ethers";

const USER = process.env.NEXT_PUBLIC_USER || "";
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD || "";
const NODE = process.env.NEXT_PUBLIC_NODE || "";
const GNT_ADDRESS = process.env.NEXT_PUBLIC_GNT_ADDRESS || "";

const useEthereumService = () => {
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);
  const [providerWallet, setProviderWallet] = useState<BrowserProvider | null>(
    null
  );

  useEffect(() => {
    const initializeProvider = async () => {
      const fetchRequest = await new ethers.FetchRequest(NODE);

      fetchRequest.setCredentials(USER, PASSWORD);
      const rpcProvider = new ethers.JsonRpcProvider(fetchRequest);
      const browserProvider = new ethers.BrowserProvider(
        (window as any).ethereum
      );

      setProvider(rpcProvider);
      setProviderWallet(browserProvider);
    };

    initializeProvider();
  }, []);

  const getLatestBlocksWithEthers = async (): Promise<unknown> => {
    try {
      const latestBlockNumber = await provider?.getBlockNumber();

      const blocks: unknown[] = [];
      for (
        let i = latestBlockNumber || 0;
        i > (latestBlockNumber || 0) - 10;
        i--
      ) {
        const block = await provider?.getBlock(i);

        const totalGasUsed = BigInt((block?.gasUsed || 0) as bigint);
        const gasUsedForUncles = BigInt(0);
        const baseFeePerGas = BigInt((block?.baseFeePerGas || 0) as bigint);
        const minerReward = totalGasUsed - gasUsedForUncles * baseFeePerGas;

        const weiPerEther = BigInt("1000000000000000000");
        const rewardInWei = minerReward.toString();
        const rewardInEther = (BigInt(rewardInWei) / weiPerEther).toString();

        blocks.push({ ...(block || {}), reward: rewardInEther });
      }

      console.log({ blocks });
      return blocks;
    } catch (error) {
      console.log(error);
    }
  };

  const getLatestTransactionsWithEthers = async (): Promise<unknown> => {
    try {
      const blockNumber = await provider?.getBlockNumber();
      const block = await provider?.getBlock(blockNumber || 0);
      const transactionHashes = block?.transactions;

      if (transactionHashes && transactionHashes?.length > 0) {
        const transactions = await Promise.all(
          transactionHashes.map(async (hash) => {
            const transaction = await provider?.getTransaction(hash);
            return transaction;
          })
        );

        return transactions;
      }

      return [];
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionReceipt = async (hash: string): Promise<any> => {
    try {
      const transactionReceipt = await provider?.getTransactionReceipt(hash);

      return transactionReceipt;
    } catch (error) {
      console.log(error);
    }
  };

  const getBlockReceipt = async (hash: number): Promise<IBlockReceipt> => {
    try {
      const blockReceipt = await provider?.getBlock(hash);

      return blockReceipt;
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const contract = new ethers.Contract(GNT_ADDRESS, ercToken, provider);
      const balance = await contract.balanceOf(address);
      const convertedBalance = ethers.formatUnits(balance, 18);

      return convertedBalance;
    } catch (error) {
      console.log({ error });
    }
  };

  return {
    getLatestBlocksWithEthers,
    getLatestTransactionsWithEthers,
    getTransactionReceipt,
    getBlockReceipt,
    getBalance,
    hasProvider: !!provider && !!providerWallet,
  };
};

type EthereumContextType = ReturnType<typeof useEthereumService>;

const EthereumContext = createContext<EthereumContextType | undefined>(
  undefined
);

export const EthereumProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const ethereumService = useEthereumService();

  return (
    <EthereumContext.Provider value={ethereumService}>
      {children}
    </EthereumContext.Provider>
  );
};

// Ethereum hooks
export const useEthereum = () => {
  const context = useContext(EthereumContext);

  if (!context) {
    throw new Error("useEthereum must be used within an EthereumProvider");
  }

  return context;
};
