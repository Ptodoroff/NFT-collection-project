pragma solidity 0.8.9;

contract ERC1155 {
event ApprovalForAll(address indexed _owner, address indexed _operator, bool _value);
event TransderSingle(address indexed _operator, address indexed  _from, address indexed _to, uint _id, uint _amount );
//mapping from token id to account balances . Accepts the token id and the account that we query for as arguments. The result is an uint , 
//which represents how many copies of the particular token id the account owns. 
//Copies in NFTs? Yeah, ERC1155 strandard blurs the line between fungibility and non-fungibility
mapping (uint =>mapping(address=>uint)) internal _balances;

//stores a bool for whether a particular operator has been approved to operate with all of the wallet's balances for this particular collection
mapping (address=>mapping(address=>bool)) _operatorApprovals;


//gets the balance of a wallet's tokens 
function balanceOf(address _account, uint _id) public view returns (uint){
    require (_account != address(0), "Owner (_account) cannot be the zero address!");
    return _balances[_id][_account];
}
//gets the balance for multiple NFTs for multiple wallets
function balanceOfBatch ( address[] memory _accounts, uint[] memory _ids) public view returns (uint[] memory){
    uint[] memory batchBalances = new uint[](_accounts.length);                                 // a dynamic array is created for the duration of the function execution. Ots length is the same as the length of the wallets array

for (uint i=0; i<_accounts.length; i++){
    require(_accounts.length == _ids.length, " Accounts and ids are not the same length");
    batchBalances[i] = balanceOf(_accounts[i], _ids[i]);
}
    return batchBalances;
}



//checks if an address is an operator for the owner;
function isApprovedForAll (address _owner, address _operator) public view returns (bool) {
    return _operatorApprovals[_owner][_operator];
}

function setApprovedForAll (address _operator, bool _approved) public  {
     _operatorApprovals[msg.sender][_operator] = _approved;
     emit ApprovalForAll (msg.sender,_operator,_approved);
}

function _transfer (address _from, address _to, uint _id,uint _amount) private {              //  function is marked private because it will be used by the SafetransferFrom function and safeBatchTransfer functions. It just look tidier if this logic is separated in its own function
 uint fromBalances = _balances[_id][_from];                                      // I add this variable because in the erc 1155 contract, it is allowed for an nft to have multiple copies.
 require(fromBalances>=_amount, "Attempting to transfer more than the amount owned");
_balances[_id][_from]= fromBalances - _amount;                                 //decrements the balance of the sender // the balance of the copies of the designated nft is decremented by the amount that is to be transferred
_balances[_id][_to]= fromBalances + _amount;                                   //increments the balance of the receiver;
}

function safeTransferFrom(address _from, address _to, uint _id,uint _amount )public virtual{              //the bytes memory data(which is an optional argument which i removed) is going to get parsed into the contract of the marketplace, on which I will deploy the collection. This data is then used for execution of additional functions by the marketplace's smart contract. It is OPTIONAL
require(_from == msg.sender || isApprovedForAll(_from, msg.sender), "msg.sender is not the owner or approved for transfer");
 require(_to!=address(0), "Cannot transfer to the zero address");
_transfer(_from,_to,_id,_amount);
emit TransderSingle(msg.sender,_from,_to,_id,_amount);
require (checkOnERC1155Received(),"Receiver is not implemented");
}
function checkOnERC1155Received() private pure returns (bool){
    return true;                                        // this is a dummy function , not how it really works
}
}

