import { initTRPC, TRPCError } from "@trpc/server"
import { Context } from "./context";

const trpc = initTRPC.context<Context>().create();

export const router = trpc.router;
export const publicProcedure = trpc.procedure;

const isAuthed = trpc.middleware(({ next, ctx }) => {
    if (!ctx.auth.userId) {
        throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'You must be logged in to access this resource.',
        })
    }
    return next({
        ctx: {
            auth: ctx.auth
        }
    })
})


export const protectedProcedure = trpc.procedure.use(isAuthed);
