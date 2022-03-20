import { tokens, EVM_REVERT } from '../src/utils/helpers';
const Token = artifacts.require('Token')

require('chai').use(require('chai-as-promised')).should()

contract('Token', ([deployer, receiver]) => {
  const name = 'Test Token'
  const symbol = 'TA'
  const decimals = '18'
  const totalSupply = tokens(1000000).toString()
  let token

  beforeEach(async () => {
    token = await Token.new()
  })

  describe('deployment', function () {
    it('tracks the name', async function () {
      const result = await token.name()
      result.should.equal(name)
    })

    it('track the symbol', async () => {
      const result = await token.symbol()
      result.should.equal(symbol)
    })

    it('track the decimals', async () => {
      const result = await token.decimals()
      result.toString().should.equal(decimals)
    })

    it('track the total supply', async () => {
      const result = await token.totalSupply()
      result.toString().should.equal(totalSupply.toString())
    })

		it('assigns the total supply to the deployer', async () => {
      const result = await token.balanceOf(deployer)
      result.toString().should.equal(totalSupply.toString())
    })
  })

	describe('sending tokens', () => {
		let amount
		let result

		describe('success', async () => {
			beforeEach(async () => {
				amount = tokens(100)
				result = await token.transfer(receiver, amount, { from: deployer })
			})

			it('transfers token balances', async () => {
				let balanceOf
				// Transfer
				balanceOf = await token.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(999900).toString())
				balanceOf = await token.balanceOf(receiver)
				balanceOf.toString().should.equal(tokens(100).toString())
			})

			it('emits a transfer event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Transfer')
				const event = log.args
				event.from.toString().should.equal(deployer, 'from is correct')
				event.to.toString().should.equal(receiver, 'to is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', async () => {
			it('rejects insuffiecient balances', async () => {
				let invalidAmount
				invalidAmount = tokens(100000000) // 100 million - greater than total supply
				await token.transfer(receiver, invalidAmount, { from: deployer }).should.be.rejectedWith(EVM_REVERT)

				// Attempt transfer tokens, when you have none
				invalidAmount = tokens(10) // receipt has no tokens
				await token.transfer(deployer, invalidAmount, { from: receiver }).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipients', async () => {
				await token.transfer(0x0, amount, { from: deployer }).should.be.rejected
			})
		})
	})
})
