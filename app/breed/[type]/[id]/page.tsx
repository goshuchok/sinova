import { fetchBreedDetails } from '../../../utils/api';
import Image from 'next/image';

type Breed = {
  name: string;
  weight: string;
  height: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  bred_for: string;
};

type BreedDetails = {
  breeds: Breed[] | null;
  images: {
    url: string;
  } | null;
};

type BreedDetailProps = {
  params: {
    type: string;
    id: number;
  };
};

export default async function BreedDetail({ params }: BreedDetailProps) {
  const { type, id } = params;
  const breedDetails: BreedDetails | null = await fetchBreedDetails(type, id);

  if (!breedDetails) {
    return <div>No details found for this breed.</div>;
  }

  const { breeds, images } = breedDetails;
  const breed = breeds?.[0];

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-black">Name: {breed?.name}</h1>
        {images && (
          <Image 
            src={images.url} 
            alt={breed ? breed.name : 'Unknown Breed'}
            width={400} 
            height={200} 
            className="w-full object-cover rounded-md mb-4" 
            unoptimized 
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
          <p className="text-lg font-semibold text-black">Life Span: {breed?.life_span}</p>
          <p className="text-lg font-semibold text-black">Temperament: {breed?.temperament}</p>
          <p className="text-lg font-semibold text-black">Bred For: {breed?.bred_for || 'Unknown'}</p>
        </div>
      </div>
    </div>
  );
}
