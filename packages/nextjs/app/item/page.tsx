"use client";

import {  NextPage } from 'next';
import ItemComponent from '../../components/ItemComponent';
import { Item } from './item';

const item: Item = {
  id: '1', // Static ID, not used in navigation but can be useful for tracking or debugging
  imageUrl: 'https://via.placeholder.com/500',
  price: 0.01,
  sellerAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
};

const ItemPage: NextPage = () => {
  return (
      <div>         
          <ItemComponent item={item} />
      </div>
  );
};

export default ItemPage;