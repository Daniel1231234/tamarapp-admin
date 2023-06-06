import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from 'next-auth'

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log('creds => ', credentials)
                const currectPassword = process.env.PASSWORD
                const currectUsername = process.env.USERNAME

                const user = { id: "1", name: currectUsername, password: currectPassword }
                if (credentials?.password !== user.password && credentials?.username !== user.name) return null
                else return user
            }
        })
    ]
}


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
