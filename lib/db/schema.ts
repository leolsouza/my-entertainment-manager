import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const movies = sqliteTable("movies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tmdbId: integer("tmdb_id"),
  title: text("title").notNull(),
  overview: text("overview").notNull().default(""),
  posterPath: text("poster_path"),
  releaseDate: text("release_date"),
  genreIds: text("genre_ids", { mode: "json" }).$type<number[]>(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const series = sqliteTable("series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  tmdbId: integer("tmdb_id"),
  name: text("name").notNull(),
  overview: text("overview").notNull().default(""),
  posterPath: text("poster_path"),
  firstAirDate: text("first_air_date"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  googleBooksId: text("google_books_id"),
  title: text("title").notNull(),
  authors: text("authors", { mode: "json" }).$type<string[]>(),
  posterPath: text("poster_path"),
  releaseDate: text("release_date"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})
