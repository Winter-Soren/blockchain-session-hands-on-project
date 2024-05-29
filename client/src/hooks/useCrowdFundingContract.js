import { useContract } from '@thirdweb-dev/react';
import { crowdFundingContractAddress } from 'contants';

const useCrowdFundingContract = () => {
  const contractAddress = crowdFundingContractAddress;
  const { contract, isLoading, error } = useContract(contractAddress);

  return { contract, isLoading, error };
};

export default useCrowdFundingContract;
