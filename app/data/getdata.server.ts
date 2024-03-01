import db from '~/utils/db';
import { todo } from '~/db/schema';
import { asc, eq } from 'drizzle-orm';

export async function getTodos() {
  return db.select().from(todo).orderBy(asc(todo.id));
}

export async function getTodo(id: number) {
  return db.query.todo.findFirst({
    where: eq(todo.id, id),
    with: {
      todoToTags: {
        with: {
          tag: true,
        }
      },
    }
  })
}
