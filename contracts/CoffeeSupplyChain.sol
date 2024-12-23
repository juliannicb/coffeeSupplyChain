// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CoffeeSupplyChain {
    enum State { Harvested, Processed, Packaged, Shipped, Sold }

    struct Coffee {
        uint256 id;
        address owner;
        State state;
        string origin;
        string description;
    }

    uint256 public coffeeCount = 0;
    mapping(uint256 => Coffee) public coffees;

    event StateChange(uint256 coffeeId, State state);

    function addCoffee(string memory origin, string memory description) public {
        coffeeCount++;
        coffees[coffeeCount] = Coffee(coffeeCount, msg.sender, State.Harvested, origin, description);
        emit StateChange(coffeeCount, State.Harvested);
    }

    function updateState(uint256 coffeeId, State newState) public {
        Coffee storage coffee = coffees[coffeeId];
        require(msg.sender == coffee.owner, "Only the owner can update the state");
        coffee.state = newState;
        emit StateChange(coffeeId, newState);
    }
}