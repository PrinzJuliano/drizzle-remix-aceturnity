import { boolean, pgTable, primaryKey, serial, text, varchar } from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';

export const todo = pgTable("todo", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
});

export const todoRelations = relations(todo, ({ many }) => ({
  todoToTags: many(todoToTags),
}));

export const tags = pgTable("tags", {
  id: varchar('id').primaryKey().$defaultFn(() => createId()),
  name: text('name').notNull(),
})

export const tagsRelations = relations(tags, ({ many }) => ({
  todoToTags: many(todoToTags),
}));

export const todoToTags = pgTable('todos_to_tags', {
    todoId: serial('todo_id').notNull().references(() => todo.id),
    tagId: varchar('tag_id').notNull().references(() => tags.id),
  }, (t) => ({
    pk: primaryKey({columns: [t.todoId, t.tagId]}),
  }),
);


export const todoToTagsRelations = relations(todoToTags, ({ one }) => ({
  todo: one(todo, {
    fields: [todoToTags.todoId],
    references: [todo.id],
  }),
  tag: one(tags, {
    fields: [todoToTags.tagId],
    references: [tags.id],
  }),
}));
