ALTER TABLE "workspaces" ALTER COLUMN "join_key" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "workspace_name" text NOT NULL;