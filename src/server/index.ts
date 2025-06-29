import { userRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    workspaceRouter: workspaceRouter,
    userRouter: userRouter,
    healthCheck: publicProcedure.query(() => "ok"),
});

export type AppRouter = typeof appRouter;
