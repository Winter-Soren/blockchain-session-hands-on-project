describe("CrowdFunding Contract", function () {
    let CrowdFunding;
    let crowdFunding;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let expect;
    let ethers;

    before(async function () {
        // Dynamic imports
        const chai = await import("chai");
        expect = chai.expect;
        const hardhat = await import("hardhat");
        ethers = hardhat.ethers;
    });

    beforeEach(async function () {
        CrowdFunding = await ethers.getContractFactory("CrowdFunding");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        crowdFunding = await CrowdFunding.deploy();
        await crowdFunding.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await crowdFunding.numberOfCampaigns()).to.equal(0);
        });
    });

    describe("Campaigns", function () {
        it("Should create a campaign", async function () {
            const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            await crowdFunding.createCampaign(owner.address, "Test Campaign", "This is a test", 100, deadline, "image.jpg");

            expect(await crowdFunding.numberOfCampaigns()).to.equal(1);

            const campaign = await crowdFunding.campaigns(0);
            expect(campaign.owner).to.equal(owner.address);
            expect(campaign.title).to.equal("Test Campaign");
            expect(campaign.description).to.equal("This is a test");
            expect(campaign.target).to.equal(100);
            expect(campaign.deadline).to.equal(deadline);
            expect(campaign.amountCollected).to.equal(0);
            expect(campaign.image).to.equal("image.jpg");
        });

        it("Should not create a campaign with past deadline", async function () {
            const pastDeadline = Math.floor(Date.now() / 1000) - 3600; // 1 hour ago
            await expect(
                crowdFunding.createCampaign(owner.address, "Test Campaign", "This is a test", 100, pastDeadline, "image.jpg")
            ).to.be.revertedWith("The deadline should be a date in the future.");
        });

        it("Should allow donations and update amount collected", async function () {
            const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            await crowdFunding.createCampaign(owner.address, "Test Campaign", "This is a test", 100, deadline, "image.jpg");

            await crowdFunding.connect(addr1).donateToCampaign(0, { value: ethers.utils.parseEther("1") });

            const campaign = await crowdFunding.campaigns(0);
            expect(campaign.amountCollected).to.equal(ethers.utils.parseEther("1"));
        });

        it("Should record donators and donations correctly", async function () {
            const deadline = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            await crowdFunding.createCampaign(owner.address, "Test Campaign", "This is a test", 100, deadline, "image.jpg");

            await crowdFunding.connect(addr1).donateToCampaign(0, { value: ethers.utils.parseEther("1") });
            await crowdFunding.connect(addr2).donateToCampaign(0, { value: ethers.utils.parseEther("0.5") });

            const [donators, donations] = await crowdFunding.getDonators(0);

            expect(donators.length).to.equal(2);
            expect(donations.length).to.equal(2);
            expect(donators[0]).to.equal(addr1.address);
            expect(donators[1]).to.equal(addr2.address);
            expect(donations[0]).to.equal(ethers.utils.parseEther("1"));
            expect(donations[1]).to.equal(ethers.utils.parseEther("0.5"));
        });

        it("Should retrieve all campaigns", async function () {
            const deadline1 = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
            const deadline2 = Math.floor(Date.now() / 1000) + 7200; // 2 hours from now

            await crowdFunding.createCampaign(owner.address, "Test Campaign 1", "This is a test", 100, deadline1, "image1.jpg");
            await crowdFunding.createCampaign(owner.address, "Test Campaign 2", "This is another test", 200, deadline2, "image2.jpg");

            const campaigns = await crowdFunding.getCampaigns();

            expect(campaigns.length).to.equal(2);
            expect(campaigns[0].title).to.equal("Test Campaign 1");
            expect(campaigns[1].title).to.equal("Test Campaign 2");
        });
    });
});