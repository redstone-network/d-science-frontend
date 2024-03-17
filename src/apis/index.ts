import {ApiPromise, WsProvider} from '@polkadot/api';
import {Keyring} from '@polkadot/keyring';
import {web3Enable, web3FromAddress} from '@polkadot/extension-dapp';
import type {
  SubmittableResult,
} from '@polkadot/api'

const appName = import.meta.env.VITE_APP_NAME;
const nodeUrl = import.meta.env.VITE_SUBSTRATE_URL;
const wsProvider = new WsProvider(nodeUrl);
const api = await ApiPromise.create({provider: wsProvider});

export function getUser(userName: string) {
  const keyring = new Keyring({type: 'sr25519'});
  const user = keyring.addFromUri(`//${userName}`);
  return user;
}
const Bob = getUser('Bob')


export async function getChainInfo() {
  const [chain, nodeName, nodeVersion, metadata] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.state.getMetadata(),
  ]);
  return {
    metadata,
    chain,
    nodeName,
    nodeVersion,
  };
}

export async function summon(account: string, name: string) {
  try {
    await web3Enable(appName);
    const injector = await web3FromAddress(account);
    return new Promise((resolve, reject) => {
      api.tx.donateModule
        .summon(name, '300000000000000')
        .signAndSend(
          account,
          {signer: injector.signer},
          ({events = [], status}) => {
            if (status.isFinalized) {
              resolve(true);
              events.forEach(({phase, event: {data, method, section}}) => {
                console.log(
                  `${phase.toString()} : ${section}.${method} ${data.toString()}`,
                );
              });
            }
          },
        )
        .catch((error: any) => {
          reject(error);
        });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getOrgs() {
  const exposures = await api.query.donateModule.mapOrg.entries();

  const orgs = [];

  for (const [key] of exposures) {
    const id = +key.args[0];
    const t = await api.query.donateModule.mapOrg(id);
    const org = t.toHuman() as any;
    const balance = (await api.query.system.account(org.treasuryId)) as any;
    orgs.push({
      ...org,
      available: balance.data.free.toString(),
      key: id,
      id,
    });
  }

  return orgs;
}
export async function donate(
  orgId: number,
  amount: number,
  user: any = Bob,
): Promise<any> {
  await web3Enable(appName);
  const injector = await web3FromAddress(user);

  return new Promise((resolve) => {

    api.tx.donateModule
      .donate(orgId, amount)
      .signAndSend(
        user,
        {signer: injector.signer},
        ({ events = [], status }: SubmittableResult) => {
          if (status.isFinalized)
          console.log('ddd')
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}
export async function createProposal(
  orgId: number,
  paymentRequested: number,
  detail: string,
  user: any = Bob,
): Promise<any> {
  await web3Enable(appName);
  const injector = await web3FromAddress(user);

  return new Promise((resolve) => {
    api.tx.donateModule
      .submitProposal(orgId, paymentRequested, detail)
      .signAndSend(
        user,
        {signer: injector.signer},
        ({ events = [], status }: SubmittableResult) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

export async function submitVote(
  orgId: number,
  proposalId: number,
  vote_unit: number,
  user: any = Bob,
): Promise<any> {
  await web3Enable(appName);
  const injector = await web3FromAddress(user);

  return new Promise((resolve) => {
    api.tx.donateModule
      .submitVote(orgId, proposalId, vote_unit)
      .signAndSend(
        user,
        {signer: injector.signer},
        ({ events = [], status }: SubmittableResult) => {
          if (status.isFinalized)
            resolve({ events, status })

          events.forEach(
            ({
              phase,
              event: { data, method, section },
            }) => {
              console.log(
                `${phase.toString()} : ${section}.${method} ${data.toString()}`,
              )
            },
          )
        },
      )
  })
}

export async function getProposals() {
  const exposures
    = await api.query.donateModule.proposals.entries()

  const proposals = []

  for (const [key] of exposures) {
    const orgId = +key.args[0]
    const proposalId = +key.args[1]

    const t
      = await api.query.donateModule.proposals(orgId, proposalId)
    const proposal = t.toHuman() as object
    proposals.push({
      ...proposal,
      key,
      id: key,
      proposalId,
    })
  }

  return proposals
}
