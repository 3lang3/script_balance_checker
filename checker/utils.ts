import { readFileSync } from "node:fs";
import { setTimeout as _sleep } from 'node:timers/promises';

export function getTxtContent(path: string) {
  const str = readFileSync(path, 'utf-8');
  return str.split(/[(\r\n)\r\n]+/).filter(el => el);
}


export function sleep(n: number) {
  return _sleep(n * 1000)
}

export function loop(task, opts?: { sleep?: number; nolog?: boolean }) {
  return new Promise(async (resolve) => {
    while (true) {
      try {
        await task();
        resolve(true)
        break;
      } catch (error) {
        if (!opts?.nolog) console.log(`🌀[loop] ${error?.reason || error?.message}`)
        if (opts?.sleep) await sleep(opts.sleep);
      }
    }
  })
}

