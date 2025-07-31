import { ID, OAuthProvider, Query } from "appwrite";
import { account, appwriteConfig, database } from "./client";
import { redirect } from "react-router";

export const loginWithGoogle = async () => {
  try {
    account.createOAuth2Session(
      OAuthProvider.Google,
      `${window.location.origin}/`,
      `${window.location.origin}/404`
    );
  } catch (error) {
    console.log("Error during OAuth2 session creation:", error);
  }
};

export const logout = async () => {
  try {
    // Delete the current session (logs the user out)
    await account.deleteSession("current");

    return true;
  } catch (error) {
    console.log("Error during logout:", error);
    return false;
  }
};

export const getUser = async () => {
  try {
    const user = await account.get();

    if (!user) return redirect("/sign-in");

    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    // validate user if not exist return null
    if (!documents.length) return null;

    return documents[0];
  } catch (error) {
    console.log("Error fetching user data:", error);
    return null;
  }
};

export const getGooglePicture = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://people.googleapis.com/v1/people/me?personFields=photos",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch profile photo from Google People API");
    }

    const data = await response.json();

    const photos = data.photos;

    if (photos && photos.length > 0) {
      return photos[0].url;
    }

    return null;
  } catch (error) {
    console.log("Error fetching Google picture:", error);
    return null;
  }
};

// get user data from appwrite and create new user in the database
export const storeUserData = async () => {
  try {
    const user = await account.get();

    if (!user) throw new Error("User not found");

    const { providerAccessToken } = await account.getSession("current");
    const profilePicture = providerAccessToken
      ? await getGooglePicture(providerAccessToken)
      : "";

    const createdUser = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        name: user.name,
        email: user.email,
        imageUrl: profilePicture,
        joinedAt: new Date().toISOString(),
        accountId: user.$id,
      }
    );

    if (!createdUser) return redirect("/sign-in");
  } catch (error) {
    console.log("Error storing user data:", error);
    return null;
  }
};

export const getExistingUser = async (id: string) => {
  try {
    const { documents } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", id)]
    );

    // validate user if not exist return null
    if (!documents.length) return null;

    return documents[0];
  } catch (error) {
    console.log("Error fetching existing user:", error);
    return null;
  }
};

export const getAllUsers = async (limit: number, offset: number) => {
  try {
    const { documents: users, total } = await database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.limit(limit), Query.offset(offset)]
    );

    if (total === 0) return { users: [], total };

    return { users, total };
  } catch (error) {
    console.log("Error fetching all users", error);
    return { users: [], total: 0 };
  }
};
