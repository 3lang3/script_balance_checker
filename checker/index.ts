import { ethers } from "ethers";
import erc1155abi from '@/const/abi/erc1155.json';
import config from "@/config";
import { getTxtContent, loop } from "./utils";

const provider = new ethers.providers.JsonRpcProvider(config.rpc);

const check1155Balance = async (address: string) => {
  const ca = '0x0872ec4426103482a50f26ffc32acefcec61b3c9';
  const contract = new ethers.Contract(ca, erc1155abi, provider);
  let results = [];
  await loop(async () => {
    results = await Promise.all([1, 2, 3, 4].map(async (id) => await contract.balanceOf(address, id)))
    results = results.map(el => el.toNumber())
    console.log(`[${address}]balance: ${results.toString()}`);
  }, { sleep: 1 });
  return results;
};

(async () => {
  const records = getTxtContent('./addr.txt');
  const rs = await Promise.all(records.map(async (record) => await check1155Balance(record)))
  const rsmap = rs.reduce((a, v) => {
    a.tier1 += v[0];
    a.tier2 += v[1];
    a.tier3 += v[2];
    a.tier4 += v[3];
    return a;
  }, { tier1: 0, tier2: 0, tier3: 0, tier4: 0 });
  console.log(`Total:\ntier1: ${rsmap.tier1}, tier2: ${rsmap.tier2}, tier3: ${rsmap.tier3}, tier4: ${rsmap.tier4}`)
})();