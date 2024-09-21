const axios = require("axios");

async function resyncLock(lockDepositId) {
    const network = "ethereum";
    const lockContractAddress = "0x4f0fd563be89ec8c3e7d595bf3639128c0a7c33a";
    const chainId = "0xaa36a7"; // Sepolia Chain ID

    const resyncEndpoint = await axios.put(`https://team-finance-backend-dev-origdfl2wq-uc.a.run.app/api/app/locks/${lockContractAddress}/${lockDepositId}?network=${network}&chainId=${chainId}`);
    

    try {
        const response = await axios.put(resyncEndpoint);
        console.log("Resync response:", response.data);
    } catch (error) {
        console.error("Error during resync:", error.response ? error.response.data : error.message);
    }
}

module.exports = { resyncLock };
