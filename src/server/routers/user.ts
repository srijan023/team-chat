import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { db } from "@/db/database";
import { joinedUserToWorkspace, pendingUserToWorkspace, userDetails, workspaces } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createTrpcErrorResponse, createTrpcSuccessResponse } from "@/lib/trpcResponse";
import { isUniqueConstraintViolation, randomJoinString } from "../utils/helper";
import { logger } from "../utils/logger";
import { TRPCError } from "@trpc/server";

export const userRouter = router({

    getUserDetails: protectedProcedure.input(z.string().email()).mutation(async ({ input }) => {
        const user = await db.select().from(userDetails).where(eq(userDetails.email, input)).limit(1)
        return user.length > 0 ? user[0] : null;
    }),

    registerUser: protectedProcedure.input(z.object({
        firstName: z.string().nonempty("First Name can't be empty"),
        lastName: z.string().nonempty("Last Name can't be empty"),
        email: z.string().email("Not a valid email"),
        methodOfJoin: z.enum(['JOIN', 'CREATE']),
        joinCode: z.string().nullable(),
        workspaceName: z.string().nullable()
    })).mutation(async ({ input }) => {

        logger.info('Request to register user');
        try {


            if (input.methodOfJoin === 'JOIN') {
                const response = await db.transaction(async (tx) => {

                    if (!input.joinCode) {
                        logger.error("Joining code not provided")

                        throw createTrpcErrorResponse('BAD_REQUEST', "Joining code not provided");
                    }

                    // find the workspace user wants to join
                    const joiningWorkspace = await tx.select()
                        .from(workspaces)
                        .where(eq(workspaces.joinKey, input.joinCode!));

                    if (joiningWorkspace.length == 0) {
                        logger.error('Join code is invalid');

                        throw createTrpcErrorResponse('BAD_REQUEST',
                            "No workspace exists with the provided code");
                    }
                    // workspace exists
                    // insert the userDetails
                    const currentUser = await tx.insert(userDetails)
                        .values({
                            firstName: input.firstName,
                            lastName: input.lastName,
                            email: input.email
                        }).returning();

                    // insert the user into the pending user list of the workspace
                    await tx.insert(pendingUserToWorkspace)
                        .values({
                            userId: currentUser[0].id,
                            workspacesId: joiningWorkspace[0].id
                        })

                    return createTrpcSuccessResponse(
                        201,
                        "User created successfully",
                        undefined);
                })

                return response;

            } else if (input.methodOfJoin === 'CREATE') {

                const response = await db.transaction(async (tx) => {
                    // first create the user account

                    if (!input.workspaceName) {

                        logger.error('Workspace name not provided');

                        throw createTrpcErrorResponse(
                            'BAD_REQUEST',
                            "You need to provide the workspace name to create the workspace"
                        );
                    }

                    const userAccount = await tx.insert(userDetails)
                        .values({
                            firstName: input.firstName,
                            lastName: input.lastName,
                            email: input.email
                        }).returning();

                    const creatorId = userAccount[0].id;

                    let createdWorkspaceId: number = 0;

                    // now create a workspace with unique join key
                    for (let i = 0; i < 5; i++) {
                        // create a random join string
                        const joinKey = randomJoinString(7);

                        try {
                            const createdWorkspace = await tx.insert(workspaces)
                                .values({
                                    name: input.workspaceName,
                                    creatorId: creatorId,
                                    joinKey: joinKey
                                }).returning();

                            createdWorkspaceId = createdWorkspace[0].id;
                            break;
                        } catch (err: unknown) {
                            // check for unique key violation and if so try again
                            if (isUniqueConstraintViolation(err)) {
                                continue;
                            }

                            throw err
                        }
                    }

                    // inserting the creator on the userlist of the workspace
                    await tx.insert(joinedUserToWorkspace)
                        .values({
                            userId: creatorId,
                            workspacesId: createdWorkspaceId
                        });

                    return createTrpcSuccessResponse(
                        201,
                        "User registered with a new workspace",
                        undefined);
                })

                return response;
            }

            logger.error("Invalid join method provided");

            throw createTrpcErrorResponse("BAD_REQUEST", "Invalid method of join");
        } catch (err: unknown) {

            if (err instanceof TRPCError) {
                throw err
            }

            logger.error(err, "Something went wrong");

            throw createTrpcErrorResponse("INTERNAL_SERVER_ERROR", "Something went wrong");
        }

    })

})
