import { relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const userDetails = pgTable('users', {
    id: serial('id').primaryKey(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: varchar('email', { length: 256 }).notNull().unique(),
    workspaces: text('workspaces').array(),
    joinedAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdateFn(() => new Date()),
});

export const workspaces = pgTable('workspaces', {
    id: serial('id').primaryKey(),
    name: text('workspace_name').notNull(),
    joinKey: varchar('join_key', { length: 10 }).unique().notNull(),
    creatorId: serial('creator_id').references(() => userDetails.id, { onDelete: 'cascade' }),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdateFn(() => new Date()),
})

export const workspaceRelation = relations(workspaces, ({ one }) => ({
    creator: one(userDetails, {
        fields: [workspaces.creatorId],
        references: [userDetails.id]
    })
}))

export const userRelation = relations(userDetails, ({ many }) => ({
    createdWorkspaces: many(workspaces)
}))
