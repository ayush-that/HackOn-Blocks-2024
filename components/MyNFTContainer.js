import { useRouter } from 'next/router';
import React from 'react';
import { truncateEthAddress } from '../utils/truncAddress';

// Test mode settings
const TEST_MODE = true;
const DEFAULT_TEST_IMAGE = '/logo.png'; // Use your logo as placeholder for test images

const mainURL = `https://arweave.net/`;

const MyNFTContainer = ({ nft }) => {
  const router = useRouter();

  return (
    <div key={nft.tokenId} className="w-full h-[400px] sm:h-full ssm:h-max">
      <div
        className="w-full h-full ssm:h-max bg-[#272D37]/60 rounded-2xl flex flex-col p-4 sm:h-max cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition duration-300"
        onClick={() => {
          router.push({
            pathname: '/nft-details',
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
            <div className="flex items-center justify-center h-full ">
              <button
                className="bg-[#1E50FF] outline-none border-none py-2 px-4 rounded-xl font-body cursor-pointer transition duration-250 ease-in-out hover:scale-110 hover:drop-shadow-xl hover:shadow-sky-600 w-auto text-sm"
                onClick={() => {
                  router.push({
                    pathname: '/nft-details',
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
              <p className="my-1 text-xs text-[#8F9CA9]">Owner</p>
              <h4 className="my-0 text-xs text-transparent font-bold bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                {truncateEthAddress(nft.owner)}
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
  );
};

export default MyNFTContainer;
