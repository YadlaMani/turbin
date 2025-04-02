import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createMetadataAccountV3,
  CreateMetadataAccountV3InstructionAccounts,
  CreateMetadataAccountV3InstructionArgs,
  DataV2Args,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createSignerFromKeypair,
  signerIdentity,
  publicKey,
} from "@metaplex-foundation/umi";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { secret } from "./secret";

// Define our Mint address
const mint = publicKey("8SE68yRsA4TH7oWSWkd7fEHiNDMBiGwYiE1rWuMtY5Qo");

// Create a UMI connection
const umi = createUmi("https://api.devnet.solana.com");
const keypair = umi.eddsa.createKeypairFromSecretKey(bs58.decode(secret));
const signer = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(createSignerFromKeypair(umi, keypair)));

(async () => {
  try {
    // Start here
    let accounts: CreateMetadataAccountV3InstructionAccounts = {
      mint,
      mintAuthority: signer,
    };
    let data: DataV2Args = {
      name: "Test",
      symbol: "TET",
      uri: "https://static.vecteezy.com/system/resources/previews/022/518/779/original/cute-kawaii-baby-panda-sitting-raising-hand-cartoon-character-icon-illustration-children-illustration-animal-nature-concept-flat-cartoon-style-vector.jpg",
      sellerFeeBasisPoints: 10,
      creators: null,
      collection: null,
      uses: null,
    };
    let args: CreateMetadataAccountV3InstructionArgs = {
      data,
      isMutable: true,

      collectionDetails: null,
    };
    let tx = createMetadataAccountV3(umi, {
      ...accounts,
      ...args,
    });
    let result = await tx.sendAndConfirm(umi);
    console.log(`Checkout signature here :${bs58.encode(result.signature)}`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();
