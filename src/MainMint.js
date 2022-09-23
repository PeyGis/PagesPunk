import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { Box, Button, Flex, Link, Spacer, Input, Text } from "@chakra-ui/react";

import roboPunkNFT from "./RoboPunkNFT.json";
const roboPunkNFTAddress = "0x225Fd4178230b543fc5474e16649Ece567130BaE";

const MainMint = ({ accounts, setAccounts }) => {
	const [mintAmount, setMintAmount] = useState(1);
	const isConnected = Boolean(accounts[0]);

	async function handleMint() {
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				roboPunkNFTAddress,
				roboPunkNFT.abi,
				signer
			);

			try {
				const response = await contract.mint(BigNumber.from(mintAmount), {
					value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
				});
				console.log("response from MainMint", response);
			} catch (error) {
				console.log("error occured in MainMint", error);
			}
		}
	}

	const handleDecrement = () => {
		if (mintAmount <= 1) return;
		setMintAmount(mintAmount - 1);
	};

	const handleIncrement = () => {
		if (mintAmount >= 3) return;
		setMintAmount(mintAmount + 1);
	};

	return (
		<Flex justify="center" align="center" height="100vh" paddingBottom="150px">
			<Box width="500px">
				<div>
					<Text fontSize="48px">PagesPunkNFT</Text>
					<Text fontFamily="VT323" fontSize="30px">
						It's the year 3069 and the ancient aliens have invaded planet Mars. Can the PagesPunkNFT save mankind from mass destruction?
					</Text>
				</div>

				{isConnected ? (
					<div>
						<Flex justify="center" align="center">
							<Button
								backgroundColor="#D6517D"
								color="white"
								borderRadius="5px"
								padding="15px"
								cursor="pointer"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								fontFamily="inherit"
								margin="0 15px"
								onClick={handleDecrement}
							>
								-
							</Button>

							<Input
								readOnly
								fontFamily="inherit"
								marginTop="10px"
								width="100px"
								height="40px"
								textAlign="center"
								paddingLeft="20px"
								type="number"
								value={mintAmount}
							/>

							<Button
								backgroundColor="#D6517D"
								color="white"
								borderRadius="5px"
								padding="15px"
								cursor="pointer"
								boxShadow="0px 2px 2px 1px #0F0F0F"
								fontFamily="inherit"
								margin="0 15px"
								onClick={handleIncrement}
							>
								+
							</Button>
						</Flex>
						<Button
							backgroundColor="#D6517D"
							color="white"
							borderRadius="5px"
							padding="15px"
							cursor="pointer"
							boxShadow="0px 2px 2px 1px #0F0F0F"
							fontFamily="inherit"
							margin="10px 15px"
							onClick={handleMint}
						>
							Mint Now
						</Button>
					</div>
				) : (
					<Text fontFamily="VT323" fontSize="30px" marginTop="70px" color="#D6517D">You must be connected to mint</Text>
				)}
			</Box>
		</Flex>
	);
};

export default MainMint;
