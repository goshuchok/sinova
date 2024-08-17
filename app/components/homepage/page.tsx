import Link from 'next/link';
import { fetchDogBreeds, fetchCatBreeds } from '../../utils/api';
import Image from 'next/image';

type Breed = {
  id: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  breeds :[{
    name: string;
}] 
}

const HomePage = async () => {
  const [dogsData, catData] = await Promise.all([fetchDogBreeds(), fetchCatBreeds()]);
  const { breeds } = catData; 
  const { breedsDog } = dogsData;
 
  return (
    <div className="min-h-screen p-8 bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Random Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {breedsDog.map((breed: Breed) => ( 
          <Link
            key={breed.id}
            href={`/breed/dog/${breed.id}`}
            className="block p-4 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <Image 
              src={breed.url}
              alt={breed.name} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover rounded-md mb-4" 
              unoptimized     
             /> 
            <h2 className="text-lg font-semibold text-black">{breed.breeds?.[0]?.name}</h2>
          </Link>
        ))}      
        {breeds.map((breed: Breed) => (
          <Link
          key={breed.id}
          href={`/breed/cat/${breed.id}`}
          className="block p-4 border border-gray-300 rounded-md hover:bg-gray-50"
        >      
          <Image 
            src={breed.url}  
            alt={breed.name} 
            width={300} 
            height={200} 
            className="w-full h-48 object-cover rounded-md mb-4" 
            unoptimized       
          />                   
          <h2 className="text-lg font-semibold text-black">{breed.breeds?.[0]?.name}</h2>
        </Link>
        ))}
      </div>
    </div>
  </div>
  );
};

export default HomePage;