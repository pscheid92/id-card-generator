import {CardGeneratorInput, CardType, createIdCard} from "./card-generator";

describe('card generator module', () => {
    const dob = "1980-01-01"
    const expiration = "2030-12-31"

    const table = [
        {
            name: 'new id',
            type: CardType.NewID,
            manipulate: false,
            expected: ["L01X00T471", "8001014", "3012316D", "2108", "5"]
        },
        {
            name: 'new id',
            type: CardType.NewID,
            manipulate: true,
            expected: ["L01X00T471", "8001014", "3012316D", "2108", "6"]
        },
        {
            name: 'new id before 2018',
            type: CardType.NewIDBefore2018,
            manipulate: false,
            expected: ["T220001293", "8001014", "3012316D", "8"]
        },
        {
            name: 'new id before 2018',
            type: CardType.NewIDBefore2018,
            manipulate: true,
            expected: ["T220001293", "8001014", "3012316D", "9"]
        },
        {
            name: 'old id card',
            type: CardType.OldID,
            manipulate: false,
            expected: ["1220001297D", "8001014", "3012316", "0"]
        },
        {
            name: 'old id card',
            type: CardType.OldID,
            manipulate: true,
            expected: ["1220001297D", "8001014", "3012316", "1"]
        },
        {
            name: 'passport',
            type: CardType.Passport,
            manipulate: false,
            expected: ["C01X00T478D<<8001014F3012316<<<<<<<<<<<<<<<8"]
        },
        {
            name: 'passport',
            type: CardType.Passport,
            manipulate: true,
            expected: ["C01X00T478D<<8001014F3012316<<<<<<<<<<<<<<<9"]
        },
    ]

    it.each(table)('$name (manipulated=$manipulate)', ({type, manipulate, expected}) => {
        const input: CardGeneratorInput = {type: type, dob: dob, expiration: expiration, manipulate: manipulate}
        const result = createIdCard(input)
        expect(result).toEqual(expected)
    })
})
