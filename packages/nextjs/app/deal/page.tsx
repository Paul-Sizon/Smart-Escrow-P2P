"use client";

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useRouter, useSearchParams } from 'next/navigation';
import { useWalletClient } from 'wagmi';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';
import { Item } from '../../utils/item';
import deployedContracts from '~~/contracts/deployedContracts';
import { supabase } from '~~/utils/supabase/client';

const DealPage: React.FC = () => {
    const searchParams = useSearchParams();
    const contractAddress = searchParams.get('contractAddress');
    const role = searchParams.get('role');

    const [item, setItem] = useState<Item | null>(null);
    const [status, setStatus] = useState<string>('Pending');
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const { width, height } = useWindowSize();
    const walletClient = useWalletClient();

    useEffect(() => {
        const fetchItem = async () => {
            const fetchedItem: Item = {
                id: "1",
                imageUrl: 'https://i.ibb.co/bzL1r9t/ps5.jpg',
                price: 550,
                title: 'PS5 + games',
                description: 'Great condition',
                sellerAddress: '0x...'
            };
            setItem(fetchedItem);
        };

        if (contractAddress)
            fetchItem();
    }, []);

    const updateDealStatus = async (newStatus: string) => {
        try {
            const { error } = await supabase
                .from('deal')
                .update({ status: newStatus })
                .eq('contract_address', contractAddress);

            if (error) {
                console.error('Error updating deal status:', error);
            } else {
                setStatus(newStatus);
            }
        } catch (error) {
            console.error('Unexpected error updating deal status:', error);
        }
    };

    const handleConfirm = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 11155111;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.EscrowContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.releaseFunds();
            await tx.wait();

            await updateDealStatus('Funds Released');
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

        const chainId = 11155111;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.EscrowContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.cancelEscrow();
            await tx.wait();

            await updateDealStatus('Cancellation Requested');
        } catch (error) {
            console.error('Error cancelling escrow:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const confirmCancellation = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 11155111;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.EscrowContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.confirmCancellation();
            await tx.wait();

            await updateDealStatus('Cancellation confirmed');
        } catch (error) {
            console.error('Error cancelling escrow:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDispute = async () => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 11155111;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.EscrowContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.openDispute();
            await tx.wait();

            await updateDealStatus('Dispute Opened');
        } catch (error) {
            console.error('Error opening dispute:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResolveDispute = async (releaseToSeller: boolean) => {
        if (!walletClient.data || !contractAddress) return;

        const chainId = 11155111;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.EscrowContract?.abi;
        const contract = new ethers.Contract(contractAddress as string, abi, signer);

        setIsLoading(true);
        try {
            const tx = await contract.resolveDispute(releaseToSeller);
            await tx.wait();

            await updateDealStatus(releaseToSeller ? 'Funds Released' : 'Refund Processed');
        } catch (error) {
            console.error('Error resolving dispute:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    const disablingStatuses = ['Funds Released', 'Escrow Cancelled', 'Dispute Opened', 'Cancellation Requested', 'Refund Processed, Cancellation confirmed'];

    const isButtonDisabled = (status: string) => {
        return isLoading || disablingStatuses.includes(status);
    };

    const isConfirmDisabled = isButtonDisabled(status);
    const isCancelDisabled = isButtonDisabled(status);
    const isDisputeDisabled = isButtonDisabled(status);
    const isResolveDisabled = isButtonDisabled(status);

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
                    {role === 'buyer' && (
                        <>
                            <button
                                className="btn btn-success transition-colors disabled:bg-gray-400"
                                onClick={handleConfirm}
                                disabled={isConfirmDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Confirm'}
                            </button>
                            <button
                                className="btn btn-warning transition-colors disabled:bg-gray-400"
                                onClick={handleDispute}
                                disabled={isDisputeDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Open Dispute'}
                            </button>
                            <button
                                className="btn btn-error btn-outline transition-colors disabled:bg-gray-400"
                                onClick={handleCancel}
                                disabled={isCancelDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Request Cancellation'}
                            </button>
                        </>
                    )}
                    {role === 'seller' && (
                        <>
                            <button
                                className="btn btn-error btn-outline transition-colors disabled:bg-gray-400"
                                onClick={confirmCancellation}
                                disabled={isCancelDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Cancel order'}
                            </button>
                            <button
                                className="btn btn-warning transition-colors disabled:bg-gray-400"
                                onClick={handleDispute}
                                disabled={isDisputeDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Open Dispute'}
                            </button>
                        </>
                    )}
                     {role === 'arbiter' && (
                        <>
                            <button
                                className="btn btn-info transition-colors disabled:bg-gray-400"
                                onClick={() => handleResolveDispute(true)}
                                disabled={isResolveDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Release Funds to Seller'}
                            </button>
                            <button
                                className="btn btn-warning transition-colors disabled:bg-gray-400"
                                onClick={() => handleResolveDispute(false)}
                                disabled={isResolveDisabled}
                            >
                                {isLoading ? 'Processing...' : 'Refund Buyer'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DealPage;