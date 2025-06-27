import { db } from "@/db/database";
import { publicProcedure, router } from "./trpc";
import { userDetails } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const appRouter = router({
    getUserDetails: publicProcedure.input(z.string().email()).mutation(async ({ input }) => {
        const user = await db.select().from(userDetails).where(eq(userDetails.email, input)).limit(1)
        return user.length > 0 ? user[0] : null;
    }),
});

export type AppRouter = typeof appRouter;
