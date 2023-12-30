import { useState, useEffect } from "react";
import TvShowApiService from "../../apiService/tvShowsApiService";
import "./genres.css";
// Define a type for genre data
interface Genre {
  id: number;
  name: string;
}

interface FetchGenresProps {
  onSelectGenre: (selectedGenreId: number) => void;
}

function FetchTvShowGenres({ onSelectGenre }: FetchGenresProps) {
  // State to store fetched genres
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await TvShowApiService.fetchGenres();
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);
  return (
    <>
      <div className="genre_container">
        {/* Render the select with genres */}
        <select
          name="genre"
          id="genre"
          className="select_genre"
          onChange={(e) => onSelectGenre(Number(e.target.value))}
        >
          <option value="0">Select Genre</option>
          {loading ? (
            <option value="" disabled>
              Loading genres...
            </option>
          ) : (
            genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))
          )}
        </select>
      </div>
    </>
  );
}

export default FetchTvShowGenres;
