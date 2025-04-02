import {
  Commitment,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import { secret } from "./secret";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import bs58 from "bs58";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(bs58.decode(secret));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);
const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("8SE68yRsA4TH7oWSWkd7fEHiNDMBiGwYiE1rWuMtY5Qo");

// Recipient address
const to = new PublicKey("23d1irPf9ncmnFDEGZjdvGxK3eaLynqawCsTbZAusbQh");

(async () => {
  try {
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      keypair.publicKey
    );
    console.log(fromTokenAccount.address.toBase58());
    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      keypair,
      mint,
      to
    );
    console.log(toTokenAccount.address.toBase58());
    // Transfer the new token to the "toTokenAccount" we just created
    const signature = await transfer(
      connection,
      keypair,
      fromTokenAccount.address,
      toTokenAccount.address,
      keypair,

      1n * token_decimals
    );
    // Confirm the transaction
    console.log("Singature of the transfer:", signature);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
