import { ethers } from 'ethers';

const parseCampaigns = (campaigns) => {
  return campaigns.map((campaign, i) => ({
    owner: campaign.owner,
    title: campaign.title,
    description: campaign.description,
    target: ethers.utils.formatEther(campaign.target.toString()),
    deadline: campaign.deadline.toNumber(),
    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
    image: campaign.image,
    pId: i
  }));
};

export default parseCampaigns;
