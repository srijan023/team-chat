import { userRouter } from "./routers/user";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    userRouter: userRouter,
    healthCheck: publicProcedure.query(() => "ok"),
});

export type AppRouter = typeof appRouter;
