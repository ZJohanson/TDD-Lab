let { ChangeHandler } = require("../src/changehandler");

describe('Testing...', () => {

    let amountDue = 13;
    let constructor = new ChangeHandler(amountDue)

    describe("test Contructor", () => {
        expect(constructor.amountDue).toBe(amountDue)
        expect(constructor.cashTendered).toBe(0)
    })

    describe('test insertCoin function', () => {
        test("Quarter", () => {
            constructor.insertCoin('quarter')
            expect(constructor.cashTendered).toBe(25)
        })
        test("Dime", () => {
            constructor.insertCoin('dime')
            expect(constructor.cashTendered).toBe(35)
        })
        test("Nickel", () => {
            constructor.insertCoin('nickel')
            expect(constructor.cashTendered).toBe(40)
        })
        test("Penny", () => {
            constructor.insertCoin('penny')
            expect(constructor.cashTendered).toBe(41)
        })
        test("Calling function multiple times ", () => {
            constructor.insertCoin('penny')
            constructor.insertCoin('penny')

            expect(constructor.cashTendered).toBe(43)
        })
    })
    describe('test isPaymentSufficient function', () => {
        test("Cash Tendered is more than Amount Due", () => {

            if (constructor.cashTendered > constructor.amountDue) {
                expect(constructor.isPaymentSufficient()).toBe(true)
            }
        })
        test("Cash Tendered is less than Amount Due", () => {

            if (constructor.cashTendered < constructor.amountDue) {
                expect(constructor.isPaymentSufficient()).toBe(false)
            }
        })
        test("Cash Tendered is equals to Amount Due", () => {

            if (constructor.cashTendered === constructor.amountDue) {
                expect(constructor.isPaymentSufficient()).toBe(true)
            }
        })
    })

    describe("test giveChange function", () => {
        let changeLeft = constructor.cashTendered - constructor.amountDue;

        test("32 change produces", () => {
            if (changeLeft == 32) {
                expect(constructor.giveChange()).toMatchObject({
                    quarters: 1,
                    dimes: 0,
                    nickels: 1,
                    pennies: 2
                })
            }
        })
        test("10 change produces", () => {

            if (changeLeft == 10) {
                expect(constructor.giveChange()).toMatchObject({
                    quarters: 0,
                    dimes: 1,
                    nickels: 0,
                    pennies: 0
                })
            }
        })
        test("27 change produces", () => {

            if (changeLeft == 27) {
                expect(constructor.giveChange()).toMatchObject({
                    quarters: 1,
                    dimes: 0,
                    nickels: 0,
                    pennies: 2
                })
            }
        })
        test("68 change produces", () => {

            if (changeLeft == 68) {
                expect(constructor.giveChange()).toMatchObject({
                    quarters: 2,
                    dimes: 1,
                    nickels: 1,
                    pennies: 3
                })
            }
        })

    })

})