const {ethers} = require ("hardhat");         // adding the ethers.js library provided by hardhat;

async function main() {                       // deployment code is contained here

  const SuperMarioWorld = await ethers.getContractFactory("SuperMarioWorld");  // this ethers.js method gets my compiled contract that I will deploy
  const superMarioWorld = await SuperMarioWorld.deploy("SuperMarioWorld", "SPRM"); // this is deploying the contract. the arguments in the brackets are the one, required by the contract's constructor

  await superMarioWorld.deployed();  //awaits for the contract to get deployed before doing anything further

  console.log("contract deployed to Mumbai at address:" + superMarioWorld.address);

  await superMarioWorld.mint("https://ipfs.io/ipfs/QmYHDKxEKzxa9aLEsC5HJcmpLfjCcB8XyD5fAhzV5pPKTd")    // I  directly invoke the mint function upon deployment. it accepts the IPFS link of the JSON file, containing the metadata of the NFT that i want to mint.


}       //braces!

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


