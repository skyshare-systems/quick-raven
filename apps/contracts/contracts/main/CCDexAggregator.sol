// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interface/Uniswap.sol";
import "@routerprotocol/evm-gateway-contracts/contracts/IGateway.sol";

/// @title CCDexAggregator
/// @author Skyshare Labs
/// @notice A cross-chain ERC-20 smart contract to used to swap tokens
/// on different chains using interoperable messaging.
contract CCDexAggregator is OwnableUpgradeable {
    // swap parameters struct where we specify which tokens should be swapped
    // on the other
    struct SwapParams {
        address dexRouter;
        address destDexRouter;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOutMin;
        address to;
    }
    // address of the Gateway contract
    address public gatewayContractAddress;

    // chain type + chain id => address of our contract in bytes
    mapping(string => string) public contractList;

    // address of Dex router => is enabled
    mapping(address => bool) public dexRouters;

    /**
     * Initializer
     */

    function initialize() external initializer {
        __Ownable_init();
        __Context_init();
    }

    /**
     * Modifiers
     */
    modifier bridgeConnect(
        string memory _destChainId,
        bytes memory _requestMetadata,
        SwapParams memory _swapParams
    ) {
        _;
        IGateway gateway = IGateway(gatewayContractAddress);

        bytes memory packet = abi.encode(_swapParams);
        bytes memory requestPacket = abi.encode(
            contractList[_destChainId],
            packet
        );

        gateway.iSend{value: msg.value}(
            1,
            0,
            string(""),
            _destChainId,
            _requestMetadata,
            requestPacket
        );
    }

    /**
     * Main Functions
     */

    function swapToQr(
        string memory _destChainId,
        bytes memory _requestMetadata,
        SwapParams memory _swapParams
    )
        external
        payable
        bridgeConnect(_destChainId, _requestMetadata, _swapParams)
    {
        IERC20(_swapParams.tokenIn).transferFrom(
            msg.sender,
            address(this),
            _swapParams.amountIn
        );
        IERC20(_swapParams.tokenIn).approve(
            _swapParams.dexRouter,
            _swapParams.amountIn
        );

        address[] memory path = new address[](2);
        path[0] = _swapParams.tokenIn;
        path[1] = _swapParams.tokenOut;

        IUniswapV2Router(_swapParams.dexRouter).swapExactTokensForTokens(
            _swapParams.amountIn,
            _swapParams.amountOutMin,
            path,
            address(this),
            block.timestamp
        );
    }

    function swapToUser(SwapParams memory _swapParams) public {
        // IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        // IERC20(_tokenIn).approve(_dexRouter, _amountIn);

        address[] memory path = new address[](2);
        path[0] = _swapParams.tokenIn;
        path[1] = _swapParams.tokenOut;

        IUniswapV2Router(_swapParams.destDexRouter).swapExactTokensForTokens(
            _swapParams.amountIn,
            _swapParams.amountOutMin,
            path,
            _swapParams.to,
            block.timestamp
        );
    }

    function directToUser(
        address _user,
        address _token,
        uint256 _amount
    ) internal {
        require(
            msg.sender == gatewayContractAddress,
            "QuickRaven :: Not gateway"
        );
        ERC20 token = ERC20(_token);
        token.transfer(_user, _amount);
    }

    /// @notice function used to send cross chain messages
    /// @param _destChainId the chain id of the destination chain
    /// @param _swapParams swap parameters struct
    /// @param requestMetadata abi-encoded metadata according to source and destination chains
    function iSend(
        string memory _destChainId,
        SwapParams memory _swapParams,
        bytes memory requestMetadata
    ) public payable {
        require(
            keccak256(bytes(contractList[_destChainId])) != keccak256(""),
            "contract not found"
        );

        bytes memory packet = abi.encode(_swapParams);
        bytes memory requestPacket = abi.encode(
            contractList[_destChainId],
            packet
        );

        IGateway gatewayContract = IGateway(gatewayContractAddress);
        gatewayContract.iSend{value: msg.value}(
            1,
            0,
            string(""),
            _destChainId,
            requestMetadata,
            requestPacket
        );
    }

    /// @notice function used to receive cross chain messages
    /// @param requestSender address of the contract on source chain that initiated the request.
    /// @param packet the payload sent by the source chain contract when the request was created.
    /// @param srcChainId chain ID of the source chain in string.
    function iReceive(
        string calldata requestSender,
        bytes calldata packet,
        string calldata srcChainId
    ) external returns (bytes memory) {
        require(msg.sender == address(gatewayContractAddress), "only gateway");
        require(
            keccak256(bytes(contractList[srcChainId])) ==
                keccak256(bytes(requestSender))
        );

        // decoding our payload
        SwapParams memory swapParams = abi.decode(packet, (SwapParams));

        directToUser(
            swapParams.to,
            swapParams.tokenOut,
            swapParams.amountOutMin
        );

        return "";
    }

    /// @notice function used to withdraw stuck native token
    function withdrawEther() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /// @notice function used to withdraw stuck ERC20 tokens
    function withdrawToken(address _token) external onlyOwner {
        IERC20 token = IERC20(_token);

        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    /**
     * Setter Functions
     */

    function setGatewayContract(
        address _gatewayContractAddress,
        string memory _feePayerAddress
    ) external onlyOwner {
        gatewayContractAddress = _gatewayContractAddress;
        IGateway(gatewayContractAddress).setDappMetadata(_feePayerAddress);
    }

    function setContractList(
        string memory _chainId,
        string memory _contract
    ) external onlyOwner {
        contractList[_chainId] = _contract;
    }

    receive() external payable {}

    fallback() external payable {
        if (dexRouters[msg.sender]) {
            return;
        }
    }
}
