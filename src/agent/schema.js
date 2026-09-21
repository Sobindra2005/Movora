import z from "zod";

export const RawPreferenceSchema = z.object({
    genreNames: z.array(z.string()).describe("Movie genre name"),
    releaseYear: z.object({
        min: z.number(),
        max: z.number()
    }).describe("Acceptable release year range")
});


export const RecommendationSchema = z.object({
    recommendations: z.string("valid json format").describe("The final recommended movies").length(3)
});
