document.addEventListener('DOMContentLoaded', () => {
    const carTypeSelect = document.getElementById('car-type');
    const carValueInput = document.getElementById('car-value');
    const carValueRange = document.getElementById('car-value-range');
    const leasePeriodInput = document.getElementById('lease-period');
    const leasePeriodRange = document.getElementById('lease-period-range');
    const downPaymentInput = document.getElementById("down-payment-input");
    const downPaymentRange = document.getElementById('down-payment');
    
    const leasingCostDisplay = document.getElementById('leasing-cost');
    const downPaymentAmountDisplay = document.getElementById('down-payment-amount');
    const downPaymentPercentDisplay = document.getElementById('down-payment-percent');
    const monthlyInstallmentDisplay = document.getElementById('monthly-installment');
    const interestRateDisplay = document.getElementById('interest-rate');
    
    const minCarValue = 10000;
    const maxCarValue = 200000;
    const minLeasePeriod = 12;
    const maxLeasePeriod = 60;
    const minDownPayment = 10;
    const maxDownPayment = 50;

    function updateValues() {
        const carType = carTypeSelect.value;
        const carValue = parseInt(carValueInput.value) || minCarValue;
        const leasePeriod = parseInt(leasePeriodInput.value) || minLeasePeriod;
        const downPaymentPercent = parseInt(downPaymentRange.value) || minDownPayment;

        const interestRate = carType === 'new' ? 2.99 : 3.7;
        const downPaymentAmount = carValue * (downPaymentPercent / 100);
        const loanAmount = carValue - downPaymentAmount;
        const monthlyInterestRate = (interestRate / 100) / 12;
        const numberOfPayments = leasePeriod;
        
        const monthlyInstallment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
        const totalLeasingCost = (monthlyInstallment * leasePeriod) + downPaymentAmount;

        leasingCostDisplay.textContent = `€${totalLeasingCost.toFixed(2)}`;
        downPaymentAmountDisplay.textContent = `€${downPaymentAmount.toFixed(2)}`;
        downPaymentPercentDisplay.textContent = `${downPaymentPercent}%`;
        monthlyInstallmentDisplay.textContent = `€${monthlyInstallment.toFixed(2)}`;
        interestRateDisplay.textContent = `${interestRate}%`;
    }

    carValueInput.addEventListener('input', () => {
        carValueRange.value = carValueInput.value;
        updateValues();
    });

    carValueRange.addEventListener('input', () => {
        carValueInput.value = carValueRange.value;
        updateValues();
    });

    leasePeriodInput.addEventListener('input', () => {
        leasePeriodRange.value = leasePeriodInput.value;
        updateValues();
    });

    leasePeriodRange.addEventListener('input', () => {
        leasePeriodInput.value = leasePeriodRange.value;
        updateValues();
    });

    

    downPaymentInput.addEventListener("input", function() {
        downPaymentRange.value = downPaymentInput.value;
        updateValues();
        calculateLeasing();
       
    });
    downPaymentRange.addEventListener("input", function() {
        downPaymentInput.value = downPaymentRange.value;
        updateValues();
        calculateLeasing();
    });

    carTypeSelect.addEventListener('change', updateValues);
    updateValues();
});