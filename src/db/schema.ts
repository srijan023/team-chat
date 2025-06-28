import { relations } from "drizzle-orm";
import { pgTable, primaryKey, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userDetails = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: varchar('email', { length: 256 }).notNull().unique(),
    joinedAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdateFn(() => new Date()),
});

export const workspaces = pgTable('workspaces', {
    id: serial('id').primaryKey(),
    name: text('workspace_name').notNull(),
    joinKey: varchar('join_key', { length: 7 }).unique().notNull(),
    creatorId: serial('creator_id').references(() => userDetails.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdateFn(() => new Date()),
})

// one to many relation bewteen workspace and its creator
export const workspaceCreatorRelation = relations(workspaces, ({ one }) => ({
    creator: one(userDetails, {
        fields: [workspaces.creatorId],
        references: [userDetails.id]
    })
}))

export const creatorWorkspaceRelation = relations(userDetails, ({ many }) => ({
    createdWorkspaces: many(workspaces)
}))

// many to many relation bewteen workspace and pending users
export const pendingUserToWorkspace = pgTable('pending_user_to_workspace', {
    userId: serial('user_id').notNull().references(() => userDetails.id, { onDelete: 'cascade' }),
    workspacesId: serial('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' })
}, (table) => [
    // composite key for unique entry
    primaryKey({ columns: [table.userId, table.workspacesId] })
])

export const pendingUserWorkspaceRelation = relations(userDetails, ({ many }) => ({
    requestedWorkspaces: many(workspaces)
}))

export const workspacePendingUserRelation = relations(workspaces, ({ many }) => ({
    pendingUsers: many(userDetails)
}))

// many to many relation between workspace and joined users
export const joinedUserToWorkspace = pgTable('joined_user_to_workspace', {
    userId: serial('user_id').notNull().references(() => userDetails.id, { onDelete: 'cascade' }),
    workspacesId: serial('workspace_id').notNull().references(() => workspaces.id, { onDelete: 'cascade' })
}, (table) => [
    // composite key for unique entry
    primaryKey({ columns: [table.userId, table.workspacesId] })
])

export const joinedUserWorkspaceRelation = relations(userDetails, ({ many }) => ({
    joinedWorkspaces: many(workspaces)
}))

export const workspaceJoindUserRelation = relations(workspaces, ({ many }) => ({
    joinedUsers: many(userDetails)
}))
