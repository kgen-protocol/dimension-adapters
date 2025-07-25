import { FetchOptions, FetchResultVolume, SimpleAdapter } from "../../adapters/types";
import { CHAIN } from "../../helpers/chains";

const event_modified_positions = 'event PositionModified(uint indexed id,address indexed account,uint margin,int size,int tradeSize,uint lastPrice,uint fundingIndex,uint fee,int skew)';

const contracts: string[] = [
  '0x5374761526175B59f1E583246E20639909E189cE',
  '0xF9DD29D2Fd9B38Cd90E390C797F1B7E0523f43A9',
  '0x5B6BeB79E959Aac2659bEE60fE0D0885468BF886',
  '0x9615B6BfFf240c44D3E33d0cd9A11f563a2e8D8B',
  '0x509072A5aE4a87AC89Fc8D64D94aDCb44Bd4b88e',
  '0xbB16C7B3244DFA1a6BF83Fcce3EE4560837763CD',
  '0x9De146b5663b82F44E5052dEDe2aA3Fd4CBcDC99',
  '0xc203A12F298CE73E44F7d45A4f59a43DBfFe204D',
  '0x3a52b21816168dfe35bE99b7C5fc209f17a0aDb1',
  '0x96690aAe7CB7c4A9b5Be5695E94d72827DeCC33f',
  '0xa1Ace9ce6862e865937939005b1a6c5aC938A11F',
  '0x0940B0A96C5e1ba33AEE331a9f950Bb2a6F2Fb25',
  '0x59b007E9ea8F89b069c43F8f45834d30853e3699',
  '0xD5fBf7136B86021eF9d0BE5d798f948DcE9C0deA',
  '0x98cCbC721cc05E28a125943D69039B39BE6A21e9',
  '0x8B9B5f94aac2316f048025B3cBe442386E85984b',
  '0x139F94E4f0e1101c1464a321CBA815c34d58B5D9',
  '0x2B3bb4c683BFc5239B029131EEf3B1d214478d93',
  '0x87AE62c5720DAB812BDacba66cc24839440048d1',
  '0x2C5E2148bF3409659967FE3684fd999A76171235',
  '0x5ed8D0946b59d015f5A60039922b870537d43689',
  '0x27665271210aCff4Fab08AD9Bb657E91866471F0',
  '0xC18f85A6DD3Bcd0516a1CA08d3B1f0A4E191A2C4',
  '0x1dAd8808D8aC58a0df912aDC4b215ca3B93D6C49',
  '0x33d4613639603c845e61A02cd3D2A78BE7d513dc',
  '0x852210F0616aC226A486ad3387DBF990e690116A',
  '0xaa94C874b91ef16C8B56A1c5B2F34E39366bD484',
  '0x31A1659Ca00F617E86Dc765B6494Afe70a5A9c1A',
  '0xB25529266D9677E9171BEaf333a0deA506c5F99A',
  '0x074B8F19fc91d6B2eb51143E1f186Ca0DDB88042',
  '0xC8fCd6fB4D15dD7C455373297dEF375a08942eCe',
  '0x442b69937a0daf9D46439a71567fABE6Cb69FBaf',
  '0x3D3f34416f60f77A0a6cC8e32abe45D32A7497cb',
  '0x69F5F465a46f324Fb7bf3fD7c0D5c00f7165C7Ea',
  '0x0EA09D97b4084d859328ec4bF8eBCF9ecCA26F1D',
  '0xD91Db82733987513286B81e7115091d96730b62A',
  '0x09F9d7aaa6Bef9598c3b676c0E19C9786Aa566a8',
  '0x031A448F59111000b96F016c37e9c71e57845096',
  '0x4308427C463CAEAaB50FFf98a9deC569C31E4E87',
  '0xdcB8438c979fA030581314e5A5Df42bbFEd744a0',
  '0x549dbDFfbd47bD5639f9348eBE82E63e2f9F777A',
  '0x6110DF298B411a46d6edce72f5CAca9Ad826C1De',
  '0x105f7F2986A2414B4007958b836904100a53d1AD',
  '0xE698CcC3cD4f2172a848094eA6D28D89d750C16f',
  '0xf9AE92bc49A5DD96AE5840eaAE75218016811c99',
  '0xae90E9BB73b32505FB56a0F4Fd4eC8cf94BaB730',
  '0x48BeadAB5781aF9C4Fec27AC6c8E0F402F2Cc3D6',
  '0x3f957DF3AB99ff502eE09071dd353bf4352BBEfE',
  '0xB3422e49dB926f7C5F5d7DaF5F1069Abf1b7E894',
  '0x296286ae0b5c066CBcFe46cc4Ffb375bCCAFE640',
  '0xD5FcCd43205CEF11FbaF9b38dF15ADbe1B186869',
  '0x4bF3C1Af0FaA689e3A808e6Ad7a8d89d07BB9EC7',
  '0xb7059Ed9950f2D9fDc0155fC0D79e63d4441e806',
  '0x2ea06E73083f1b3314Fa090eaE4a5F70eb058F2e',
  '0xf7d9Bd13F877171f6C7f93F71bdf8e380335dc12',
  '0x6940e7C6125a177b052C662189bb27692E88E9Cb',
  '0x572F816F21F56D47e4c4fA577837bd3f58088676',
  '0xfAD0835dAD2985b25ddab17eace356237589E5C7',
  '0x77DA808032dCdd48077FA7c57afbF088713E09aD',
  '0x1681212A0Edaf314496B489AB57cB3a5aD7a833f',
  '0x71f42cA320b3e9A8e4816e26De70c9b69eAf9d24',
  '0x2fD9a39ACF071Aa61f92F3D7A98332c68d6B6602',
  '0xd4e9e0784C3cE4796f54F2EA0D337c7CFcCFD645',
  '0x2F0F0865dFDD52AdefB583Ae824dDE7D60b76a3B',
  '0xBBd74c2c8c89D45B822e08fCe400F4DDE99e600b',
  '0xaF2E4c337B038eaFA1dE23b44C163D0008e49EaD',
  '0x66fc48720f09Ac386608FB65ede53Bb220D0D5Bc',
  '0xEAf0191bCa9DD417202cEf2B18B7515ABff1E196',
  '0xdcCDa0cFBEE25B33Ff4Ccca64467E89512511bf6',
  '0x35B0ed8473e7943d31Ee1eeeAd06C8767034Ce39',
  '0x96f2842007021a4C5f06Bcc72961701D66Ff8465',
  '0xfbbBFA96Af2980aE4014d5D5A2eF14bD79B2a299',
  '0x50a40d947726ac1373DC438e7aaDEde9b237564d'
]

const fetchOpenInterest = async (options: FetchOptions) => {
  const { api } = options;
  
  const marketSummaries = await api.call({
    abi: 'function allProxiedMarketSummaries() external view returns (tuple(address market, bytes32 asset, bytes32 key, uint maxLeverage, uint price, uint marketSize, int marketSkew, uint marketDebt, int currentFundingRate, int currentFundingVelocity, tuple(uint makerFee, uint takerFee, uint makerFeeDelayedOrder, uint takerFeeDelayedOrder, uint makerFeeOffchainDelayedOrder, uint takerFeeOffchainDelayedOrder) feeRates)[] memory)',
    target: '0x340B5d664834113735730Ad4aFb3760219Ad9112'
  });

  let totalOpenInterestUSD = 0;
  
  marketSummaries.forEach((summary: any) => {
    const marketSize = BigInt(summary.marketSize);
    const marketSkew = BigInt(summary.marketSkew);
    const indexPrice = BigInt(summary.price);
    
    if (marketSize > 0n) {
      const longOI = marketSize > 0n ? (marketSize + marketSkew) / 2n : 0n;
      const shortOI = marketSize > 0n ? (marketSize - marketSkew) / 2n : 0n;

      const longUSD = Number(longOI * indexPrice) / 1e36;
      const shortUSD = Number(shortOI * indexPrice) / 1e36;
      totalOpenInterestUSD += longUSD + shortUSD;
    }
  });

  return { openInterestAtEnd: totalOpenInterestUSD };
}

const fetch: any = async (timestamp: number, _, { getLogs, api }: FetchOptions): Promise<FetchResultVolume> => {
  let dailyVolume = 0
  const logs_modify: any[] = await getLogs({ targets: contracts, eventAbi: event_modified_positions, })
  logs_modify.forEach((log: any) => {
    let value = Number(log.tradeSize) * Number(log.lastPrice) / 1e36
    if (value < 0) value *= -1
    dailyVolume += value
  })

  // Get open interest data
  const openInterestData = await fetchOpenInterest({ api, getLogs } as FetchOptions);

  return { 
    dailyVolume, 
    openInterestAtEnd: openInterestData.openInterestAtEnd
  }
}

const adapter: SimpleAdapter = {
  version: 1,
  adapter: {
    [CHAIN.OPTIMISM]: {
      fetch,
      runAtCurrTime: true,
      start: '2023-04-22',
    },
  }
};

export default adapter;
