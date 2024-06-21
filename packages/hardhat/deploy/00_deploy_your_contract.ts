import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  
  const buyer = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
  const seller = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
  const arbiter = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const platform_wallet = "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
  const platform_fee_percent = 1;
  const tracking_number = "123456789";
  const amount = "1";

  await deploy("YourContract", {
    from: deployer,
    // Contract constructor arguments
    args: [
      buyer,
      seller,
      arbiter,
      platform_wallet,
      platform_fee_percent,
      tracking_number
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
    value: amount
  });

  // Get the deployed contract to interact with it after deploying.
  const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];
