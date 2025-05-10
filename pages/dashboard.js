import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Footer, Header } from "../components";
import ContractABI from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";
import { truncateEthAddress } from "../utils/truncAddress";
import { useRouter } from "next/router";

const TEST_MODE = true;
const DEFAULT_TEST_IMAGE = "/logo.png";
const mainURL = `https://arweave.net/`;

const Dashboard = () => {
  const [nfts, setNts] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const getContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      ContractABI.abi,
      provider
    );
    return contract;
  };

  const getNfts = async () => {
    try {
      if (TEST_MODE) {
        const mockNfts = [
          {
            price: "0.1",
            tokenId: 1,
            seller: "0x796946405d715e384CA5D87a73E79C44aC8acbB7",
            owner: "0x0000000000000000000000000000000000000000",
            image: "test-image-1",
            name: "Test NFT 1",
            description: "This is a test NFT in test mode",
            tokenURI: "test-uri-1",
          },
          {
            price: "0.2",
            tokenId: 2,
            seller: "0x796946405d715e384CA5D87a73E79C44aC8acbB7",
            owner: "0x0000000000000000000000000000000000000000",
            image: "test-image-2",
            name: "Test NFT 2",
            description: "Another test NFT in test mode",
            tokenURI: "test-uri-2",
          }
        ];
        setNts(mockNfts);
        setLoading(true);
        return;
      }

      const contract = await getContract();

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data?.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          const meta = await axios.get(mainURL + tokenURI);
          let price = ethers.utils.formatUnits(i.price.toString(), "ether");

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
      toast.error("Something went wrong");
      if (!TEST_MODE) {
        const mockNfts = [
          {
            price: "0.1",
            tokenId: 1,
            seller: "0x796946405d715e384CA5D87a73E79C44aC8acbB7",
            owner: "0x0000000000000000000000000000000000000000",
            image: "test-image-1",
            name: "Test NFT 1",
            description: "This is a test NFT in fallback mode",
            tokenURI: "test-uri-1",
          }
        ];
        setNts(mockNfts);
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    getNfts();
  }, []);

  if (!loading)
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center font-body">
        <img src="/logo.png" alt="logo" className="h-[160px] animate-bounce" />
        <h2 className="text-7xl font-semibold ">Loading...</h2>
      </div>
    );

  return (
    <div className="relative min-h-screen flex flex-col">
      <Head>
        <title>Dashboard || DesiNFT</title>
        <link rel="shortcut icon" href="logo.png" />
      </Head>
      <Header />
      <div className="bg-[#1242ef] absolute left-[-250px] top-[-210px] h-[352px] w-[652px] blur-[350px] rounded-full"></div>
      {!nfts.length ? (
        <div className="flex-grow flex flex-col items-center justify-center font-body">
          <h2 className="text-7xl font-semibold">No NFTs in Marketplace</h2>
        </div>
      ) : (
        <div className="flex-grow overflow-hidden">
          <h1 className="text-center text-4xl font-semibold mt-8">Hot NFTs</h1>
          <section className="max-w-[1200px] my-10 mx-auto grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4 font-body overflow-hidden md:gap-5 md:px-5 sm:h-full relative justify-center items-center px-4">
            {nfts?.map((nft, i) => (
              <div key={i} className="w-full h-[400px] sm:h-full ssm:h-max">
                <div
                  className="w-full h-full ssm:h-max bg-[#272D37]/60 rounded-2xl flex flex-col p-4 sm:h-max cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition duration-300"
                  onClick={() => {
                    router.push({
                      pathname: "/nft-details",
                      query: nft,
                    });
                  }}
                >
                  <div className="relative transition duration-150 ease-in-out delay-150">
                    <img
                      src={nft.image?.startsWith('test-') ? DEFAULT_TEST_IMAGE : mainURL + nft?.image}
                      alt="mock"
                      className="w-full h-[220px] object-cover rounded-xl"
                    />
                    <div className="absolute top-0 left-0 bg-white/40 backdrop-blur-xl w-full h-full z-[20] rounded-xl opacity-0 hover:opacity-100 transition duration-300">
                      <div className="flex items-center justify-center h-full">
                        <button
                          className="bg-[#1E50FF] outline-none border-none py-2 px-4 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-110 hover:drop-shadow-xl hover:shadow-sky-600 w-auto text-sm"
                          onClick={() => {
                            router.push({
                              pathname: "/nft-details",
                              query: nft,
                            });
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <h1 className="text-lg font-semibold truncate">{nft.name}</h1>
                    <div className="flex justify-between mt-2">
                      <div>
                        <p className="my-1 text-xs text-[#8F9CA9]">
                          Creator
                        </p>
                        <h4 className="my-0 text-xs text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                          {truncateEthAddress(nft.seller)}
                        </h4>
                      </div>
                      <div>
                        <p className="my-1 text-xs text-[#8F9CA9]">Price</p>
                        <h4 className="my-0 text-sm font-semibold">{nft.price} ETH</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;
