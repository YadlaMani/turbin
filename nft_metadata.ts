import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import bs58 from "bs58";
import { secret } from "./secret";

// Create a devnet connection
const umi = createUmi("https://api.devnet.solana.com");

let keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(secret));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
  try {
    // Follow this JSON structure
    // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

    const image =
      "https://devnet.irys.xyz/5fh57AE3Rc5CYr1NPYZ9W4xCKnznFb28izYKXi2MaYx8";
    const metadata = {
      name: "RugDay",
      symbol: "3>",
      description: "Let's go rug day!",
      image:
        "https://devnet.irys.xyz/5fh57AE3Rc5CYr1NPYZ9W4xCKnznFb28izYKXi2MaYx8",
      attributes: [{ trait_type: "Fun", value: "Excitment" }],
      properties: {
        files: [
          {
            type: "image/png",
            uri: "https://devnet.irys.xyz/5fh57AE3Rc5CYr1NPYZ9W4xCKnznFb28izYKXi2MaYx8",
          },
        ],
      },
      creators: [keypair.publicKey],
    };
    const myUri = await umi.uploader.uploadJson(metadata);
    console.log("Your metadata URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();
