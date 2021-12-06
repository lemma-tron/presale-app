export const calculateRate = (busdRaised) => {
  if (busdRaised <= 25000) {
    // Tier 1: rate = 40
    return 40;
  } else if (busdRaised > 25000 && busdRaised <= 50000) {
    // Tier 2: linear
    return 1 / (busdRaised / 1000000);
  } else if (busdRaised > 50000) {
    // Tier 3: rate = 20
    return 20;
  } else {
    // default rate
    return 40;
  }
};
