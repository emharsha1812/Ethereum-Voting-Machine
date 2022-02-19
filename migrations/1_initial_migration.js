const Migrations = artifacts.require("Migrations");
const Election = artifacts.require("./Election.sol");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(Election);
};
