export default async () => {
  // 👇 Use your env variable for backend URL
  const url = process.env.VITE_API_URL + "/"; // hitting root endpoint

  try {
    const res = await fetch(url);
    const text = await res.text();

    console.log("✅ Keep-alive ping successful:", text);

    return {
      statusCode: 200,
      body: "Pinged backend successfully",
    };
  } catch (err) {
    console.error("❌ Ping failed:", err);
    return {
      statusCode: 500,
      body: "Ping failed",
    };
  }
};

// Schedule: run every 5 minutes
export const config = {
  schedule: "@every 5m",
};
