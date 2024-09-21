const puppeteer = require("puppeteer");
const { approveAndLockTokens } = require("../src/main");
const { resyncLock } = require("../src/resync");
const { getLockData } = require("../src/getLockData");

const lockContractAddress = "0x4f0fd563b8e9ec8c3e7d595bf3639128c0a7c33a"; // Contract address

async function runTest(withdrawalAddress) {
    try {
        console.log("Step 1: Creating Token Lock...");
        const lockDepositId = await approveAndLockTokens(withdrawalAddress);

        if (!lockDepositId) {
            throw new Error("Failed to create lock and retrieve lockDepositId.");
        }

        console.log("Step 2: Resyncing Lock Info...");
        await resyncLock(lockContractAddress, lockDepositId);

        console.log("Step 3: Retrieving Lock Data from Backend...");
        await getLockData(withdrawalAddress);

        //console.log("Launching Browser with Puppeteer...");
        // await checkLockDataInBrowser(lockDepositId, withdrawalAddress);

        console.log("Test Completed Successfully!");
    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

/*
// Puppeteer function to interact with the frontend and verify the lock
async function checkLockDataInBrowser(lockDepositId, withdrawalAddress) {
     // Step 1: Launch Puppeteer in non-headless mode
     const browser = await puppeteer.launch({
        headless: false,       
        args: ['--start-maximized'] 
    });
    const page = await browser.newPage();

    try {
        // Replace with actual URL of the frontend or dashboard
        const frontendUrl = "https://team-finance-backend-dev-origdfl2wq-uc.a.run.app/locks"; 
        await page.goto(frontendUrl);

        // Example of interacting with the frontend to verify lock data
        await page.waitForSelector("#lockSearchInput");
        await page.type("#lockSearchInput", lockDepositId); // Assuming there's a search bar for lock IDs

        // Wait for results to load and display lock information
        await page.waitForSelector(".lock-info");
        const lockInfo = await page.$eval(".lock-info", el => el.innerText);

        console.log("Lock info found on the page:", lockInfo);
        if (lockInfo.includes(withdrawalAddress)) {
            console.log("Lock info matches the withdrawal address!");
        } else {
            throw new Error("Lock info does not match the withdrawal address.");
        }
    } catch (error) {
        console.error("Error during Puppeteer interaction:", error);
    } finally {
        await browser.close();
    }
}*/

(async () => {
    const withdrawalAddress = process.argv[2];
    if (!withdrawalAddress) {
        console.error("Withdrawal address is required");
        process.exit(1);
    }
    await runTest(withdrawalAddress);
})(); 