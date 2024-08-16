"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchDogBreeds, fetchCatBreeds } from '../../utils/api';
import Image from 'next/image';

interface Breed {
  id: string;
  name: string; 
  imagesDog: string;
}

const HomePage: React.FC = () => {
  const [dogBreeds, setDogBreeds] = useState<{ breed: Breed; image: string }[]>([]); 
  const [catBreeds, setCatBreeds] = useState<{ breed: Breed; image: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [dogsData, catData] = await Promise.all([fetchDogBreeds(), fetchCatBreeds()]);
      const { breeds, images } = catData; 
      const { breedsDog, imagesDog } = dogsData;
      setDogBreeds(breedsDog.map((breed: Breed, index: number) => ({ breed, image: imagesDog[index]?.url }))); 
      setCatBreeds(breeds.map((breed: Breed, index: number) => ({ breed, image: images[index]?.url })));
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen p-8 bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Random Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dogBreeds.slice(0, 10).map(({ breed, image }) => ( 
          <Link
            key={breed.id}
            href={`/breed/dog/${breed.id}`}
            className="block p-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Image 
              src={image}
              alt={breed.name} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover rounded-md mb-4" 
              unoptimized 
            /> 
            <h2 className="text-lg font-semibold text-black">{breed.name}</h2>
          </Link>
        ))}
        {catBreeds.slice(0, 10).map(({ breed, image }) => ( 
          <Link
            key={breed.id}
            href={`/breed/cat/${breed.id}`}
            className="block p-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >      
            <Image 
              src={image}  
              alt={breed.name} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover rounded-md mb-4" 
              unoptimized 
            />                   
            <h2 className="text-lg font-semibold text-black">{breed.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

export default HomePage;