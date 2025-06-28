import { randomInt } from "crypto";

// create a random string
const stringSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
export function randomJoinString(length: number) {
    let joinString: string = '';
    for (let i = 0; i < length; i++) {
        const randomValue = randomInt(0, stringSet.length);
        const charKey = stringSet[randomValue];
        joinString += charKey;
    }
    return joinString;
}

export const isUniqueConstraintViolation = (err: unknown) => {
    // eslint-disable-next-line
    return typeof err === 'object' && err != null && 'code' in err && (err as any).code === '23505';
}
