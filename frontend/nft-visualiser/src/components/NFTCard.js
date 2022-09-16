import styled from 'styled-components';
const NFTCard = (props) =>{
    let nft = props.nft
   
    return (
     
     <NftCard style = {{ margin:"15px"}}>
      <NftPhoto style ={{backgroundImage:`url(${nft && nft.image})`}}/> 
      <div style = {{margin: "5px"}}>
        <NftCollectiontext>{nft && nft.symbol}</NftCollectiontext>
        <NftName>{nft && nft.name}</NftName>
        <NftName style = {{float: "right" }}> {`x${nft && nft.copies}`} </NftName>
      </div>
      </NftCard>
      )
      
     
      /*i use a ternary opeerator to check  if the nft  has been loaded . otherwise keep it empty*/
   
   
    
    /*inline style is required because this is how I set the image . i use a ternary opeerator to check  the nft has been loaded . otherwise keep it empty*/
   }
   const NftCollectiontext = styled.div`
   font-size: 12px;
   color: grey;
   `
   const NftName = styled.div`
   font-size: 12px;
   font-weight: bold;
   display: inline;
   color: black;
   `
   
   
   
   
   const NftPhoto = styled.div`
   display: block;
   width: 200px;
   height: 200px;
   background-position: center center;
   background-size: cover;
   border-radius: 10px;
   margin: auto;
   `
   // a div by the name of NftCard that I created using styled-components
   const NftCard = styled.div`    
   width: 200px;
   height: 250px;
   margin: auto;
   border-radius: 10px;
   padding: 0px;
   cursor:  pointer;
   box-shadow: 8px 8px 16px #d9d9d9,
               -8px -8px 16px #ffffff;
   ` ; 
   export {NFTCard ,NftPhoto};