const EthEhrSystem = artifacts.require("EthEhrSystem.sol");

module.exports = function(deployer) {
  deployer.deploy(EthEhrSystem);
};
