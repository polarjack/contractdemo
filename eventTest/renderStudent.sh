solc --abi EventTest.sol > temp.json
sed '4q;d' temp.json > EventTest.json
solc --bin EventTest.sol > temp.bin
sed '4q;d' temp.bin > EventTest.bin
