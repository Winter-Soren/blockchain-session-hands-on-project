Certainly! Here's the further revised version of your instructions:

# Blockchain Hands-On Project

## Table of Contents

1. Setting up the environment
2. Running the project

### Setting up the environment

1. Download Node.js LTS version 21.

2. Clone the Git repository:
    ```bash
    git clone https://github.com/Winter-Soren/blockchain-session-hands-on-project.git
    ```
3. Navigate into the cloned repository:
    ```bash
    cd blockchain-session-hands-on-project
    ```
4. Navigate into the `client` directory:
    ```bash
    cd client
    ```
5. Install the dependencies for the `client` directory:
    ```bash
    yarn install
    ```
6. After installing the dependencies for `client`, navigate into the `web3` directory:
    ```bash
    cd ../web3
    ```
7. Install the dependencies for the `web3` directory:
    ```bash
    yarn install
    ```

### Running the project

1. Navigate back into the `client` directory and start the project:
    ```bash
    cd ../client
    yarn start
    ```
2. To deploy the smart contract to your specific chain, add the chain details in the `hardhat.config.js` file located in the `web3` directory. Under the `networks` object, add your network as follows:

    ```js
    <network-name>: {
        url: <network-rpc-url>,
        chainId: <chain-id-of-the-network>,
        accounts: [<your-wallet-private-key>]
    },
    ```
3. Run the deployment command:
    ```bash
    cd ../web3
    yarn run deploy
    ```
4. Follow the link generated in the CLI to the Thirdweb dashboard to deploy the smart contract.