
import styled from "styled-components";
import { NFTCard, NftPhoto } from "./components/NFTCard";
import {useState, useEffect} from "react";
import {NFTModal} from "./components/NFTModal";
import {ethers} from "ethers";
import { connect } from "./helpers";
const axios = require ("axios");

function App() {

  let initialNfts = [{
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }, {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }, {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }, {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }, {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }, {
    name: "Mario",
    symbol: "SMWC",
    copies: 10,
    image: "https://abv.bg"
  }];

  const [showModal,setShowModal] = useState (false);    // hides/shows the modal ofr the corresponding nft
  const [selectedNft, setSelectedNft] = useState ();   //updated when nft is clicked 
  const [nfts, setNfts] = useState (initialNfts);

  
  useEffect ( () => {
    

  
   async function fetch ()  {
    const address = await connect();

    if (address){
 
       getNfts(address);
    }
    };
    fetch();
 
  },[])


  //shows/hides the modal
  function toggleModal (i) {
    if (i>=0){
      setSelectedNft(nfts[i]);
    }
    setShowModal (!showModal); 
    
  }

  async function getmetaDataFromIpfs(tokenUri) {
    let metadata = await axios.get(tokenUri);
    console.log(metadata.data)
    return metadata.data;
  }

// gets the nft data from IPFS

async function getNfts (address) {

  // establishing connection to the blockchain via an rpc an initialising that rpc with ethers library
  const rpc = "https://rpc-mumbai.maticvigil.com/";
  const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);

  let abi = [
    "function symbol() public view returns (string memory)",
    "function tokenCount() public view returns (uint256)",
    "function uri(uint256 tokenId) public view returns (string memory)",
    "function balanceOfBatch(address[] accounts, uint256[] ids) public view returns (uint256[] array)"
  ]
  // creating an instance of the collection's samrt contract
  let nftCollection = new ethers.Contract("0xb1bA9c7fd7c2269f2E7f86077e1c8988Ae3737F7", abi, ethersProvider)

  //pulling data from the blockchain 

  let numberOfNfts = (await nftCollection.tokenCount()).toNumber()        // because the data comes as BigNumber, it need conversion to an ordinary one
  let collectionSymbol = (await nftCollection.symbol())

  let accounts = Array(numberOfNfts).fill(address); //creates an array of length 8, filling it with 6 times the 
  let ids = Array.from({length: numberOfNfts}, (_,i)=> i+1);   //array of length 8, where each element is the next one ( 1 to 6), representing the id of every nft in our colelction 

  // passing the two arrays above to the function below, which returns the copies of each nft for the designated owner. In this case, the owner is the metamask address that is logged in, the nft ids are 1 to 8
  let copies = await nftCollection.balanceOfBatch(accounts,ids);   // the result is an array with the balance of every nft
  

  // getting all the nfts from the collection that are owned by the logged address, looping over them, and getting their data from IPFS
  let tempArray = [];
  let baseUrl = "";
 
  // instead of looping 6 times over the array , when i is 1, the loop fetches all the 8 token uris in a single run
  for (let i=1;i<=numberOfNfts;i++){
    if (i===1){
     let tokenUri = await nftCollection.uri(i);
     baseUrl = tokenUri.replace(/\d+.json/,"");
     let metadata = await (getmetaDataFromIpfs(tokenUri));
     metadata.symbol = collectionSymbol;
     metadata.copies = copies[i - 1 ]               //becasue the loop starts at 1
     tempArray.push(metadata);
    }
    else {
      let metadata = await getmetaDataFromIpfs(baseUrl + `${i}.json`);
      metadata.symbol = collectionSymbol;
      metadata.copies = copies[i - 1 ]               //becasue the loop starts at 1
      tempArray.push(metadata);
    }

  }
  setNfts(tempArray);

}

  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtitle>Characters from the most famous game of all time join forces with the sigma Peaky Blinder and two Bulgarian philantropists in an attempt to save princess Peach, while reciting "In the bleak mid-winter", breaking some air conditioners and teaching the kids not to take steroids. </Subtitle>
        <Grid>
          {
            nfts.map((nft, i) => <NFTCard nft={nft} key={i} toggleModal={()=> toggleModal (i)} />)       /* I also assign a key attribute which is equal to the index, so that React could keep track of each element in the nfts array. Important when state needs updating*/

          }
        </Grid>
      </Container>

      {
         showModal && <NFTModal nfts = {selectedNft} toggleModal = { () => toggleModal()}></NFTModal>
      }
      
    </div>
  );
}



const Title = styled.h1`
margin: 1;
text-align: center;
`

const Subtitle = styled.h4`
color: grey;
margin-top: 0;
text-align: center
`
const Container = styled.div`
width: 70%;
max-width:1200px;
margin:auto;
margin-top:100px;
`

const Grid = styled.div`
display:grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
row-gap: 40px;

@media(max-width:1200px) {
  grid-template-columns: 1fr 1fr  1fr;
}

@media(max-width:900px) {
  grid-template-columns: 1fr 1fr;
}
`
//I create 4 different fractions with the grid-tempalte columns, which means four different coulmns

export default App;
