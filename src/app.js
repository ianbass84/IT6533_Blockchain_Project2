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
      const recordId = record[0].toNumber()
      const firstName = record[1]
      const lastName = record[2]
      const recordCompleted = record[3]
      console.log(firstName)
      console.log(lastName)


      // Create the html for the record
      const $newRecordTemplate = $recordTemplate.clone()
      $newRecordTemplate.find('.recordContent').html(recordsContent)
        $newRecordTemplate.find('input', firstName, lastName)
        .prop('recordsContent',recordId)
        .prop('checked', recordCompleted)
        //.prop('firstName')
        //.prop('lastName')
        // .on('click', App.toggleCompleted)

      // Put the task in the correct list
      if (recordCompleted) {
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
    const recordContent = $('#recordContent')
    if (boolean) {
      loader.show()
      recordContent.hide()
    } else {
      loader.hide()
      recordContent.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})