"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Vendeya: Safe Marketplace</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mt-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <span role="img" aria-label="buyer">🛍️</span> I'm a buyer
            </button>
            <button className="bg-green-500 text-white py-2 px-4 rounded">
              <span role="img" aria-label="seller">🏷️</span> I'm a seller
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded">
              <span role="img" aria-label="arbiter">⚖️</span> I'm an arbiter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
