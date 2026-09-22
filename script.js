// Store customers
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// Get HTML elements
const customerForm = document.getElementById("customerForm");
const customerContainer = document.getElementById("customerContainer");
const searchInput = document.getElementById("search");

// Add Customer
customerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value.trim();

if (!/^[0-9]{10}$/.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
}
    const company = document.getElementById("company").value;

    const customer = {
        id: Date.now(),
        name: name,
        email: email,
        phone: phone,
        company: company
    };

    customers.push(customer);
    localStorage.setItem("customers",JSON.stringify(customers));

    displayCustomers(customers);

    customerForm.reset();
});

// Display Customers
function displayCustomers(customerList) {

    customerContainer.innerHTML = "";

    if (customerList.length === 0) {
        customerContainer.innerHTML = "<p>No customers found.</p>";
        return;
    }

    customerList.forEach(function(customer) {

        const card = document.createElement("div");

        card.className = "customer-card";

        card.innerHTML = `
            <h3>${customer.name}</h3>
            <p><strong>Email:</strong> ${customer.email}</p>
            <p><strong>Phone:</strong> ${customer.phone}</p>
            <p><strong>Company:</strong> ${customer.company}</p>

            <button class="edit-btn" onclick="editCustomer(${customer.id})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteCustomer(${customer.id})">
                Delete
            </button>
        `;

        customerContainer.appendChild(card);
    });

document.getElementById("totalCustomers").textContent = customers.length;

const companies = new Set(
    customers.map(function(customer) {
        return customer.company;
    })
);

document.getElementById("totalCompanies").textContent = companies.size;
}

// Delete Customer
function deleteCustomer(id) {

    const confirmDelete = confirm("Are you sure you want to delete this customer?");

    if (!confirmDelete) {
        return;
    }

    customers = customers.filter(function(customer) {
        return customer.id !== id;
    });

    localStorage.setItem("customers", JSON.stringify(customers));

    displayCustomers(customers);
}
// Edit Customer
function editCustomer(id) {

    const customer = customers.find(function(customer) {
        return customer.id === id;
    });

    document.getElementById("name").value = customer.name;
    document.getElementById("email").value = customer.email;
    document.getElementById("phone").value = customer.phone;
    document.getElementById("company").value = customer.company;

    deleteCustomer(id);
}

// Search Customers
searchInput.addEventListener("input", function() {

    const searchText = searchInput.value.toLowerCase();

    const filteredCustomers = customers.filter(function(customer) {

        return (
            customer.name.toLowerCase().includes(searchText) ||
            customer.email.toLowerCase().includes(searchText) ||
            customer.company.toLowerCase().includes(searchText)
        );

    });

    displayCustomers(filteredCustomers);
});
displayCustomers(customers);