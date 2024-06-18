
import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { useWalletClient } from 'wagmi';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { Item } from '../app/item/item';
import deployedContracts from '~~/contracts/deployedContracts';
import { getBytecode } from '~~/app/api/getBytecode';

interface ItemComponentProps {
    item: Item;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);   

    const { width, height } = useWindowSize();
    const walletClient = useWalletClient();
    const router = useRouter();

    const getContractFactory = async () => {
        if (!walletClient.data) {
            console.error('No provider available');
            return null;
        }
        
        const chainId = 31337;
        const provider = new ethers.BrowserProvider(walletClient.data);
        const signer = await provider.getSigner();
        const abi = deployedContracts[chainId]?.YourContract?.abi;       
        const bytecode = getBytecode();        

        return new ethers.ContractFactory(abi, bytecode, signer);
    };

    const handleBuy = async () => {
        const contractFactory = await getContractFactory();
        if (!contractFactory) return;

        setIsLoading(true);
        try {
            const buyer = walletClient.data?.account.address;
            const seller = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
            const arbiter = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
            const platformWallet = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
            const platformFeePercent = 10;
            const trackingNumber = "123456789";
            const amount = ethers.parseEther(item.price.toString());
            const gasLimit = 3000000;

            const contract = await contractFactory.deploy(
                buyer,
                seller,
                arbiter,
                platformWallet,
                platformFeePercent,
                trackingNumber,
                { value: amount, gasLimit }
            );

            await contract.waitForDeployment();

            const contractAddress = await contract.getAddress();

            console.log("Contract deployed at:", contractAddress);

            setShowSuccessAlert(true);
            setShowConfetti(true);
            setTimeout(() => {
                setShowSuccessAlert(false);
                setShowConfetti(false);
            }, 5000);

            // Redirect to deal page with contract address in the query parameters
            router.push(`/deal?contractAddress=${contractAddress}&itemId=${item.id}`);
        } catch (error) {
            console.error('Error deploying contract:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-sm mx-auto my-4 p-4 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1">
            {showConfetti && <Confetti width={width} height={height} />}
            {showSuccessAlert && (
                <div role="alert" className="alert alert-success mx-auto w-full max-w-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Transaction successful! Contract deployed.</span>
                </div>
            )}
            <img src={item.imageUrl} alt="Item Image" className="w-full h-auto rounded" />
            <div className="text-center mt-4">
                <h2 className="text-xl font-semibold text-gray-800">Price: ${item.price.toFixed(2)}</h2>
                <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    onClick={handleBuy}
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Buy'}
                </button>
            </div>
        </div>
    );
};

export default ItemComponent;
