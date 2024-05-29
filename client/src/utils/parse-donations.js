import { ethers } from 'ethers';

const parseDonations = (donations) => {
  const numberOfDonations = donations[0].length;

  const parsedDonations = [];

  for (let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString())
    });
  }

  return parsedDonations;
};

export default parseDonations;
