# DesiNFT - Create & Sell Your Own NFT!

<p align="center">
  <img src="https://github.com/user-attachments/assets/9a562094-ab82-4ed3-a1b1-2b1556d44e51" height="300">
</p>

### Tech Stack

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"> <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/Solidity-e6e6e6?style=for-the-badge&logo=solidity&logoColor=black"> <img src="https://img.shields.io/badge/chai-A30701?style=for-the-badge&logo=chai&logoColor=white"> <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Screenshots

<table align="center">
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/ba1a71f1-121a-46d5-8104-87c4741e7a56">
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/04000949-232b-48f2-bb6c-4abcef498ae6">
    </td>
  </tr>
</table>

### Installing

First, we need to clone the repository and change the working directory. Then, we must set up environment variables for the project. Make sure to add `.env` to `.gitignore`.

```bash
git clone https://github.com/ayush-that/HackOn-Blocks-2024.git
cd HackOn-Blocks-2024
```

Use the node version manager [(nvm)](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/) and set up the project to use Node v16 for seamless installation. Now install the dependencies.

```node
nvm install 16
nvm use 16
npm i
```

In the `.env`, add the following environment variables. Get the `PRIVATE_KEY` from your MetaMask account. For Polygon zkEVM (ETH):

```env
PRIVATE_KEY="METAMASK_PRIVATE_KEY"
NEXT_PUBLIC_CONTRACT_ADDRESS="CONTRACT_ADDRESS"
URL=https://rpc.cardona.zkevm-rpc.com
NEXT_PUBLIC_RPC_URL=https://rpc.cardona.zkevm-rpc.com
```

To get the value of `NEXT_PUBLIC_CONTRACT_ADDRESS`, In the root directory of the project run the following commands. This will compile and deploy the smart contract.

```node
npx hardhat compile
npx hardhat run scripts/deploy.js --network polygonZkEvmTestnet
```

Now, run `npm run dev` or `yarn dev` to start the live deployment server. You can use Vercel to deploy it too. See the [Live](https://desinft.vercel.app/) site here.
