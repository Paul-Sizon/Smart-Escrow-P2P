//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract YourContract {
	address public buyer;
	address public seller;
	address public arbiter;
	uint256 public amount;
	bool public isFunded;
	bool public isReleased;
	bool public isDisputed;
	bool public isCancellationRequested;
	address public cancellationRequester;
	string public trackingNumber;
	address public platformWallet;
	uint256 public platformFeePercent;

	event FundsReleased(address seller, uint256 amount);
	event FundsRefunded(address buyer, uint256 amount);
	event DisputeOpened();
	event DisputeResolved();
	event CancellationRequested(address requester);
	event EscrowCancelled();

	constructor(
		address _buyer,
		address _seller,
		address _arbiter,
		address _platformWallet,
		uint256 _platformFeePercent,
		string memory _trackingNumber
	) payable {
		require(msg.value > 0, "Amount must be greater than zero");

		buyer = _buyer;
		seller = _seller;
		arbiter = _arbiter;
		platformWallet = _platformWallet;
		platformFeePercent = _platformFeePercent;
		amount = msg.value;
		isFunded = true;
		trackingNumber = _trackingNumber;
	}

	modifier onlyBuyerOrArbiter() {
		require(
			msg.sender == buyer || msg.sender == arbiter,
			"Only buyer or arbiter can call this function"
		);
		_;
	}

	modifier onlyBuyerOrSeller() {
		require(
			msg.sender == buyer || msg.sender == seller,
			"Only buyer or seller can call this function"
		);
		_;
	}

	modifier onlyArbiter() {
		require(msg.sender == arbiter, "Only arbiter can call this function");
		_;
	}

	modifier whenNotFunded() {
		require(!isFunded, "Escrow is already funded");
		_;
	}

	modifier whenFunded() {
		require(isFunded, "Escrow is not funded");
		_;
	}

	modifier whenNotReleased() {
		require(!isReleased, "Funds already released");
		_;
	}

	modifier whenDisputed() {
		require(isDisputed, "Escrow is not disputed");
		_;
	}

	modifier whenNotDisputed() {
		require(!isDisputed, "Escrow is disputed");
		_;
	}

	function releaseFunds()
		public
		whenFunded
		whenNotReleased
		onlyBuyerOrArbiter
		whenNotDisputed
	{
		isReleased = true;
		uint256 platformFee = (amount * platformFeePercent) / 100;
		uint256 amountToSeller = amount - platformFee;

		payable(platformWallet).transfer(platformFee);
		payable(seller).transfer(amountToSeller);

		emit FundsReleased(seller, amountToSeller);
	}

	function refundFunds()
		public
		whenFunded
		whenNotReleased
		onlyArbiter
		whenNotDisputed
	{
		isReleased = true;
		payable(buyer).transfer(amount);

		emit FundsRefunded(buyer, amount);
	}

	function openDispute() public onlyBuyerOrSeller whenNotDisputed {
		isDisputed = true;
		emit DisputeOpened();
	}

	function resolveDispute(
		bool releaseToSeller
	) public onlyArbiter whenDisputed {
		isDisputed = false;
		releaseToSeller ? releaseFunds() : refundFunds();
		emit DisputeResolved();
	}

	function cancelEscrow() public onlyBuyerOrSeller {
		require(!isCancellationRequested, "Cancellation already requested");

		isCancellationRequested = true;
		cancellationRequester = msg.sender;

		emit CancellationRequested(msg.sender);
	}

	function confirmCancellation() public onlyBuyerOrSeller {
		require(isCancellationRequested, "Cancellation not requested");
		require(
			msg.sender != cancellationRequester,
			"Cancellation must be confirmed by the other party"
		);

		isReleased = true;
		isCancellationRequested = false;
		payable(buyer).transfer(amount);

		emit EscrowCancelled();
		emit FundsRefunded(buyer, amount);
	}

	receive() external payable whenNotFunded {
		require(msg.value > 0, "Amount must be greater than zero");
		amount = msg.value;
		isFunded = true;
	}
}
