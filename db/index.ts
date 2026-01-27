import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { inspect } from "node:util";
import { Pool } from "pg";
import * as schema from "./schema"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  maxUses: 10,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 15000,
});

//Dev logging
pool
  .on("connect", (client) => {
    console.log(inspect("New client connected to pool", { colors: true }), {
      poolStats: getPoolStatus(),
    });

    client.on("error", (err) => {
      console.error(inspect("Database client error:", { colors: true }), {
        error: err,
        poolStats: getPoolStatus(),
      });
    });

    client.on("notice", (notice) => {
      console.log(inspect("Database notice:", { colors: true }), {
        notice,
      });
    });
  })
  .on("acquire", () => {
    console.log(inspect("Client acquired from pool", { colors: true }), {
      poolStats: getPoolStatus(),
    });
  })
  .on("remove", () => {
    console.log(inspect("Client being removed from pool", { colors: true }), {
      poolStats: getPoolStatus(),
      reason: "Pool shrinking or client error",
    });
  })
  .on("error", (err) => {
    console.error(inspect("Unexpected pool error", { colors: true }), {
      error: err,
      poolStats: getPoolStatus(),
    });
  });

export const getPoolStatus = () => ({
  activeConnections: pool.totalCount,
  idleConnections: pool.idleCount,
  waitingConnections: pool.waitingCount,
});

export type DbType = NodePgDatabase<typeof schema>;

const disableLogger = false;

export const db = drizzle(pool, {
  schema,
  logger: disableLogger
    ? undefined
    : {
        logQuery: (query, params) => {
          console.debug(
            inspect(
              {
                query,
                params: params || null,
              },
              { colors: true, depth: null },
            ),
            "[drizzle]",
          );
        },
      },
});
