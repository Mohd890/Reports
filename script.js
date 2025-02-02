document.addEventListener('DOMContentLoaded', function () {
    const user = { username: 'Mohamed Mokhtar', jobNumber: '903881' };
    const location = 'Current Location';

  
    document.getElementById('username').value = user.username;
    document.getElementById('jobNumber').value = user.jobNumber;
    document.getElementById('location').value = location;

    
    function updateDateTime() {
        const now = new Date();
        const formattedDateTime = now.toLocaleDateString('en-US') + ' ' + now.toLocaleTimeString('en-US');
        document.getElementById('datetime').value = formattedDateTime;
    }

    
    function generateReportNumber() {
        const reportType = document.getElementById('reportType').value;
        const sector = document.getElementById('sector').value;

        if (reportType && sector) {
            let lastReportNumber = localStorage.getItem(`lastReportNumber_${reportType}_${sector}`) || "0000000";
            let newReportNumber = String(parseInt(lastReportNumber) + 1).padStart(7, '0');

            localStorage.setItem(`lastReportNumber_${reportType}_${sector}`, newReportNumber);

            const formattedReportNumber = `${reportType}-Sec${sector}-${newReportNumber}`;
            document.getElementById('reportNumber').value = formattedReportNumber;
        } else {
            document.getElementById('reportNumber').value = "";
        }
    }

    
    function loadTemplate() {
        const reportType = document.getElementById('reportType').value;
        const templateSection = document.getElementById('dynamicTemplates');
        templateSection.innerHTML = '';

        if (!reportType) return;

        let templates = "";

        
        if (['RM', 'PM', 'CM'].includes(reportType)) {
            templates += `
                <div class="template">
                    <h3>Assets</h3>
                    <div id="assetsList"></div>
                    <button class="add-btn" onclick="addAsset()">+</button>
                </div>
                <div class="template">
                    <h3>Report/Notes</h3>
                    <textarea placeholder="Enter report or notes..." style="width: 100%; height: 80px;"></textarea>
                </div>
                <div class="template">
                    <h3>Workforce</h3>
                    <div id="workforceList"></div>
                    <button class="add-btn" onclick="addWorkforce()">+</button>
                </div>
                <div class="template">
                    <h3>Equipment</h3>
                    <div id="equipmentList"></div>
                    <button class="add-btn" onclick="addEquipment()">+</button>
                </div>
                <div class="template">
                    <h3>Images</h3>
                    <label>Before:</label>
                    <input type="file" accept="image/*">
                    <label>After:</label>
                    <input type="file" accept="image/*">
                </div>
                <div class="template">
                    <h3>Work Status</h3>
                    <select>
                        <option value="">Choose</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
            `;
        }

        
        if (reportType === 'Req') {
            templates += `
                <div class="template">
                    <h3>Request Number</h3>
                    <input type="text" id="requestNumber" placeholder="Enter request number">
                </div>
                <div class="template">
                    <h3>Report/Notes</h3>
                    <textarea placeholder="Enter report or notes..." style="width: 100%; height: 80px;"></textarea>
                </div>
                <div class="template">
                    <h3>Workforce</h3>
                    <div id="workforceList"></div>
                    <button class="add-btn" onclick="addWorkforce()">+</button>
                </div>
                <div class="template">
                    <h3>Equipment</h3>
                    <div id="equipmentList"></div>
                    <button class="add-btn" onclick="addEquipment()">+</button>
                </div>
                <div class="template">
                    <h3>Images</h3>
                    <label>Before:</label>
                    <input type="file" accept="image/*">
                    <label>After:</label>
                    <input type="file" accept="image/*">
                </div>
                <div class="template">
                    <h3>Work Status</h3>
                    <select>
                        <option value="">Choose</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
            `;
        }

        
        if (reportType === 'E') {
            templates += `
                <div class="template">
                    <h3>Emergency Type</h3>
                    <select>
                        <option value="">Choose</option>
                        <option value="Rain">Rain</option>
                        <option value="Fire">Fire</option>
                        <option value="Tree Fall">Tree Fall</option>
                        <option value="Sand Collapse">Sand Collapse</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="template">
                    <h3>Report/Notes</h3>
                    <textarea placeholder="Enter emergency details..." style="width: 100%; height: 80px;"></textarea>
                </div>
                <div class="template">
                    <h3>Workforce</h3>
                    <div id="workforceList"></div>
                    <button class="add-btn" onclick="addWorkforce()">+</button>
                </div>
                <div class="template">
                    <h3>Equipment</h3>
                    <div id="equipmentList"></div>
                    <button class="add-btn" onclick="addEquipment()">+</button>
                </div>
                <div class="template">
                    <h3>Images</h3>
                    <label>Before:</label>
                    <input type="file" accept="image/*">
                    <label>After:</label>
                    <input type="file" accept="image/*">
                </div>
                <div class="template">
                    <h3>Work Status</h3>
                    <select>
                        <option value="">Choose</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                    </select>
                </div>
            `;
        }

        
        if (reportType === 'IP') {
            templates += `
                <div class="template">
                    <h3>Inspection Report</h3>
                    <textarea placeholder="Enter inspection report..." style="width: 100%; height: 80px;"></textarea>
                </div>
                <div class="template">
                    <h3>Inspection Image</h3>
                    <label>After Inspection:</label>
                    <input type="file" accept="image/*">
                </div>
            `;
        }

        templateSection.innerHTML = templates;
    }

    
    window.addAsset = function () {
        const assetsList = document.getElementById('assetsList');
        const div = document.createElement('div');
        div.classList.add('asset-item');
        div.innerHTML = `
            <div class="asset-entry">
                <select onchange="handleAssetTypeChange(this)">
                    <option value="">Choose Asset Type</option>
                    <option value="Manhole">Manhole</option>
                    <option value="Drainage">Drainage</option>
                    <option value="Culvert">Culvert</option>
                    <option value="Tank">Tank</option>
                    <option value="Pump Station">Pump Station</option>
                    <option value="Pipe">Pipe</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" placeholder="Quantity">
                <select>
                    <option value="">Choose Unit</option>
                    <option value="Number">Number</option>
                    <option value="Square Meter">Square Meter</option>
                    <option value="Meter">Meter</option>
                    <option value="Cubic Meter">Cubic Meter</option>
                </select>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">-</button>
            </div>
            <div class="other-asset" style="display: none;">
                <input type="text" placeholder="Enter other asset type">
            </div>
        `;
        assetsList.appendChild(div);
    };

    
    window.handleAssetTypeChange = function (select) {
        const otherAssetDiv = select.parentElement.nextElementSibling;
        if (select.value === "Other") {
            otherAssetDiv.style.display = "inline-block";
        } else {
            otherAssetDiv.style.display = "none";
        }
    };

    
    window.addWorkforce = function () {
        const workforceList = document.getElementById('workforceList');
        const div = document.createElement('div');
        div.classList.add('workforce-item');
        div.innerHTML = `
            <div class="workforce-entry">
                <select onchange="handleWorkforceTypeChange(this)">
                    <option value="">Choose Employees Type</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Worker">Worker</option>
                    <option value="Driver">Driver</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" placeholder="Job Number">
                <input type="number" placeholder="Work Hours">
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">-</button>
            </div>
            <div class="other-workforce" style="display: none;">
                <input type="text" placeholder="Enter other Employees type">
            </div>
        `;
        workforceList.appendChild(div);
    };

  
    window.handleWorkforceTypeChange = function (select) {
        const otherWorkforceDiv = select.parentElement.nextElementSibling;
        if (select.value === "Other") {
            otherWorkforceDiv.style.display = "inline-block";
        } else {
            otherWorkforceDiv.style.display = "none";
        }
    };

    
    window.addEquipment = function () {
        const equipmentList = document.getElementById('equipmentList');
        const div = document.createElement('div');
        div.classList.add('equipment-item');
        div.innerHTML = `
            <div class="equipment-entry">
                <select onchange="handleEquipmentTypeChange(this)">
                    <option value="">Choose Equipment Type</option>
                    <option value="Water Tanker">Water Tanker</option>
                    <option value="Pump">Pump</option>
                    <option value="Truck">Truck</option>
                    <option value="Excavator">Excavator</option>
                    <option value="Other">Other</option>
                </select>
                <select onchange="handleEquipmentCodeChange(this)">
                    <option value="">Choose Equipment Code</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="PSD">PSD</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" placeholder="Equipment Number">
                <input type="number" placeholder="Quantity">
                <select>
                    <option value="">Choose Unit</option>
                    <option value="Hour">Hour</option>
                    <option value="Trip">Trip</option>
                    <option value="Square Meter">Square Meter</option>
                    <option value="Ton">Ton</option>
                </select>
                <button class="remove-btn" onclick="this.parentElement.parentElement.remove()">-</button>
            </div>
            <div class="other-equipment" style="display: none;">
                <input type="text" placeholder="Enter other equipment type">
            </div>
            <div class="other-code" style="display: none;">
                <input type="text" placeholder="Enter other equipment code">
            </div>
        `;
        equipmentList.appendChild(div);
    };

    // Handle equipment type change
    window.handleEquipmentTypeChange = function (select) {
        const otherEquipmentDiv = select.parentElement.nextElementSibling;
        if (select.value === "Other") {
            otherEquipmentDiv.style.display = "inline-block";
        } else {
            otherEquipmentDiv.style.display = "none";
        }
    };

    // Handle equipment code change
    window.handleEquipmentCodeChange = function (select) {
        const otherCodeDiv = select.parentElement.nextElementSibling.nextElementSibling;
        if (select.value === "Other") {
            otherCodeDiv.style.display = "inline-block";
        } else {
            otherCodeDiv.style.display = "none";
        }
    };

    // Get current location
    document.getElementById('getLocation').addEventListener('click', function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('location').value = `Latitude: ${latitude}, Longitude: ${longitude}`;
            });
        } else {
            alert("Browser does not support geolocation.");
        }
    });

    // Update report number when work type or sector changes
    document.getElementById('reportType').addEventListener('change', function () {
        loadTemplate();
        generateReportNumber();
    });

    document.getElementById('sector').addEventListener('change', generateReportNumber);

    // Submit report
    document.getElementById('submitReport').addEventListener('click', function () {
        generateReportNumber();
        alert("Report submitted successfully!");
    });

    // Run functions on page load
    updateDateTime();
});
