

import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";


console.log("MONGO:", process.env.MONGODB_URI);

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("facility");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: { 
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        }, 
  },
});