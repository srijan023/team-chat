// scripts/test-db.ts
import { db } from "@/db/database";
import "dotenv/config";

console.log("Query keys:", Object.keys(db.query));
