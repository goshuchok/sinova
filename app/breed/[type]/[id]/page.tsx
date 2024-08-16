"use client"

import { useEffect, useState } from 'react';
import { fetchBreedDetails } from '../../../utils/api';
import Image from 'next/image';

type BreedDetails = {
  name: string;
  weight: string;
  height: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  bred_for: string;
};

export default function BreedDetail({ params }: { params: { type: string; id: number } }) {
  const { type, id } = params;
  const [breedDetails, setBreedDetails] = useState<{ breed: BreedDetails | null, image: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const data = await fetchBreedDetails(type, id);
          setBreedDetails(data);
          setLoading(false);
        } catch (error) {
          console.error('Failed to fetch breed details:', error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [type, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!breedDetails) {
    return <div>No details found for this breed.</div>;
  }

  const { breed, image } = breedDetails;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">{breed?.name}</h1>
        {image && (
          <Image 
            src={image} 
            alt={breed ? breed.name : 'Unknown Breed'}
            width={400} 
            height={200} 
            className="w-full object-cover rounded-md mb-4" 
            unoptimized 
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <p className="text-lg font-semibold text-black">Life Span: {breed?.life_span}</p>
          <p className="text-lg font-semibold text-black">Temperament: {breed?.temperament}</p>
          {/* <p className="text-lg font-semibold text-black">Bred For: {breed?.bred_for}</p> */}
        </div>
      </div>
    </div>
  );
}





