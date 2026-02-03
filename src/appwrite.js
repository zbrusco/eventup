import { Client, Account, Databases, Query } from "appwrite";

const id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client().setEndpoint(endpoint).setProject(id);
const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases, Query };
