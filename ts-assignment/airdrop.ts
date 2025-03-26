import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";
import wallet from "./dev-wallet.json";
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com");
async function airdrop() {
  try {
    const txhash = await connection.requestAirdrop(
      keypair.publicKey,
      2 * LAMPORTS_PER_SOL
    );
    console.log(
      `Airdrop request sent. Txhash: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    );
  } catch (err) {
    console.log("Something went wrong:", err);
  }
}
airdrop();
