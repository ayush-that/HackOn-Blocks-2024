import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Footer, Header, MyNFTContainer } from '../components';
import ContractABI from '../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { ethers } from 'ethers';
import axios from 'axios';

const TEST_MODE = true;
const mainURL = `https://arweave.net/`;

const Profile = () => {
  const [nfts, setNts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getNfts();
  }, []);

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      signer
    );
    return contract;
  };

  const getNfts = async () => {
    try {
      if (TEST_MODE) {
        // In test mode, create mock owned NFTs
        const mockNfts = [
          {
            price: '0.1',
            tokenId: 3,
            seller: '0x0000000000000000000000000000000000000000',
            owner:
              localStorage.getItem('walletAddress') || '0x796946405d715e384CA5D87a73E79C44aC8acbB7',
            image: 'test-image-3',
            name: 'My Test NFT 1',
            description: 'This is my test NFT in test mode',
            tokenURI: 'test-uri-3',
          },
          {
            price: '0.3',
            tokenId: 4,
            seller: '0x0000000000000000000000000000000000000000',
            owner:
              localStorage.getItem('walletAddress') || '0x796946405d715e384CA5D87a73E79C44aC8acbB7',
            image: 'test-image-4',
            name: 'My Test NFT 2',
            description: 'Another one of my test NFTs in test mode',
            tokenURI: 'test-uri-4',
          },
        ];
        setNts(mockNfts);
        setLoading(true);
        return;
      }

      const contract = await getContract();

      const data = await contract.fetchMyNFTs();

      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);

          const meta = await axios.get(mainURL + tokenURI);

          let price = ethers.utils.formatUnits(i.price.toString(), 'ether');

          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
            tokenURI,
          };
          return item;
        })
      );
      setNts(items);
      setLoading(true);
    } catch (error) {
      console.error(error);
      if (TEST_MODE) {
        const mockNfts = [
          {
            price: '0.1',
            tokenId: 3,
            seller: '0x0000000000000000000000000000000000000000',
            owner:
              localStorage.getItem('walletAddress') || '0x796946405d715e384CA5D87a73E79C44aC8acbB7',
            image: 'test-image-3',
            name: 'My Test NFT 1',
            description: 'This is my test NFT in test mode',
            tokenURI: 'test-uri-3',
          },
        ];
        setNts(mockNfts);
        setLoading(true);
      } else {
        toast.error('Something went wrong', error);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Head>
        <title> My Profile || DesiNFT</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <Header />

      <div className="bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full font-body"></div>

      <div className="flex-grow overflow-hidden">
        <section className="">
          <div className="max-w-[1400px] relative h-[180px] mx-auto my-0 bg-[#272D37]/60 rounded-2xl border-3 border-solid border-[#0039FF] sm:h-[150px] md:mx-2 mb-20">
            <div className="flex items-center justify-center w-full h-full">
              <h1 className="font-body font-semibold text-5xl md:text-2xl">My NFTs</h1>
            </div>
          </div>
        </section>
        <section className="max-w-[1200px] my-10 mx-auto grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 font-body overflow-hidden md:gap-5 md:px-5 xs:grid-cols-1 sm:h-full relative justify-center items-center px-4">
          {nfts?.map((nft, i) => (
            <MyNFTContainer key={nft.tokenId} nft={nft} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
