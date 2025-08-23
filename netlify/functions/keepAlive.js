export default async () => {
  const url = process.env.VITE_API_URL + "/"; // ping your backend root

  try {
    const res = await fetch(url);
    const text = await res.text();

    console.log("✅ Keep-alive ping successful:", text);

    // ✅ Return a proper Response object
    return new Response("Pinged backend successfully", { status: 200 });
  } catch (err) {
    console.error("❌ Ping failed:", err);

    return new Response("Ping failed", { status: 500 });
  }
};

// Schedule: run every 5 minutes
export const config = {
  schedule: "@every 5m",
};
