mod programs;
#[cfg(test)]
mod tests {
    use super::*;
    use bs58;
    use solana_client::rpc_client::RpcClient;
    use solana_sdk::{
        hash::hash,
        message::Message,
        signature::{read_keypair_file, Keypair, Signer},
        system_instruction,
        system_program,
        transaction::Transaction,
        pubkey::Pubkey,
    };

    use crate::programs::Turbin3_prereq::{CompleteArgs, TurbinePrereqProgram};
    use std::io::{self, BufRead};
    use std::str::FromStr;
    const RPC_URL: &str = "https://api.devnet.solana.com";
    #[test]
    fn base58_to_wallet() {
       
        println!("Your wallet file is:");
        let wallet = bs58::decode("secretkey").into_vec().unwrap();
        println!("{:?}", wallet);
    }
    #[test]
    fn final_submission(){
        let signer=read_keypair_file("Turbin3_wallet.json").expect("Failed to read keypair file");
        let client = RpcClient::new(RPC_URL);
        let prereq= TurbinePrereqProgram::derive_program_address(&[
            b"prereq",
            signer.pubkey().to_bytes().as_ref(),
        ]);
        let args=CompleteArgs{
            github:b"YadlaMani".to_vec(),
        };
        let blockhash=client.get_latest_blockhash().unwrap();
        let transaction = TurbinePrereqProgram::complete(
            &[&signer.pubkey(), &prereq, &system_program::id()],
            &args,
            Some(&signer.pubkey()),
            &[&signer],
            blockhash,
        );
        let signature=client.send_and_confirm_transaction(&transaction).expect("Failed to send transaction");
        println!(
            "Success! Check out your TX here: https://explorer.solana.com/tx/{}/?cluster=devnet",
            signature
        );

    }

}
