const {ethers} = require ("hardhat");         // adding the ethers.js library provided by hardhat;

async function main() {                       // deployment code is contained here

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorldOZ");  // this ethers.js method gets my compiled contract that I will deploy
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorldOZ", "SPRMoz"); // this is deploying the contract. the arguments in the brackets are the one, required by the contract's constructor

  await superMarioWorld.deployed();  //awaits for the contract to get deployed before doing anything further

  console.log("contract deployed to Mumbai at address:" + superMarioWorld.address);

  await superMarioWorld.mint("https://ipfs.io/ipfs/QmQPM3QkQMCenuterQkRRJL224UYm5Pgf6mdHfAcTN1912")    // THIS MUST BE THE CID OF THE JSON FILE THAT CONTAINS THE METADATA !!!! I  directly invoke the mint function upon deployment. it accepts the IPFS link of the JSON file, containing the metadata of the NFT that i want to mint.


}       //braces!

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


