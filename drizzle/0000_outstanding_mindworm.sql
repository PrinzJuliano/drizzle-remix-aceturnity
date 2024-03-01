CREATE TABLE IF NOT EXISTS "tags" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"done" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos_to_tags" (
	"todo_id" serial NOT NULL,
	"tag_id" varchar NOT NULL,
	CONSTRAINT "todos_to_tags_todo_id_tag_id_pk" PRIMARY KEY("todo_id","tag_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos_to_tags" ADD CONSTRAINT "todos_to_tags_todo_id_todo_id_fk" FOREIGN KEY ("todo_id") REFERENCES "todo"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos_to_tags" ADD CONSTRAINT "todos_to_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
