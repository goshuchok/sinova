const DOG_API_URL = 'https://api.thedogapi.com/v1';
const CAT_API_URL = 'https://api.thecatapi.com/v1';
const REACT_APP_CAT_API_KEY ="live_Ct4aOOsBuQF9uGI7QDFWJAVa2zt788srmv3qcKWZKLkmTEjuVW9Yf5U8DRT1UbZP";
const REACT_APP_DOG_API_KEY ="live_awFiHKxtZPBTv2Brdb0vuhX5TWzrFFgKA7Jk0N6n6duHaVSqMfvbp68ZZn6mdhuN";

export const fetchDogBreeds = async () => {
     const response = await fetch(`${DOG_API_URL}/images/search?limit=21&has_breeds=1`, {
        headers: {
            "content-type": "application/json",
            'x-api-key': REACT_APP_DOG_API_KEY,
        }
    }); 
    const json = await response.json();
    return { breedsDog: json, imagesDog: json }; 
};

export const fetchCatBreeds = async () => {
    const response = await fetch(`${CAT_API_URL}/images/search?limit=21&has_breeds=1`, {
        headers: {
            "content-type": "application/json",
            'x-api-key': REACT_APP_CAT_API_KEY,
        }
    });
    const json = await response.json();
    return { breeds: json, images: json };
};

export const fetchBreedDetails = async (type: string, id: number) => {
    const apiUrl = type === 'dog' ? DOG_API_URL : CAT_API_URL; 
    const response = await fetch(`${apiUrl}/images/${id}`, {
        headers: {
            "content-type": "application/json",
            'x-api-key': REACT_APP_CAT_API_KEY,
        }
    });
    const json = await response.json();
    return { breeds: json.breeds, images: { url: json.url, width: json.width, height: json.height } };
};
