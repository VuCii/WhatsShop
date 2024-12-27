// Load and display order history
function displayOrderHistory() {
    const orderHistoryBody = document.getElementById('orderHistoryBody');
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];
    
    orderHistoryBody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.date}</td>
            <td>#${order.id}</td>
            <td>
                ${order.items.map(item => `
                    <div>${item.name} x${item.quantity || 1}</div>
                `).join('')}
            </td>
            <td>R${order.totalAmount.toFixed(2)}</td>
            <td>
                <div>Name: ${order.customerInfo.name}</div>
                <div>Email: ${order.customerInfo.email}</div>
                <div>Phone: ${order.customerInfo.phone}</div>
                <div>Address: ${order.customerInfo.address}</div>
            </td>
            <td>${order.delivery.description}</td>
            <td><span class="status-badge">${order.status}</span></td>
        </tr>
    `).join('');
}

// Call displayOrderHistory on page load
document.addEventListener('DOMContentLoaded', displayOrderHistory);
