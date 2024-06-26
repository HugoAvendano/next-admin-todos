import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { signInEmailPassword } from "./auth/actions/auth-actions";



const prisma = new PrismaClient();
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder:"*******" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials.email as string,credentials.password as string)
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } 
        // If you return null then an error will be displayed advising the user to check their details.
        return null
  
        // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        
      }
    })
  ],

  session:{
    strategy:'jwt'
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials}){
      return true
    },

    async jwt({token, user,account, profile}){
      const dbUser =  await prisma.user.findUnique({where: {email: token.email?? 'no-email'}});
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'
      
      return token;
    },

    session({session,token, user}){
      console.log(token);
      if (session && session.user){
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      console.log("Session: " + JSON.stringify(session));
      return session
    }
  }
});

