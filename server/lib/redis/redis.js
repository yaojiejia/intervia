import { createClient } from 'redis';

let client;

export async function connect() {
  if (!client) {
    client = createClient();
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
  }
}

export async function set(key, value, time) {
  try {
    await client.set(key, value, time);
  } catch (e) {
    console.log(e);
    return `Error setting key ${key}`;
  }
}

export async function get(key) {
  try {
    return await client.get(key);
  } catch (e) {
    console.log(e);
    return `Error getting key ${key}`;
  }
}

export function disconnect() {
  try {
    if (client) {
      client.disconnect();
      client = null;
      console.log("Disconnected successfully");
    }
  } catch (e) {
    console.log(e);
  }
}