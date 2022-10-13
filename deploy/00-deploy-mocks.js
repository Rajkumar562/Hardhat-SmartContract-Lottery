const { developmentChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") // It takes 0.25 LINK to ask for a random number
const GAS_PRICE_LINK = 1e9 // 10^9 ; link per gas
// calculated value based on the price of the chain
// Chainlink nodes pay gas fees to give us randomness and do external execution
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local Network Detected! Deploying Mocks....")
        // deploy a mock vrfCoordinator
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!!!!!!!!!")
        log("________________________________________________________________")
    }
}

module.exports.tags = ["all", "mocks"]
