"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '~~/utils/supabase/client';

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">Deal Statuses</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Item</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Buyer</th>
            <th className="px-4 py-2">Seller</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Contract Address</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              key={deal.id}
              onClick={() => handleItemClick(deal.contract_address, role as string)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="border px-4 py-2">{deal.item}</td>
              <td className="border px-4 py-2">{deal.price}</td>
              <td className="border px-4 py-2">{deal.buyer}</td>
              <td className="border px-4 py-2">{deal.seller}</td>
              <td className="border px-4 py-2">{deal.status}</td>
              <td className="border px-4 py-2">{deal.contract_address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusesPage;
