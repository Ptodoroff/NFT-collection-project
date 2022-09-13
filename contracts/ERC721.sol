pragma solidity 0.8.9;

contract ERC721 {
    mapping (uint => address)  _owners;
    mapping (address => uint) _balances;
    mapping (address=>mapping(address=>bool)) operatorApprovals;         //stores the addresses that an nft owner has approved to be operators and act on his behalf ( in most cases this are DEXes or marketplaces)
    mapping (uint =>address) tokenApprovals;


    event approvalForAll (address indexed owner, address indexed operator, bool indexed status);
    event Approval (address indexed owner, address indexed to, uint indexed tokenId);
    event Transfer (address indexed from, address indexed to, uint  indexed tokenId);
    function balanceOf (address owner) public view returns (uint){
        require ( owner!= address(0), "input addy cannot eb the zero address");
        return _balances[owner];
    }

    function ownerOf (uint id) public  view returns (address owner) {
    require ( owner!= address(0), "input addy cannot eb the zero address");
        owner = _owners[id];
     return owner;
    }


    //enables or disables an operator to manage all of the msg.sender's tokens
    function seatApprovalForAll(address operator, bool approved) external {
        operatorApprovals[msg.sender][operator] = approved;
        emit approvalForAll(msg.sender,operator,approved);

    }
 // checks if and address is an operator for another address 
    function isApprovedForAll (address owner, address operator)public  view returns(bool) {
        return operatorApprovals[owner][operator];
 
    }

    // updates/changes an approved address for a certain NFT 
    function approve (address to, uint tokenId) public {
      address owner = ownerOf(tokenId);
      require (msg.sender == owner || isApprovedForAll(owner,msg.sender), "You are not authorised to approve spending for this token");
      tokenApprovals[tokenId]=to;
      emit Approval (owner, to, tokenId);
    }

    //gets the approved address for a certain NFT
    function getApproved(uint tokenId) public view returns (address ){
        require(_owners[tokenId] != address(0), " Token does not exist ");
        return tokenApprovals[tokenId];
    }

     // transfers ownership of the designatede nft

     function transferFrom (address from, address to, uint tokenId) public {
        address owner = ownerOf(tokenId);
        require (msg.sender == owner || isApprovedForAll(owner,msg.sender) || getApproved(tokenId)==msg.sender, "You are not authorised to  transfer the selected NFT");
        require(from ==owner, "From address is not the owner");
        require(to != address(0), " Receiver cannot be the 0 address" );
        require(_owners[tokenId] != address(0), " NFT with such ID does not exist " );        //this cheks if the tokenId is valid
        approve(address(0), tokenId);                                                       // before transfer to the new owner it is crucial that all the  operators  that the previous owner has approved are revoked
        _balances[from]-= 1;
        _balances[to]+= 1;
        _owners[tokenId]=to;

        emit Transfer (owner, to, tokenId);
     
     }


     //checks if onerc721Received is impleneted WHEN sending to smart contracts. aka checks if a smart contract that is meant to receive the NFT is eligible for receiving it. APPLICABLE ONLY WHEN THE RECEIVER IS A SMART CONTRACT
     // includes a bytes  argument that is being passed to the  onerc721Received function of the receiving smart contract
     function safeTransferFrom (address from, address to, uint tokenId, bytes memory _data) public  {
        require(_checkOnErc721Received(), "Receiver not implemented");
        transferFrom( from, to ,tokenId);

     }

    //executes the safeTransferFrom function without passing the bytes variable 
     function safeTransferFrom (address from, address to, uint tokenId) public   {
        safeTransferFrom(from, to, tokenId, "");
     }

     
     function _checkOnErc721Received () private pure returns (bool){
        return true;
     }


    //erc165 - queries if another contract supports another interface
    //Opensea uses this function to see if this is a compatible NFT contract. It invokes it on our nft contract to see if it is indeed erc721 compatible 
    function supportsInterface(bytes4 interfaceId) public pure virtual returns(bool ){
      return interfaceId == 0x80ac58cd;                                      //the interface of the ERC721 contract. This function is created for the ease of the NFT marketplaces. It also tells the marketplace what functions we have in our contract 

    }


}


