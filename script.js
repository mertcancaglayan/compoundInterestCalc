const initialAmount = document.querySelector("#initialAmount");
const monthlyInvestment = document.querySelector("#monthlyInvestment");
const investmentYears = document.querySelector("#investmentYears");
const rates = document.querySelector("#rates");
const compoundPeriodUnit = document.querySelector("#compoundPeriodUnit");
const calcBtn = document.querySelector("#calcBtn");

calcBtn.addEventListener("click", (e) => {
	calculateGrowth(e);
});

const data = [];
const label = [];

let totalInvestment;

const calculateGrowth = (e) => {
	e.preventDefault();

	try {
		const initial = parseFloat(initialAmount.value);
		const monthly = parseFloat(monthlyInvestment.value);
		const period = parseInt(investmentYears.value);
		const interest = parseFloat(rates.value);
		const compound = parseInt(compoundPeriodUnit.value);

		if (isNaN(initial) || isNaN(period) || isNaN(interest) || isNaN(compound)) {
			alert("Please enter valid input values");
			return;
		}

		data.length = 0;
		label.length = 0;

		totalInvestment = initial + monthly * 12 * period;

		let totalAmount = initial;

		for (let year = 1; year <= period; year++) {
			for (let month = 1; month <= 12; month++) {
				totalAmount += monthly;
				totalAmount *= Math.pow(1 + interest / 100 / compound, compound / 12);
			}
			data.push(parseInt(totalAmount));
			label.push("Year" + year);
		}
	} catch (error) {
		console.error("An error occurred during calculation", error);
	} finally {
		console.table(data);
		console.log("Total Amounth: " + data.pop());
		console.log("total investment: " + totalInvestment);
	}
};
