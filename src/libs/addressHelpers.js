import addresses from '../config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getPresaleNenAddress = () => {
  return addresses.presale[chainId]
}

export const getPresaleNenVaultAddress = () => {
  return addresses.presaleVault[chainId]
}

export const getBUSDAddress = () => {
  return addresses.busd[chainId]
}

export const getNenTokenAddress = () => {
  return addresses.nenToken[chainId]
}