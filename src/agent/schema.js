import z from "zod";

export const RawPreferenceSchema = z.object({
    genreNames: z.array(z.string()).describe("Movie genre name"),
    releaseYear: z.object({
        min: z.number(),
        max: z.number()
    }).describe("Acceptable release year range")
});

export const RecommendationSchema = z.object({
    recommendations: z.string().describe("A JSON stringified array of objects representing the top 3 recommended movies. Each object must have 'id', 'title', and 'reason'.")
});