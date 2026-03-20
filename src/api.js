import { account, databases, Query, ID } from "./appwrite";

const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const collectionId = import.meta.env.VITE_APPWRITE_EVENTS_COLLECTION_ID;
const registrationsId = import.meta.env.VITE_APPWRITE_REGISTRATIONS_ID;
const usersId = import.meta.env.VITE_APPWRITE_USERS_ID;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export async function getEvents(eventId) {
  try {
    if (eventId) {
      const event = await databases.getDocument({
        databaseId,
        collectionId,
        documentId: eventId,
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

export async function getHostEvents(eventId) {
  try {
    if (eventId) {
      const event = await databases.getDocument({
        databaseId,
        collectionId,
        documentId: eventId,
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

export async function getRegistrations(userId) {
  try {
    const response = await databases.listDocuments({
      databaseId,
      collectionId: registrationsId,
      queries: [Query.equal("userId", userId)],
    });

    return response.documents;
  } catch (error) {
    throw { message: "Failed to fetch subscriptions", status: error.code };
  }
}

export async function getSubscribedEvents(userId) {
  const regs = await getRegistrations(userId);
  const detailedEvents = await Promise.all(
    regs.map(async (reg) => {
      const event = await getEvents(reg.eventId);
      return {
        ...event,
        registrationId: reg.$id,
      };
    }),
  );
  return detailedEvents;
}

export async function getEventWithSubscription({ userId, eventId }) {
  if (!eventId) throw { message: "Missing eventId", status: 400 };
  try {
    const promises = [getEvents(eventId)];
    if (userId) {
      promises.push(
        databases.listDocuments({
          databaseId,
          collectionId: registrationsId,
          queries: [
            Query.equal("userId", userId),
            Query.equal("eventId", eventId),
          ],
        }),
      );
    }
    const [event, subscriptionResponse] = await Promise.all(promises);

    return {
      ...event,
      isSubscribed: subscriptionResponse?.documents[0]?.eventId === eventId,
      isHost: event.hostId === userId,
      registrationId: subscriptionResponse?.documents[0]?.$id || null,
    };
  } catch (error) {
    throw {
      message: "Error while loading event",
      statusText: error.message,
      status: error.code,
    };
  }
}

export async function getUserProfile(userId) {
  try {
    return await databases.getDocument({
      databaseId,
      collectionId: usersId,
      documentId: userId,
    });
  } catch (error) {
    throw { message: "Failed to fetch profile", status: error.code };
  }
}

export async function getEventParticipants(eventId) {
  try {
    const response = await databases.listDocuments({
      databaseId,
      collectionId: registrationsId,
      queries: [Query.equal("eventId", eventId)],
    });
    const registrations = response.documents;
    const participantsWithNames = await Promise.all(
      registrations.map(async (reg) => {
        const profile = await getUserProfile(reg.userId);
        return {
          ...reg,
          userName: profile ? profile.name : "Usuário desconhecido",
          userAvatar: profile ? profile.avatar : null,
        };
      }),
    );

    return participantsWithNames;
  } catch (error) {
    throw {
      message: "Error while loading participants",
      statusText: error.message,
      status: error.code,
    };
  }
}
export async function createEventParticipation({ eventId, userId }) {
  try {
    await databases.createDocument({
      databaseId,
      collectionId: registrationsId,
      documentId: ID.unique(),
      data: {
        eventId: eventId,
        userId: userId,
      },
    });
    return { success: true };
  } catch (error) {
    throw {
      message: "Erro ao realizar inscrição no evento",
      statusText: error.message,
      status: error.code,
    };
  }
}

export async function createEvent(eventData) {
  try {
    const response = await databases.createDocument({
      databaseId,
      collectionId,
      documentId: ID.unique(),
      data: eventData,
    });
    return response;
  } catch (error) {
    throw {
      message: "Erro ao criar evento",
      statusText: error.message,
      status: error.code,
    };
  }
}
export async function deleteEventParticipation({ eventId, userId }) {
  try {
    const queries = [Query.equal("eventId", eventId)];
    if (userId) {
      queries.push(Query.equal("userId", userId));
    }

    const response = await databases.listDocuments({
      databaseId,
      collectionId: registrationsId,
      queries: queries,
    });

    if (response.documents.length > 0) {
      const deletePromises = response.documents.map((doc) =>
        databases.deleteDocument({
          databaseId,
          collectionId: registrationsId,
          documentId: doc.$id,
        }),
      );
      await Promise.all(deletePromises);
      return { success: true };
    }

    if (userId) throw new Error("Inscrição não encontrada.");
    return { success: true };
  } catch (error) {
    throw {
      message: "Erro ao cancelar inscrição",
      statusText: error.message,
      status: error.code,
    };
  }
}
export async function deleteEvent({ eventId }) {
  try {
    await deleteEventParticipation({ eventId });
    await databases.deleteDocument({
      databaseId,
      collectionId,
      documentId: eventId,
    });
    return { success: true };
  } catch (error) {
    throw {
      message: "Failed to delete event",
      statusText: error.message,
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
      message: "Unauthorized",
      statusText: error.message,
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

export async function registerUser(email, password, name) {
  try {
    const newAcc = await account.create(ID.unique(), email, password, name);

    // Demonstração de consumo de API pública REST
    const fetchAvatar = async () => {
      const avatarUrl = `https://ui-avatars.com/api/?name=${name}`;
      try {
        const response = await fetch(avatarUrl);
        if (response.ok) {
          return avatarUrl;
        }
      } catch (error) {
        throw {
          message: "Failed to fetch user avatar",
          statusText: error.message,
          status: error.code,
        };
      }
    };

    const finalAvatarUrl = await fetchAvatar();

    await databases.createDocument({
      databaseId,
      collectionId: usersId,
      documentId: newAcc.$id,
      data: {
        name: name,
        avatar: finalAvatarUrl,
      },
    });

    return await loginUser({ email, password });
  } catch (error) {
    throw {
      message: "Erro ao criar conta",
      statusText: error.message,
      status: error.code,
    };
  }
}
