
// Solar Calculator JavaScript

// Calculation functions
function calculateSolarMetrics(monthlyBill) {
    // Calculate daily consumption
    const dailyConsumption = monthlyBill / 30;
    
    // Calculate plant capacity
    const plantCapacity = dailyConsumption / 4;
    
    // Calculate contract load
    const contractLoad = plantCapacity * 0.8;
    
    // Determine cost per kW based on contract load
    let costPerKW;
    
    if (contractLoad >= 1 && contractLoad <= 100) {
        costPerKW = 40000; // ₹40,000 per kW
    } else if (contractLoad >= 101 && contractLoad <= 500) {
        costPerKW = 38000; // ₹38,000 per kW
    } else if (contractLoad >= 501 && contractLoad <= 1000) {
        costPerKW = 36000; // ₹36,000 per kW
    } else if (contractLoad >= 1001 && contractLoad <= 10000) {
        costPerKW = 34000; // ₹34,000 per kW
    } else {
        costPerKW = 40000; // Default to highest rate
    }
    
    // Calculate total plant cost
    const totalPlantCost = contractLoad * costPerKW;
    
    // Calculate CO₂ savings (kg/year)
    const co2Savings = plantCapacity * 0.772 * 365;
    
    return {
        dailyConsumption,
        plantCapacity,
        contractLoad,
        costPerKW,
        totalPlantCost,
        co2Savings
    };
}

// Utility functions
function formatNumber(num, decimals = 2) {
    return new Intl.NumberFormat('en-IN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num);
}

// Excel download functionality
function downloadExcel() {
    const location = document.getElementById('displayLocation').textContent;
    const coordinates = document.getElementById('displayCoordinates').textContent;
    const monthlyBill = document.getElementById('displayBill').textContent;
    const dailyConsumption = document.getElementById('dailyConsumption').textContent;
    const plantCapacity = document.getElementById('plantCapacity').textContent;
    const contractLoad = document.getElementById('contractLoad').textContent;
    const costPerKW = document.getElementById('costPerKW').textContent;
    const totalCost = document.getElementById('totalCost').textContent;
    const co2Savings = document.getElementById('co2Savings').textContent;

    // Create CSV content (which can be opened in Excel)
    const csvContent = [
        ['Solar Plant Calculation Results'],
        ['Generated on', new Date().toLocaleDateString('en-IN')],
        [],
        ['Project Details'],
        ['Location', location],
        ['Coordinates', coordinates],
        ['Monthly Bill', monthlyBill],
        [],
        ['Calculation Results'],
        ['Parameter', 'Value'],
        ['Daily Consumption', dailyConsumption],
        ['Plant Capacity', plantCapacity],
        ['Contract Load', contractLoad],
        ['Cost per kW', costPerKW],
        ['Total Plant Cost', totalCost],
        ['CO₂ Savings', co2Savings],
        [],
        ['Environmental Impact'],
        ['Annual CO₂ Savings', co2Savings],
        ['Trees Equivalent', `${Math.round(parseFloat(co2Savings.replace(/[^\d.]/g, '')) / 22)} trees per year`]
    ];

    // Convert to CSV format
    const csv = csvContent.map(row => 
        row.map(cell => `"${cell}"`).join(',')
    ).join('\n');

    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `solar_calculation_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Display results
function displayResults(inputs, results) {
    // Update project summary
    document.getElementById('displayLocation').textContent = inputs.location || 'Not specified';
    document.getElementById('displayCoordinates').textContent = inputs.coordinates || 'Not specified';
    document.getElementById('displayBill').textContent = formatCurrency(inputs.monthlyBill);
    
    // Update result values
    document.getElementById('dailyConsumption').textContent = `${formatNumber(results.dailyConsumption)} kWh`;
    document.getElementById('plantCapacity').textContent = `${formatNumber(results.plantCapacity)} kW`;
    document.getElementById('contractLoad').textContent = `${formatNumber(results.contractLoad)} kW`;
    document.getElementById('costPerKW').textContent = formatCurrency(results.costPerKW);
    document.getElementById('totalCost').textContent = `${formatCurrency(results.totalPlantCost)} (Without GST)`;
    document.getElementById('co2Savings').textContent = `${formatNumber(results.co2Savings, 0)} kg/year`;
    
    // Update environmental impact
    const treesEquivalent = Math.round(results.co2Savings / 22);
    document.getElementById('environmentalText').textContent = 
        `Your solar plant will save approximately ${formatNumber(results.co2Savings, 0)} kg of CO₂ annually!`;
    document.getElementById('treesEquivalent').textContent = 
        `This is equivalent to planting ${treesEquivalent} trees every year.`;
    
    // Show results section
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'inline-block';
}

// Print functionality
function printResults() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const location = document.getElementById('displayLocation').textContent;
    const coordinates = document.getElementById('displayCoordinates').textContent;
    const monthlyBill = document.getElementById('displayBill').textContent;
    const dailyConsumption = document.getElementById('dailyConsumption').textContent;
    const plantCapacity = document.getElementById('plantCapacity').textContent;
    const contractLoad = document.getElementById('contractLoad').textContent;
    const costPerKW = document.getElementById('costPerKW').textContent;
    const totalCost = document.getElementById('totalCost').textContent;
    const co2Savings = document.getElementById('co2Savings').textContent;
    const environmentalText = document.getElementById('environmentalText').textContent;
    const treesEquivalent = document.getElementById('treesEquivalent').textContent;

    const printContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Solar Plant Calculation Results</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    color: #333;
                    line-height: 1.6;
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 30px; 
                    border-bottom: 2px solid #22c55e;
                    padding-bottom: 20px;
                }
                .header h1 { 
                    color: #22c55e; 
                    margin: 0;
                    font-size: 24px;
                }
                .section { 
                    margin-bottom: 25px; 
                    page-break-inside: avoid;
                }
                .section h2 { 
                    color: #374151; 
                    border-bottom: 1px solid #e5e7eb;
                    padding-bottom: 5px;
                    margin-bottom: 15px;
                }
                .grid { 
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 15px; 
                    margin-bottom: 20px;
                }
                .result-item { 
                    padding: 15px; 
                    border: 1px solid #e5e7eb; 
                    border-radius: 8px;
                    background: #f9fafb;
                }
                .result-label { 
                    font-weight: bold; 
                    color: #6b7280; 
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                .result-value { 
                    font-size: 18px; 
                    color: #111827;
                    font-weight: 600;
                }
                .highlight { 
                    background: #dcfce7; 
                    border: 2px solid #22c55e; 
                    padding: 20px; 
                    border-radius: 8px;
                    text-align: center;
                }
                .highlight h3 { 
                    color: #15803d; 
                    margin: 0 0 10px 0;
                }
                @media print {
                    body { margin: 0; }
                    .section { page-break-inside: avoid; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Solar Plant Calculation Results</h1>
                <p>Generated on ${new Date().toLocaleDateString('en-IN')}</p>
            </div>

            <div class="section">
                <h2>Project Details</h2>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Coordinates:</strong> ${coordinates}</p>
                <p><strong>Monthly Bill:</strong> ${monthlyBill}</p>
            </div>

            <div class="section">
                <h2>Calculation Results</h2>
                <div class="grid">
                    <div class="result-item">
                        <div class="result-label">Daily Consumption</div>
                        <div class="result-value">${dailyConsumption}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Plant Capacity</div>
                        <div class="result-value">${plantCapacity}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Contract Load</div>
                        <div class="result-value">${contractLoad}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Cost per kW</div>
                        <div class="result-value">${costPerKW}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">Total Plant Cost</div>
                        <div class="result-value">${totalCost}</div>
                    </div>
                    <div class="result-item">
                        <div class="result-label">CO₂ Savings</div>
                        <div class="result-value">${co2Savings}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="highlight">
                    <h3>Environmental Impact</h3>
                    <p>${environmentalText}</p>
                    <p>${treesEquivalent}</p>
                </div>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}

// Reset form
function resetForm() {
    document.getElementById('solarForm').reset();
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solarForm');
    const resetBtn = document.getElementById('resetBtn');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value);
        const location = document.getElementById('location').value;
        const coordinates = document.getElementById('coordinates').value;
        
        if (!monthlyBill || isNaN(monthlyBill)) {
            alert('Please enter a valid monthly bill amount');
            return;
        }
        
        const inputs = {
            monthlyBill,
            location,
            coordinates
        };
        
        const results = calculateSolarMetrics(monthlyBill);
        displayResults(inputs, results);
    });
    
    resetBtn.addEventListener('click', resetForm);
});