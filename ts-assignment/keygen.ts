import { Keypair } from "@solana/web3.js";
let kp = Keypair.generate();
console.log(`Generated solana wallet Keypair: ${kp.publicKey.toBase58()}`);
console.log(`Generated solana wallet Secret: ${kp.secretKey}`);
