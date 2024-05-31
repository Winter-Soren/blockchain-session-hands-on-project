// a function to filter the parsed campaigns based on the deadline

const checkDeadline = (campaigns) => {
  const today = new Date().getTime();
  return campaigns.filter((campaign) => campaign.deadline > today);
};

export default checkDeadline;
