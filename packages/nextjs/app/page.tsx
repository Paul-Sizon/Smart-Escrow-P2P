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
            <span className="block text-4xl font-bold">Vendeya: Safe Marketplace</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
          {connectedAddress && (
  <>
    <p className="my-2 font-medium">Connected Address:</p>
    <Address address={connectedAddress} />
  </>
)}
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 mt-4">
            <Link href="/item?role=buyer">
              <button className="btn btn-info  md:btn-md text-black">🛍️ I'm a buyer</button>
            </Link>
            <Link href="/status?role=seller">
              <button className="btn btn-success  md:btn-md text-black">🏷️ I'm a seller</button>
            </Link>
            <Link href="/status?role=arbiter">
              <button className="btn btn-warning md:btn-md text-black">⚖️ I'm an arbiter</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
