document.addEventListener("DOMContentLoaded", function () {
    const options = {
        chart: {
            type: "line",
            height: 400,
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                    speed: 1000
                }
            }
        },
        series: [{
            name: "Balance (€)",
            data: []
        }],
        xaxis: {
            type: "datetime",
            title: {
                text: "Timestamp"
            }
        },
        yaxis: {
            title: {
                text: "Balance (€)"
            }
        },
        title: {
            text: "Real-Time Account Balance",
            align: "center"
        }
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    async function fetchBalance() {
        try {
            const response = await fetch("http://localhost:8000/balance");
            const data = await response.json();
            const point = {
                x: new Date(data.timestamp).getTime(),
                y: data.balance
            };
            options.series[0].data.push(point);
            chart.updateSeries([{
                data: options.series[0].data
            }]);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }

    // Fetch balance every 60 seconds
    setInterval(fetchBalance, 60000);
    fetchBalance();  // Initial fetch
});

