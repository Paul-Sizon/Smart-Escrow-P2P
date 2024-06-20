"use client";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';
import { Item } from '../../utils/item';
import deployedContracts from '~~/contracts/deployedContracts';

const DealPage: React.FC = () => {
    const searchParams = useSearchParams();
    const contractAddress = searchParams.get('contractAddress');
    const itemId = searchParams.get('itemId');

    const [item, setItem] = useState<Item | null>(null);
    const [status, setStatus] = useState<string>('Pending');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);


    const { width, height } = useWindowSize();
    const walletClient = useWalletClient();

    useEffect(() => {
        const fetchItem = async () => {
            // Replace with your actual data fetching logic
            const fetchedItem: Item = {
                id: itemId as string,
                imageUrl: 'https://i.ibb.co/bzL1r9t/ps5.jpg', // Replace with actual image URL
                price: 0.01, // Replace with actual price
                title: 'PS5 + games', // Replace with actual title
                description: 'Great condition',
                sellerAddress: '0x...'
            };
            setItem(fetchedItem);
        };

        if (itemId) {
            fetchItem();
        }
    }, [itemId]);

    const handleConfirm = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 31337;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.YourContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

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

    const handleCancel = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 31337;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.YourContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.cancelEscrow();
            await tx.wait();

            setStatus('Cancellation is requested. Wait for seller to confirm.');
        } catch (error) {
            console.error('Error cancelling escrow:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDispute = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 31337;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.YourContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.openDispute();
            await tx.wait();

            setStatus('Dispute Opened');
        } catch (error) {
            console.error('Error opening dispute:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    const disablingStatuses = ['Funds Released', 'Escrow Cancelled', 'Dispute Opened', 'Cancellation is requested. Wait for seller to confirm.'];

    const isButtonDisabled = (status: string) => {
        return isLoading || disablingStatuses.includes(status);
    };

    const isConfirmDisabled = isButtonDisabled(status);
    const isCancelDisabled = isButtonDisabled(status);
    const isDisputeDisabled = isButtonDisabled(status);

    return (
        <div className="max-w-lg mx-auto my-8 p-4 border border-gray-200 rounded-lg shadow-lg">
            {showConfetti && <Confetti width={width} height={height} />}
            <img src={item.imageUrl} alt={item.title} className="w-full h-auto rounded" />
            <div className="text-center mt-4">
                <h1 className="text-2xl font-semibold text-gray-800">{item.title}</h1>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-600">Meet with seller to receive item</p>                
                <p className="text-xl font-semibold text-gray-800 mt-4">Price: ${item.price.toFixed(2)}</p>
                <p className="text-lg font-semibold text-gray-800 mt-4">Status: {status}</p>
                <div className="mt-4 flex flex-col items-center space-y-4">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                        onClick={handleConfirm}
                        disabled={isConfirmDisabled}
                    >
                        {isLoading ? 'Processing...' : 'Confirm'}
                    </button>
                    <button
                        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors disabled:bg-gray-400"
                        onClick={handleDispute}
                        disabled={isDisputeDisabled}
                    >
                        {isLoading ? 'Processing...' : 'Open dispute'}
                    </button>
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:bg-gray-400"
                        onClick={handleCancel}
                        disabled={isCancelDisabled}
                    >
                        {isLoading ? 'Processing...' : 'Request Cancellation'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DealPage;
