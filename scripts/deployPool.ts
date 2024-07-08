import { toNano } from '@ton/core';
import { Pool } from '../wrappers/Pool';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pool = provider.open(await Pool.fromInit());

    await pool.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    // EQDq3wZDbchkMHMFnU5OmnKxlyONdgmdOLLdJkAIRVVIuhPE
    await provider.waitForDeploy(pool.address);
}
