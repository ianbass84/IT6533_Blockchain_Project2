App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.ethereum) {
      App.web3Provider = ethereum.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
    console.log(App.account)
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const ethEhrSystem = await $.getJSON('EthEhrSystem.json')
    App.contracts.EthEhrSystem = TruffleContract(ethEhrSystem)
    App.contracts.EthEhrSystem.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.ethEhrSystem = await App.contracts.EthEhrSystem.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Records
    await App.renderRecords()

    // Update loading state
    App.setLoading(false)
  },

  renderRecords: async () => {
    // Load the total task count from the blockchain
    const recordCount = await App.ethEhrSystem.recordCount()
    const $recordTemplate = $('.recordTemplate')

    // Render out each record with a new record template
    for (var i = 1; i <= recordCount; i++) {
      // Fetch the task data from the blockchain
      const record = await App.ethEhrSystem.records(i)
      const appAccount = App.account
      const recordId = record[0].toNumber()
      const firstName = record[1]
      const lastName = record[2]
      const addressed = record[3]
      const city = recprd[4]
      const state = recprd[5]
      const zip = record[6]
      const phone = record[7]
      console.log(firstName)
      console.log(lastName)
      console.log(addressed)



      // Create the html for the record
      const $newRecordTemplate = $recordTemplate.clone()
      $newRecordTemplate.find('.appAccount').html(appAccount)
      $newRecordTemplate.find('.firstName').html(firstName)
        $newRecordTemplate.find('input')
        .prop('firstName', "recordId")
      $newRecordTemplate.find('.lastName').html(lastName)
        $newRecordTemplate.find('input')
        .prop('lastName', "recordId")
      $newRecordTemplate.find('.addressed').html(addressed)
        $newRecordTemplate.find('input')
        .prop('laddressed', "recordId")
        $newRecordTemplate.find('.city').html(city)
      $newRecordTemplate.find('input')
        .prop('city', "recordId")
      $newRecordTemplate.find('.state').html(state)
        $newRecordTemplate.find('input')
        .prop('state', "recordId")
      $newRecordTemplate.find('.phone').html(phone)
        $newRecordTemplate.find('input')
        .prop('phone', "recordId")
        // .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (lastName) {
        $('#completedRecordList').append($newRecordTemplate)
      } else {
        $('#recordList').append($newRecordTemplate)
      }

      // Show the task
      $newRecordTemplate.show()
    }
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const completed = $('#completed')
    if (boolean) {
      loader.show()
      completed.hide()
    } else {
      loader.hide()
      completed.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})