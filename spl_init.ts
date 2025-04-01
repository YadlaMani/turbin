import {
  Keypair,
  Connection,
  Commitment,
  PublicKey,
  Signer,
} from "@solana/web3.js";
import { createMint, mintTo } from "@solana/spl-token";
import bs58 from "bs58";
import { secret } from "./secret";

const keypair = Keypair.fromSecretKey(bs58.decode(secret));

const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

async function main() {
  const mintAddress = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    6
  );
  console.log("Mint Address:", mintAddress.toBase58());
}

main().catch(console.error);
