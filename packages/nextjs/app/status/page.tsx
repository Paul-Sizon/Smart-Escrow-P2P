"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '~~/utils/supabase/client';
import { Address } from '~~/components/scaffold-eth/Address';

const StatusesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('deal')
        .select('*');

      if (error) {
        console.error('Error fetching deals:', error);
      } else {
        setDeals(data || []);
      }
    } catch (error) {
      console.error('Unexpected error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (contractAddress: string, role: string) => {
    router.push(`/deal?contractAddress=${contractAddress}&role=${role}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Funds Released':
        return 'text-green-500';
      case 'Escrow Cancelled':
        return 'text-red-500';
      case 'Dispute Opened':
        return 'text-yellow-500';
      case 'Cancellation Requested':
        return 'text-orange-500';
      case 'Refund Processed':
        return 'text-blue-500';
      case 'Cancellation confirmed':
        return 'text-red-500';  
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Item Statuses</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Item</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Price</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Buyer</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Seller</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Status</th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">Contract Address</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal, index) => (
              <tr
                key={deal.id}
                onClick={() => handleItemClick(deal.contract_address, role as string)}
                className={`cursor-pointer ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
              >
                <td className="py-3 px-4 border-b border-gray-200">{deal.item}</td>
                <td className="py-3 px-4 border-b border-gray-200">${deal.price}</td>
                <td className="py-3 px-4 border-b border-gray-200"><Address address={deal.buyer} /></td>
                <td className="py-3 px-4 border-b border-gray-200"><Address address={deal.seller} /></td>
                <td className={`py-3 px-4 border-b border-gray-200 ${getStatusColor(deal.status)}`}>{deal.status}</td>
                <td className="py-3 px-4 border-b border-gray-200">{deal.contract_address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusesPage;
