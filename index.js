async function convertCurrency() {
    // Get input values
    var amount = document.getElementById('amount').value;
    var fromCurrency = document.getElementById('from').value;
    var toCurrency = document.getElementById('to').value;

    // Validate input (check if amount is a number)
    if (isNaN(amount) || amount === "") {
      alert("Please enter a valid number for the amount.");
      return;
    }

    
    var apiLink = 'https://v6.exchangerate-api.com/v6/4f126030c2dc36e7f10da39e/latest/';
    


    // Fetch real-time exchange rates from the API
    try {
      var response = await fetch(apiLink + fromCurrency, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      var data = await response.json();
  

      // Extract the conversion rate
      var conversionRate = data.conversion_rates[toCurrency];

      // Calculate converted amount
      var convertedAmount = amount * conversionRate;

      // Display result
      document.getElementById('result').innerHTML = amount + ' ' + fromCurrency +" "+ '='+" " + convertedAmount.toFixed(2) + ' ' + toCurrency;
    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to fetch exchange rates. Please try again.');
    }
  }