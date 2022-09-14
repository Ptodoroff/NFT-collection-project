const {ethers} = require ("hardhat");         // adding the ethers.js library provided by hardhat;

async function main() {                       // deployment code is contained here

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld1155");  // this ethers.js method gets my compiled contract that I will deploy
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorld1155", "SPRM1155"); // this is deploying the contract. the arguments in the brackets are the one, required by the contract's constructor

  await superMarioWorld.deployed();  //awaits for the contract to get deployed before doing anything further

  console.log("contract deployed to Mumbai at address:" + superMarioWorld.address);

  await superMarioWorld.mint(5,"https://ipfs.io/ipfs/QmRnQxh5xj99LgdRkJaSPGD6bX6dW4TZ47HsUq1Mw7pBWc")    // THIS MUST BE THE CID OF THE JSON FILE THAT CONTAINS THE METADATA !!!! I  directly invoke the mint function upon deployment. it accepts the IPFS link of the JSON file, containing the metadata of the NFT that i want to mint.


}       //braces!

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


