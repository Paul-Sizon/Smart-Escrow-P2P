"use client";

import {  NextPage } from 'next';
import ItemComponent from '../../components/ItemComponent';
import { Item } from '../../utils/item';

const item: Item = {
  id: '1', // Static ID, not used in navigation but can be useful for tracking or debugging
  imageUrl: 'https://i.ibb.co/bzL1r9t/ps5.jpg',
  price: 35.2676,
  sellerAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  title: 'PS5 + games',
  description: 'Great condition'
};

const ItemPage: NextPage = () => {
  return (
      <div>         
          <ItemComponent item={item} />
      </div>
  );
};

export default ItemPage;