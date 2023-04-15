export interface Hasher {
  hash: (plaintext: string) => Promise<string>
  compare: (hash: string, hashToCompare: string) => Promise<boolean>
}
