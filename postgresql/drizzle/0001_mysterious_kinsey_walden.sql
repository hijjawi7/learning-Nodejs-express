CREATE TABLE "owners" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"address" varchar(100) NOT NULL,
	"idCars" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "owners" ADD CONSTRAINT "owners_idCars_cars_id_fk" FOREIGN KEY ("idCars") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;