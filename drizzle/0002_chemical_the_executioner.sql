CREATE TABLE "joined_user_to_workspace" (
	"user_id" serial NOT NULL,
	"workspace_id" serial NOT NULL,
	CONSTRAINT "joined_user_to_workspace_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id")
);
--> statement-breakpoint
CREATE TABLE "pending_user_to_workspace" (
	"user_id" serial NOT NULL,
	"workspace_id" serial NOT NULL,
	CONSTRAINT "pending_user_to_workspace_user_id_workspace_id_pk" PRIMARY KEY("user_id","workspace_id")
);
--> statement-breakpoint
ALTER TABLE "workspaces" ALTER COLUMN "join_key" SET DATA TYPE varchar(7);--> statement-breakpoint
ALTER TABLE "joined_user_to_workspace" ADD CONSTRAINT "joined_user_to_workspace_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "joined_user_to_workspace" ADD CONSTRAINT "joined_user_to_workspace_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_user_to_workspace" ADD CONSTRAINT "pending_user_to_workspace_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pending_user_to_workspace" ADD CONSTRAINT "pending_user_to_workspace_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "phone";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "workspaces";