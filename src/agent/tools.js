
import { tool } from "@langchain/core/tools";
import { movieApi } from "../api";
import z from "zod";

export const discoverMoviesTool = new tool(

    async ({ genres, releaseYear }) => {
        const genresRes = await movieApi.get("/genre/movie/list");

        const genreIds = genres.flatMap((name) => {
            const genre = genresRes.data.genres.find(
                (genre) => genre.name.toLowerCase() === name.toLowerCase()
            );

            return genre ? [genre.id] : [];
        });

        const params = {
            sort_by: "popularity.desc",

            with_genres: genreIds.join("|"),

            "primary_release_date.gte": `${releaseYear.min}-01-01`,
            "primary_release_date.lte": `${releaseYear.max}-12-31`,

            // Only return movies
            include_adult: false,
            include_video: false,

            page: 1
        };

        const response = await movieApi.get("/discover/movie", {
            params,
        });

        const moviesList = response.data.results.slice(0, 10).map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            releaseDate: movie.release_date,
            genreIds: movie.genre_ids ?? [],
            popularity: movie.popularity,
            voteAverage: movie.vote_average,
            voteCount: movie.vote_count,
            posterPath: movie.poster_path,
        }));

        return moviesList;

    },
    {
        name: "discover_movies",
        description: "Discover movies based on genre and release year",
        schema: z.object({
            genres: z
                .array(z.string())
                .describe("TMDB movie genre names"),

            releaseYear: z
                .object({
                    min: z.number().describe("Earliest acceptable release year"),
                    max: z.number().describe("Latest acceptable release year"),
                })
                .describe("Acceptable movie release year range"),
        }),
    }
);