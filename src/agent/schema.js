import z from "zod";

export const RawPreferenceSchema = z.object({
    genreNames: z.array(z.string()).describe("Movie genre name"),
    releaseYear: z.object({
        min: z.number(),
        max: z.number()
    }).describe("Acceptable release year range")
});
