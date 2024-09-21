const axios = require("axios");

async function getLockData() {
    const network = "ethereum";
    const walletAddress = "0x61Bca83A8410bBEbD9e4A2e541837FEb91db7c8B";
    const chainId = "0xaa36a7"; // Sepolia Chain ID

    const retrieveEndpoint = await axios.get(`https://team-finance-backend-dev-origdfl2wq-uc.a.run.app/api/app/mylocks/${walletAddress}?network=${network}&chainId=${chainId}`);
    try {
        const response = await axios.get(retrieveEndpoint);
        console.log("Lock data:", response.data);
    } catch (error) {
        console.error("Error retrieving lock data:", error.response ? error.response.data : error.message);
    }
}

module.exports = { getLockData };