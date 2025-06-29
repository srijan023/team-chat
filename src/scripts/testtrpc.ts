import { trpc } from "@/app/_trpc/client";

trpc.workspaceRouter.getAllUserWorkspaces.useQuery()
