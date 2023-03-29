export type Block = string
export type Blocks = Block[]

export enum CardType {
    NewID = "new_id",
    NewIDBefore2018 = "new_id_before_2018",
    OldID = "old_id",
    Passport = "passport"
}

export interface CardGeneratorInput {
    type: CardType
    dob: string
    expiration: string
    manipulate: boolean
}

export function describe(type: CardType): string {
    switch (type) {
        case CardType.NewID:
            return "German ID Card"
        case CardType.NewIDBefore2018:
            return "German ID Card (before Aug. 2021)"
        case CardType.OldID:
            return "Old German ID Card"
        case CardType.Passport:
            return "EU Passport"
    }
}

export function createIdCard(inputs: CardGeneratorInput) {
    const {type, dob, expiration, manipulate} = inputs

    switch (type) {
        case CardType.NewID:
            return createNewId(dob, expiration, manipulate)
        case CardType.NewIDBefore2018:
            return createNewIdBefore2018(dob, expiration, manipulate)
        case CardType.OldID:
            return createOldId(dob, expiration, manipulate)
        case CardType.Passport:
            return createPassport(dob, expiration, manipulate)
    }
}

function createNewId(dob: string, expiration: string, manipulation: boolean): Blocks {
    const cardNumberBlock = "L01X00T471"
    const cardVersionBlock = "2108"

    let dobBlock = transformDate(dob)
    dobBlock += calculateChecksum(dobBlock)

    let expBlock = transformDate(expiration)
    expBlock += calculateChecksum(expBlock)

    const checksum = calculateChecksum(cardNumberBlock + dobBlock + expBlock + cardVersionBlock, manipulation)

    return [
        cardNumberBlock,
        dobBlock,
        expBlock + "D",
        cardVersionBlock,
        checksum,
    ]
}

function createNewIdBefore2018(dob: string, expiration: string, manipulation: boolean): Blocks {
    const cardNumberBlock = "T220001293"

    let dobBlock = transformDate(dob)
    dobBlock += calculateChecksum(dobBlock)

    let expBlock = transformDate(expiration)
    expBlock += calculateChecksum(expBlock)

    const checksum = calculateChecksum(cardNumberBlock + dobBlock + expBlock, manipulation)

    return [
        cardNumberBlock,
        dobBlock,
        expBlock + "D",
        checksum,
    ]
}

function createOldId(dob: string, expiration: string, manipulation: boolean): Blocks {
    const cardNumberBlock = "1220001297"

    let dobBlock = transformDate(dob)
    dobBlock += calculateChecksum(dobBlock)

    let expBlock = transformDate(expiration)
    expBlock += calculateChecksum(expBlock)

    const checksum = calculateChecksum(cardNumberBlock + dobBlock + expBlock, manipulation)

    return [
        cardNumberBlock + "D",
        dobBlock,
        expBlock,
        checksum,
    ]
}

function createPassport(dob: string, expiration: string, manipulation: boolean): Blocks {
    const cardNumberBlock = "C01X00T478"

    let dobBlock = transformDate(dob)
    dobBlock += calculateChecksum(dobBlock)

    let expBlock = transformDate(expiration)
    expBlock += calculateChecksum(expBlock)

    const checksum = calculateChecksum(cardNumberBlock + dobBlock + expBlock, manipulation)

    return [
        `${cardNumberBlock}D<<${dobBlock}F${expBlock}<<<<<<<<<<<<<<<${checksum}`
    ]
}

function transformDate(input: Block): Block {
    function shorten(date: any): string {
        return date.toString().slice(-2).padStart(2, '0')
    }

    const date = new Date(Date.parse(input))

    const year = shorten(date.getFullYear())
    const month = shorten(date.getMonth() + 1)
    const day = shorten(date.getDate())

    return `${year}${month}${day}`
}

function calculateChecksum(block: Block, manipulate: boolean = false): Block {
    const weights = initWeightGenerator()
    let sum = 0

    for (const c of block) {
        const n = transformToNumber(c)
        const w = weights.next().value
        sum += (n * w) % 10
    }

    if (manipulate) {
        // manipulate checksum by being constantly one off
        sum += 1
    }
    sum %= 10

    return sum.toString()
}

function* initWeightGenerator(): Generator<number, number, number> {
    const values = [7, 3, 1]
    let index = 2;

    while (true) {
        index += 1
        index %= 3

        yield values[index]
    }
}

function transformToNumber(c: string): number {
    if (c.length !== 1) {
        throw Error("expected single letter input")
    }

    if ('0' <= c && c <= '9') {
        return c.charCodeAt(0) - '0'.charCodeAt(0)
    }

    if ('A' <= c && c <= 'Z') {
        return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10
    }

    throw Error("encountered invalid character")
}
