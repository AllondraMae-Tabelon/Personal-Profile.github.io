// ===== LOAD MESSAGES =====
async function loadMessages() {
    try {
        const messagesSnapshot = await messagesCollection
            .orderBy('timestamp', 'desc')
            .get();
        
        const messages = [];
        messagesSnapshot.forEach(doc => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Update stats
        const total = messages.length;
        const unread = messages.filter(m => !m.read).length;
        const read = messages.filter(m => m.read).length;
        
        document.getElementById('totalMessages').textContent = total;
        document.getElementById('unreadMessages').textContent = unread;
        document.getElementById('readMessages').textContent = read;

        // Render messages table
        const tbody = document.getElementById('messagesBody');
        if (messages.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No messages yet</p>
                    </td>
                </tr>
            `;
            return;
        }

        tbody.innerHTML = messages.map((msg, index) => `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${msg.name || 'Anonymous'}</strong></td>
                <td><a href="mailto:${msg.email}">${msg.email}</a></td>
                <td>${msg.message || 'No message'}</td>
                <td>${msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleString() : 'N/A'}</td>
                <td>
                    <span class="status-badge ${msg.read ? 'read' : 'unread'}">
                        ${msg.read ? '✓ Read' : '● Unread'}
                    </span>
                </td>
                <td>
                    ${!msg.read ? `<button onclick="markRead('${msg.id}')" class="mark-read-btn"><i class="fas fa-check"></i></button>` : ''}
                    <button onclick="deleteMessage('${msg.id}')" class="delete-btn"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error loading messages:', error);
        alert('Error loading messages. Please refresh.');
    }
}

// ===== MARK MESSAGE AS READ =====
async function markRead(messageId) {
    if (!confirm('Mark this message as read?')) return;
    
    try {
        await messagesCollection.doc(messageId).update({
            read: true
        });
        loadMessages(); // Refresh
    } catch (error) {
        console.error('Error marking message:', error);
        alert('Error updating message.');
    }
}

// ===== DELETE MESSAGE =====
async function deleteMessage(messageId) {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
        await messagesCollection.doc(messageId).delete();
        loadMessages(); // Refresh
    } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message.');
    }
}

// ===== AUTO-REFRESH EVERY 30 SECONDS =====
document.addEventListener('DOMContentLoaded', () => {
    loadMessages();
    setInterval(loadMessages, 30000);
});
