import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

const backendApiUrl = process.env.INTERNAL_API_URL || "http://localhost:5000/api";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "dummy",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "dummy",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "text" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${backendApiUrl}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
            headers: { "Content-Type": "application/json" }
          });
          
          const data = await res.json();
          
          if (res.ok && data.success && data.user) {
            return { 
              ...data.user, 
              backendToken: data.token,
              rememberMe: credentials?.rememberMe === "true"
            };
          }
          
          return null;
        } catch (error) {
          console.error("Backend login error:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google" || account?.provider === "facebook") {
          try {
            const res = await fetch(`${backendApiUrl}/auth/social-login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name || "User",
                provider: account.provider,
                providerId: account.providerAccountId,
                avatarUrl: user.image || undefined
              })
            });
            const data = await res.json();
            if (res.ok && data.success && data.user) {
              token.id = data.user.id;
              token.role = data.user.role || "STUDENT";
              token.backendToken = data.token;
              token.rememberMe = true;
            } else {
              console.error("Social login sync failed:", data.message);
              token.id = user.id;
              token.role = "STUDENT";
              token.rememberMe = true;
            }
          } catch (err) {
            console.error("Social login backend connection error:", err);
            token.id = user.id;
            token.role = "STUDENT";
            token.rememberMe = true;
          }
        } else {
          token.id = user.id;
          token.role = (user as any).role;
          token.backendToken = (user as any).backendToken;
          token.rememberMe = (user as any).rememberMe;
        }

        const nowInSeconds = Math.floor(Date.now() / 1000);
        if (token.rememberMe === false) {
          token.exp = nowInSeconds + (4 * 60 * 60);
        } else {
          token.exp = nowInSeconds + (30 * 24 * 60 * 60);
        }
      }

      if (token.exp && typeof token.exp === "number") {
        const now = Math.floor(Date.now() / 1000);
        if (now > token.exp) {
          return null as any;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token && token.id) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).backendToken = token.backendToken;
        (session.user as any).rememberMe = token.rememberMe;
      }
      return session;
    }
  }
})
