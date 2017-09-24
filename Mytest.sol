pragma solidity ^0.4.11;
contract Mytest {

    function Mytest(address input) {
        owner = input;
    }
    function showOwner() constant returns (address) {
        return owner;
    }
    function changeOwner(address input) {
        owner = input;
    }
    address owner;
}
