
import styled from "styled-components";
import { NFTCard } from "./components/NFTCard";

function App() {

  let nfts = [{
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
  }]
  return (
    <div className="App">
      <Container>
        <Title>Super Mario World Collection</Title>
        <Subtitle>Characters from the most famous game of all time join forces with the sigma Peaky Blinder and two Bulgarian philantropists in an attempt to save princess Peach, while reciting "In the bleak mid-winter", breaking some air conditioners and teaching the kids not to take steroids. </Subtitle>
        <Grid>
          {
            nfts.map((nft, i) => <NFTCard nft={nft} key={i} />)       /* I also assign a key attribute which is equal to the index, so that React could keep track of each element in the nfts array. Important when state needs updating*/

          }
        </Grid>
      </Container>
      <NFTModal></NFTModal>
    </div>
  );
}

/*The modal component pops up when a user clicks on an NFT*/
const NFTModal (props) => {
  return (
    <Modal>
      <ModalContent></ModalContent>
    </Modal>
  )

}

//the z-index attribute makes sure that this components stays on top of everything else
const Modal = styled.div`
position: fixed;
display:flex;
align-items:center;
z-index:100;

`
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
`
//I create 4 different fractions with the grid-tempalte columns, which means four different coulmns

export default App;
