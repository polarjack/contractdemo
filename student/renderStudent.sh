solc --abi Student.sol > temp.json
sed '4q;d' temp.json > Student.json
solc --bin Student.sol > temp.bin
sed '4q;d' temp.bin > Student.bin
