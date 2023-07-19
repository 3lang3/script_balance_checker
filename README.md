# 1155 Balance Checker

暂时只支持查询Linea Nft，后面计划支持erc20/721/1155

## 运行

- 新建 `addr.txt`，一行一个地址, 
- `config.ts` 里面配置自己的rpc地址，当前是我的infura地址，免费额度用完后会截流。

```bash
npm install -g pnpm;
pnpm install;
pnpm swc checker > nft.log
```
