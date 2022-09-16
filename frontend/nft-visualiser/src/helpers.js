
//gets the currently connected account with metamask 
export async function connect () {
    try {
    const accounts = await window.ethereum.request ({method: 'eth_requestAccounts'})
    const account = handleAccountsChanged(accounts);                            //if there are more than 1 account in the metamask extension, this function will get the first account in the array 
    return account;
}
    catch (error){
        if(error === 4001){                                                       // code 4001 means MM is not connected 
            alert ("Please conenct to Metamask")
        }

        else {
            console.error(error)
        }

    }
}


//dealing with when accounts change
export function handleAccountsChanged(accounts){
    if (accounts.length ===0) {
        console.log("Please connect to Metamask");
    }
    else {
        window.ethereum.on("accountsChanged", () => {window.location.reload()})                           // adds and event lsitener to the window.etehreum. if account is changed, the page is reloaded 
        return accounts[0];
    }
}