const CoffeeSupplyChain = artifacts.require("CoffeeSupplyChain");

contract("CoffeeSupplyChain", (accounts) => {
  it("should add coffee", async () => {
    const instance = await CoffeeSupplyChain.deployed();
    await instance.addCoffee("Ethiopia", "Arabica Coffee");
    const coffee = await instance.coffees(1);
    assert.equal(coffee.origin, "Ethiopia");
    assert.equal(coffee.description, "Arabica Coffee");
  });

  it("should update coffee state", async () => {
    const instance = await CoffeeSupplyChain.deployed();
    await instance.updateState(1, 1); // 1 is the enum value for Processed
    const coffee = await instance.coffees(1);
    assert.equal(coffee.state, 1);
  });
});
