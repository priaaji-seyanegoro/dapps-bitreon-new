// lib/client.ts
import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!; // this will be used on the client
const secretKey = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_SECRET!; // this will be used on the server-side

export const client = createThirdwebClient(
    secretKey ? { secretKey } : { clientId },
);