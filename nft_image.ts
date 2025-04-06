import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createGenericFile,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import bs58 from "bs58";
import { secret } from "./secret";
import { promises as fs } from "fs";
// Create a devnet connection
const umi = createUmi(
  "https://solana-devnet.g.alchemy.com/v2/NrBFmIJBiDF0q7OF3tsdrm6341PJkhe1"
);

let keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(secret));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/" }));
umi.use(signerIdentity(signer));

(async () => {
  try {
    //1. Load image
    const image = await fs.readFile("turbin.png");
    //2. Convert image to generic file.
    const file = createGenericFile(image, "rug_image", {
      contentType: "image/png",
    });
    //3. Upload image
    // const image = ???
    const [myUri] = await umi.uploader.upload([file]);
    console.log("Your image URI: ", myUri);
  } catch (error) {
    console.log("Oops.. Something went wrong", error);
  }
})();

//https://devnet.irys.xyz/5fh57AE3Rc5CYr1NPYZ9W4xCKnznFb28izYKXi2MaYx8
