"use client";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';
import { Item } from '../item/item';
import deployedContracts from '~~/contracts/deployedContracts';

const DealPage: React.FC = () => {
    const router = useRouter();
    const [item, setItem] = useState<Item | null>(null);
    const [contractAddress, setContractAddress] = useState<string | null>(null);
    const [status, setStatus] = useState<string>('Pending');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const { width, height } = useWindowSize();
    const walletClient = useWalletClient();

    useEffect(() => {   
        const fetchItem = async () => {
            const fetchedItem: Item = {
                id: "1",
                imageUrl: 'https://via.placeholder.com/500',
                price: 1.0, // Replace with actual price
                title: 'Sample Item', // Replace with actual title
                description: 'This is a sample item description',
                sellerAddress: '0x...'
            };
            setItem(fetchedItem);
            setContractAddress('0x..'); // Replace with the actual contract address
        };

            fetchItem();
        
    }, []);

    const handleConfirm = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 31337;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.YourContract?.abi;               
        const contract = new ethers.Contract(contractAddress, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.releaseFunds();
            await tx.wait();

            setStatus('Funds Released');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        } catch (error) {
            console.error('Error releasing funds:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-lg mx-auto my-8 p-4 border border-gray-200 rounded-lg shadow-lg">
            {showConfetti && <Confetti width={width} height={height} />}
            <img src={item.imageUrl} alt={item.title} className="w-full h-auto rounded" />
            <div className="text-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800">{item.title}</h1>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-xl font-semibold text-gray-800 mt-4">Price: ${item.price.toFixed(2)}</p>
                <p className="text-lg font-semibold text-gray-800 mt-4">Status: {status}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    onClick={handleConfirm}
                    disabled={isLoading || status === 'Funds Released'}
                >
                    {isLoading ? 'Processing...' : 'Confirm'}
                </button>
            </div>
        </div>
    );
};

export default DealPage;
