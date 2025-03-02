document.addEventListener("DOMContentLoaded", fetchDonations);

function fetchDonations() {
    fetch("/donations")
        .then(response => response.json())
        .then(data => {
            console.log("Received Donations:", data); // Debugging
            displayDonations(data);
        })
        .catch(error => console.error("Error fetching donations:", error));
}

function displayDonations(donations) {
    const foodList = document.getElementById("foodList");
    foodList.innerHTML = ""; // Clear previous entries

    donations.forEach(donation => {
        const li = document.createElement("li");
        li.className = "food-info";
        li.innerHTML = `
            <strong>${donation.foodName}</strong> - ${donation.quantity} <br>
            <em>Location: ${donation.location}</em> | <em>Donor: ${donation.donor}</em>
        `;
        foodList.appendChild(li);
    });
}

// Add Food Function
function addFood() {
    const foodName = document.getElementById("name").value;
    const quantity = document.getElementById("quantity").value;
    const location = document.getElementById("location").value;
    const donor = document.getElementById("donor").value;

    fetch("/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodName, quantity, location, donor })
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            alert("Donation added successfully!");
            fetchDonations(); // Refresh the list
        } else {
            alert("Error adding donation");
        }
    })
    .catch(error => console.error("Error:", error));
}
