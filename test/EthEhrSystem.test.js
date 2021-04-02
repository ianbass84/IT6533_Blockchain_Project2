const EthEhrSystem = artifacts.require('./EthEhrSystem.sol')

contract('EthEhrSystem', (accounts) => {
  before(async () => {
    this.ethEhrSystem = await EthEhrSystem.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.ethEhrSystem.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists records', async () => {
    const recordCount = await this.ethEhrSystem.recordCount()
    const record = await this.ethEhrSystem.records(recordCount)
    assert.equal(record.id.toNumber(), recordCount.toNumber())
    assert.equal(record.firstName, 'John')
    assert.equal(record.lastName, 'Smith')
    assert.equal(recordCount.toNumber(), 1)
  })

  it('creates records', async () => {
    const result = await this.ethEhrSystem.createRecord('Tom', 'Jenkins')
    const recordCount = await this.ethEhrSystem.recordCount()
    assert.equal(recordCount, 2)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    console.log(result)
  })

})