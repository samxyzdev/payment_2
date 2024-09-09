import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

// for migrations
const migrationClient = postgres(process.env.DATABASE_URL || "", { max: 1 });

const main = async () => {
  try {
    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./drizzle",
    });
    console.log("Migration complete");
  } catch (error) {
    console.error("Migration Failer", error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
};

main();
