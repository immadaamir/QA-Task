/*const { approveAndLockTokens } = require("../src/main");
const { resyncLock } = require("../src/resync");
const { getLockData } = require("../src/getLockData");

test("Token Lock Creation, Resync, and Data Retrieval", async () => {

  const withdrawalAddress = "0x61Bca83A8410bBEbD9e4A2e541837FEb91db7c8B";

  const lockDepositId = await approveAndLockTokens(withdrawalAddress);
  expect(lockDepositId).toBeTruthy();

  await resyncLock("0x4f0fd563b8e9ec8c3e7d595bf3639128c0a7c33a", lockDepositId);
  const lockData = await getLockData(withdrawalAddress);
  expect(lockData).toBeDefined();
});*/