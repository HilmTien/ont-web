import { getURL } from "@/lib/utils";
import Credentials from "next-auth/providers/credentials";

export const MockOsu = Credentials({
  name: "Mock users",
  credentials: {
    name: { label: "Name", type: "text" },
  },
  async authorize(credentials) {
    const mockUsers = [
      {
        id: "1",
        name: "MockHost",
        image: getURL("/profile-pics/avatar-guest.png").href,
      },
    ];

    const user = mockUsers.find((u) => u.name === credentials?.name);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  },
});
