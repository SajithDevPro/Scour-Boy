import { db } from "../firebaseAdmin";

export async function updateUserSubscription(
  email: string,
  plan: "pro" | "elite"
) {
  try {
    const usersRef = db.collection("users");

    const snapshot = await usersRef.where("email", "==", email).get();

    if (snapshot.empty) {
      console.log("❌ User not found in Firebase:", email);
      return;
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    snapshot.forEach(async (doc) => {
      await doc.ref.update({
        subscription_tier: plan,
        subscription_expires: expiresAt,
        updatedAt: new Date(),
      });
    });

    console.log("🔥 Subscription updated:", email, plan);
  } catch (error) {
    console.error("❌ Subscription update failed:", error);
  }
}