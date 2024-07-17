import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, TARGET_SERVER, NODE_ENV } =
  process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !TARGET_SERVER || !NODE_ENV) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  TARGET_SERVER,
  NODE_ENV,
};

