const DOG_API_URL = 'https://api.thedogapi.com/v1';
const CAT_API_URL = 'https://api.thecatapi.com/v1';

export const fetchDogBreeds = async () => {
    const response = await fetch(`${DOG_API_URL}/breeds`);
    const breedsDog = await response.json();

    const imageResponse = await fetch(`${DOG_API_URL}/images/search?limit=10`);
    const imagesDog = await imageResponse.json();

    return { breedsDog, imagesDog }; 
};

export const fetchCatBreeds = async () => {
    const response = await fetch(`${CAT_API_URL}/breeds`);
    const breeds = await response.json();    
    
    const imageResponse = await fetch(`${CAT_API_URL}/images/search?limit=10`);
    const images = await imageResponse.json();
    
    return { breeds, images }; 
};

export const fetchBreedDetails = async (type: string, id: number) => {
    const apiUrl = type === 'dog' ? DOG_API_URL : CAT_API_URL;
    const response = await fetch(`${apiUrl}/breeds/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch breed details');
    }
    const breedDetails = await response.json();
    const imageResponse = await fetch(`${apiUrl}/images/search?breed_id=${id}&limit=1`);
    const images = await imageResponse.json();
    return {
        breed: breedDetails,
        image: images.length > 0 ? images[0].url : null,
    };
};
