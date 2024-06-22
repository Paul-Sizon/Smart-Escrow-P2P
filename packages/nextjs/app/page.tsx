"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import Link from 'next/link';

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Escrow for P2P Marketplaces</span>
          </h1>
          <div className="text-center mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="text-xl font-semibold text-gray-800 mb-4">Secure, stable, and cost-effective transactions for emerging markets</p>
            <ul className="text-left text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="font-bold text-green-600 mr-2">•</span>
                <span><strong>Reduce Scams:</strong> Funds held until conditions are met.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-blue-600 mr-2">•</span>
                <span><strong>Stable Currency:</strong> Avoids local currency fluctuations.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-yellow-600 mr-2">•</span>
                <span><strong>Lower Fees:</strong> Cheaper than traditional banking.</span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-purple-600 mr-2">•</span>
                <span><strong>Crypto Adoption:</strong> Secure transactions with growing crypto use.</span>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center space-x-2 mt-6">
            {connectedAddress && (
              <>
                <p className="my-2 font-medium">Connected Address:</p>
                <Address address={connectedAddress} />
              </>
            )}
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mt-4">
            <Link href="/item?role=buyer">
              <button className="btn btn-info md:btn-md text-black">🛍️ I am a buyer</button>
            </Link>
            <Link href="/status?role=seller">
              <button className="btn btn-success md:btn-md text-black">🏷️ I am a seller</button>
            </Link>
            <Link href="/status?role=arbiter">
              <button className="btn btn-warning md:btn-md text-black">⚖️ I am an arbiter</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
