import { Chart } from 'chart.js/auto'

const canvas = document.getElementById("canvasid")

const sample = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const performance = [40, 48 ,68, 91 ,89];

new Chart(canvas, {
    type: 'bar',
    data: {
        labels: sample,
        datasets : [{
            label: "Kinerja Piket (%)",
            data: performance,
            backgroundColor: '#3b82f6', 
            yAxisID: "y"
        }]
    },
        options : {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: true
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    align: "center",
                    labels: {
                        color: "#333",
                        font: {
                            size: 18,
                        }
                    }

                }
            },    
                scales:{
                    y: {
                        beginAtZero: true,
                        position: "left",
                        title :{
                            display: true,
                            text:"Performa %",
                            color: "#333",
                            font: { size: 14},
                            
                        }
                         
                    }
                }
            }
        }
    )