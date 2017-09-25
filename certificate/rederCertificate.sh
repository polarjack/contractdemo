solc --abi Certificate.sol > temp.json
sed '4q;d' temp.json > Certificate.json
solc --bin Certificate.sol > temp.bin
sed '4q;d' temp.bin > Certificate.bin
