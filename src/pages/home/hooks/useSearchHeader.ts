import { useState, useEffect } from 'react';
import { searchAllUsers } from 'api/user';
import { spotifySearchTopArtist } from 'api/spotify';
import useDebounce from 'hooks/useDebounce';

export function useSearchHeader() {
  const [topRatedArtist, setTopRatedArtist] = useState([]);
  const [spotifySearchResult, setSpotifySearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  const debouncedSearchValue = useDebounce(searchInput, 300);
  const topResults = spotifySearchResult.length ? spotifySearchResult : topRatedArtist;

  const loadTopArtists = async () => {
    try {
      if (topRatedArtist.length > 0) return;

      const response = await spotifySearchTopArtist({ skip: 0, take: 10 });
      const validResults = response.data?.map(result => ({
        ...result,
        professionalName: result.professional_name,
        thumbnail: result.thumbnail || result.image,
      }));
      setTopRatedArtist(validResults);
    } catch (error) {
      console.error("Error loading top artists:", error);
    }
  };

  // Handle search
  useEffect(() => {
    if (debouncedSearchValue) {
      (async () => {
        try {
          setLoading(true);
          const spotifyResponse = await searchAllUsers(
            debouncedSearchValue, 
            10, 
            "true"
          );
          const uniqueResults = spotifyResponse.data.filter((result, index, self) =>
            index === self.findIndex((t) => t.id === result.id)
          );
          setSpotifySearchResult(uniqueResults);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setSpotifySearchResult([]);
    }
  }, [debouncedSearchValue]);

  return {
    topResults,
    searchInput,
    setSearchInput,
    loading,
    loadTopArtists
  };
} 