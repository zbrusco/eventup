import { account, databases, Query } from "./appwrite";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;
const registrationsId = import.meta.env.VITE_APPWRITE_REGISTRATIONS_ID;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function getEvents(documentId) {
  try {
    if (documentId) {
      const event = await databases.getDocument({
        databaseId,
        collectionId,
        documentId: documentId,
      });
      return event;
    }
    const response = await databases.listDocuments({
      databaseId,
      collectionId,
    });
    return response.documents;
  } catch (error) {
    throw {
      message: "Failed to fetch Events",
      statusText: error.message,
      status: error.code,
    };
  }
}
export async function getHostEvents(documentId) {
  try {
    if (documentId) {
      const event = await databases.getDocument({
        databaseId,
        collectionId,
        documentId,
      });
      return event;
    }
    const user = await account.get();
    const response = await databases.listDocuments({
      databaseId,
      collectionId,
      queries: [Query.equal("hostId", user.$id)],
    });
    return response.documents;
  } catch (error) {
    throw {
      message: "Failed to fetch host Events",
      statusText: error.code === 401 ? "Unauthorized" : error.message,
      status: error.code,
    };
  }
}
export async function loginUser(creds) {
  try {
    await account.createEmailPasswordSession({
      email: creds.email,
      password: creds.password,
    });
    const userData = await account.get();
    localStorage.setItem("loggedin", true);
    return {
      user: userData,
      token: "session-active",
    };
  } catch (error) {
    throw {
      message: error.message,
      statusText: "Unauthorized",
      status: error.code,
    };
  }
}
export async function logoutUser() {
  try {
    await account.deleteSession({ sessionId: "current" });
    localStorage.removeItem("loggedin");
  } catch (error) {
    throw {
      message: "Logout failed",
      statusText: error.message,
      status: error.code,
    };
  }
}
