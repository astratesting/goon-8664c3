import "next-auth/jwt"
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      tier: string
    }
  }

  interface User {
    id: string
    email: string
    name: string
    tier: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    tier: string
  }
}
