document.addEventListener("DOMContentLoaded", function () {
	initialAmount.value = 5000;
	monthlyInvestment.value = 100;
	investmentYears.value = 5;
	rates.value = 10;
	compoundPeriodUnit.value = 1;

	calculateGrowth();
});

const initialAmount = document.querySelector("#initialAmount");
const monthlyInvestment = document.querySelector("#monthlyInvestment");
const investmentYears = document.querySelector("#investmentYears");
const rates = document.querySelector("#rates");
const compoundPeriodUnit = document.querySelector("#compoundPeriodUnit");
const calcBtn = document.querySelector("#calcBtn");
const resultTitle = document.getElementById("resultAmount");

calcBtn.addEventListener("click", (e) => {
	e.preventDefault();
	calculateGrowth(e);
});

const data = [];
const label = [];
const totalInvestedData = [];

let totalInvestment;
let totalAmount;

const calculateGrowth = () => {
	try {
		const initial = parseFloat(initialAmount.value);
		const monthly = parseFloat(monthlyInvestment.value) || 0;
		const period = parseInt(investmentYears.value);
		const interest = parseFloat(rates.value);
		const compound = parseInt(compoundPeriodUnit.value);

		if (isNaN(initial) || isNaN(period) || isNaN(interest) || isNaN(compound)) {
			alert("Please enter valid input values");
			return;
		}

		data.length = 0;
		label.length = 0;
		totalInvestedData.length = 0;

		totalAmount = initial;
		let totalInvested = initial;

		for (let year = 0; year <= period; year++) {
			if (year === 0) {
				totalAmount = initial;
			}

			if (year > 0) {
				totalInvested += monthly * 12;

				for (let month = 1; month <= 12; month++) {
					totalAmount += monthly;
					totalAmount *= Math.pow(1 + interest / 100 / compound, compound / 12);
				}
			}
			totalInvestedData.push(parseInt(totalInvested));

			data.push(parseInt(totalAmount));
			label.push("Year " + year);
		}
	} catch (error) {
		console.error("An error occurred during calculation", error);
	} finally {
		drawGraph();
		resultTitle.textContent = "$" + new Intl.NumberFormat().format(totalAmount.toFixed(2));
	}
};

const context = document.getElementById("data-set").getContext("2d");
let line = new Chart(context, {});

const drawGraph = () => {
	line.destroy();
	line = new Chart(context, {
		type: "line",
		data: {
			labels: label,
			datasets: [
				{
					label: "Total Principal",
					data: totalInvestedData,
					fill: true,
					backgroundColor: "lightblue",
					borderColor: "rgb(30, 144, 255)",
					borderWidth: 2,
				},
				{
					label: "Total Amount",
					data: data,
					fill: true,
					backgroundColor: "lightgreen",
					borderColor: "rgb(61, 109, 61)",
					borderWidth: 2,
				},
			],
		},
		options: {
			scales: {
				y: {
					beginAtZero: true,
					min: 0,
				},
			},
			plugins: {
				tooltip: {
					mode: "index",
					intersect: false,
					backgroundColor: "rgba(0, 0, 0, 0.8)",
					titleFont: {
						size: 15,
					},
					bodyFont: {
						size: 20,
					},
					padding: 15,
					callbacks: {
						beforeBody: function (context) {
							const index = context[0].dataIndex;
							const totalPrincipal = totalInvestedData[index];
							const totalAmt = data[index];
							return `Total Amount: $${new Intl.NumberFormat().format(
								totalAmt,
							)}\nTotal Principal: $${new Intl.NumberFormat().format(
								totalPrincipal,
							)}\nTotal Interest: $${new Intl.NumberFormat().format(totalAmt - totalPrincipal)}`;
						},
						label: function (context) {
							return "";
						},
					},
				},
			},
		},
	});
};
