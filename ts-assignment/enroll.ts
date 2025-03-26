import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider } from "@coral-xyz/anchor";
import { IDL, Turbin3Prereq } from "./programs/Turbin3_prereq";
import secretKey from "./config";
import bs58 from "bs58";
const keypair = Keypair.fromSecretKey(bs58.decode(secretKey));

const connection = new Connection("https://api.devnet.solana.com");

const github = Buffer.from("YadlaMani", "utf8");
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

const program: Program<Turbin3Prereq> = new Program(IDL, provider);
const enrollment_seeds = [Buffer.from("pre"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

async function enroll() {
  try {
    const txhash = await program.methods
      .submit(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(
      `Enrollment request sent. Txhash: https://explorer.solana.com/tx/${txhash}?cluster=devnet`
    );
  } catch (err) {
    console.log("Something went wrong:", err);
  }
}
enroll();
