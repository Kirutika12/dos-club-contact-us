const messagesContainer = document.querySelector("#messages-container");
const messageCount = document.querySelector("#message-count");
const searchInput = document.querySelector("#searchInput");

async function loadMessages() {
    try {
        const response = await fetch("/api/messages");
        const messages = await response.json();

        messageCount.textContent = messages.length;

        if (messages.length === 0) {
            messagesContainer.innerHTML = "<p>No messages found.</p>";
            return;
        }

        let table = `
            <table class="messages-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        messages.forEach(function(message) {
            table += `
                <tr>
                    <td>${message.id}</td>
                    <td>${message.name}</td>
                    <td>${message.email}</td>
                    <td>${message.phone || "-"}</td>
                    <td>${message.subject}</td>
                    <td>${message.message}</td>
                    <td>${message.created_at}</td>

                    <td>
                        <button
                            class="status-btn"
                            onclick="markAsRead(${message.id})"
                            ${message.status === "Read" ? "disabled" : ""}
                        >
                            <i class="fa-solid fa-envelope-open"></i>
                            ${message.status || "Unread"}
                        </button>
                    </td>

                    <td>
                        <button
                            class="delete-btn"
                            onclick="deleteMessage(${message.id})"
                        >
                            <i class="fa-solid fa-trash"></i>
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        table += `
                </tbody>
            </table>
        `;

        messagesContainer.innerHTML = table;

    } catch (error) {
        messagesContainer.innerHTML = "<p>Unable to load messages.</p>";
        console.error(error);
    }
}


/* SEARCH */

searchInput.addEventListener("input", function() {
    const searchText = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll(".messages-table tbody tr");

    rows.forEach(function(row) {
        const rowText = row.textContent.toLowerCase();

        if (rowText.includes(searchText)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});


/* DELETE MESSAGE */

async function deleteMessage(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/messages/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (data.success) {
            loadMessages();
        }

    } catch (error) {
        alert("Unable to delete the message.");
        console.error(error);
    }
}


/* MARK MESSAGE AS READ */

async function markAsRead(id) {
    try {
        const response = await fetch(`/api/messages/${id}/read`, {
            method: "PATCH"
        });

        const data = await response.json();

        if (data.success) {
            loadMessages();
        }

    } catch (error) {
        alert("Unable to update message status.");
        console.error(error);
    }
}


/* LOAD MESSAGES */

loadMessages();