import { protectedProcedure, router } from "../trpc";
import { createTrpcErrorResponse, createTrpcSuccessResponse } from "@/lib/trpcResponse";
import { TRPCError } from "@trpc/server";
import { logger } from "../utils/logger";
import { db } from "@/db/database";
import { joinedUserToWorkspace, workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";

export const workspaceRouter = router({
    getAllUserWorkspaces: protectedProcedure.query(async ({ ctx }) => {
        try {
            const response = await db.select({
                id: workspaces.id,
                name: workspaces.name
            })
                .from(workspaces)
                .innerJoin(joinedUserToWorkspace, eq(joinedUserToWorkspace.workspacesId, workspaces.id))
                .where(eq(joinedUserToWorkspace.userId, ctx.auth.userId));

            if (!response || response.length == 0) {
                return createTrpcSuccessResponse(404, "No data found", []);
            }

            return createTrpcSuccessResponse(200, "Successfully fetched workspaces", response);
        } catch (err: unknown) {

            logger.error(err)
            if (err instanceof TRPCError) {
                throw err
            }

            throw createTrpcErrorResponse('INTERNAL_SERVER_ERROR', "Something went wrong");
        }
    })
})
