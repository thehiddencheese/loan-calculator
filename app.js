// Selectors
const amount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const downPayment = document.getElementById('downPayment');

//Event Listeners

// Listens for submit
document.getElementById('loan-form').addEventListener('submit', function (e) {
  // Hides results
  document.getElementById('results').style.display = 'none';

  // Shows loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Functions

function calculateResults() {
  // Calculations
  const principleBeforeDownPayment = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;
  const calculatedDownPayment = parseFloat(downPayment.value);
  const principle = principleBeforeDownPayment - calculatedDownPayment;
  // Computes monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principle * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    calculatedDownPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principle).toFixed(2);

    // Shows Results
    document.getElementById('results').style.display = 'block';

    //Hides loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Verify that information is entered correctly');
  }
}

function showError(error) {
  // Hide Results
  document.getElementById('results').style.display = 'none';

  //Hides loader
  document.getElementById('loading').style.display = 'none';

  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector('.alert').remove();
}
