// Utility functions for HelpHub AI

// Navigation
function navigateTo(page) {
  window.location.href = `${page}.html`;
}

function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  return filename.replace('.html', '');
}

function setActiveNav() {
  const currentPage = getCurrentPage();
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    const page = href.replace('.html', '').replace('/', '');
    if (page === currentPage || (currentPage === '' && page === 'index')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Time formatting
function formatTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTimeDetailed(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// User helpers
function getUserById(userId) {
  const users = getUsers();
  return users.find(u => u.id === userId);
}

function getRequestById(requestId) {
  const requests = getRequests();
  return requests.find(r => r.id === requestId);
}

function getMessagesBetween(userId1, userId2) {
  const messages = getMessages();
  return messages.filter(m => 
    (m.from === userId1 && m.to === userId2) || 
    (m.from === userId2 && m.to === userId1)
  );
}

// Render helpers
function renderUserBadge(user) {
  return `<div class="badge">${user.avatar}</div>`;
}

function renderTag(text, type = 'default') {
  const tagClass = type === 'status' ? 'tag-status' : type === 'urgent' ? 'tag-urgent' : type === 'medium' ? 'tag-medium' : '';
  return `<span class="tag ${tagClass}">${text}</span>`;
}

function renderTags(tags) {
  return tags.map(tag => renderTag(tag)).join('');
}

function renderRequestCard(request) {
  const requester = getUserById(request.requester);
  const urgencyClass = request.urgency === 'High' ? 'tag-urgent' : request.urgency === 'Medium' ? 'tag-medium' : '';
  const statusClass = request.status === 'Solved' ? 'tag-status' : '';

  return `
    <div class="card card-request animate-fade-in">
      <div class="flex gap-md mb-md">
        ${renderTag(request.category)}
        ${renderTag(request.urgency, urgencyClass === 'tag-urgent' ? 'urgent' : 'medium')}
        ${request.status === 'Solved' ? renderTag(request.status, 'status') : ''}
      </div>
      <h3 class="mb-md">${request.title}</h3>
      <p class="text-muted mb-lg">${request.description}</p>
      <div class="flex-between">
        <div>
          <p class="font-semibold">${requester.name}</p>
          <p class="text-sm text-light">${request.location} • ${request.helpersInterested} helper interested</p>
        </div>
        <a href="request-detail.html?id=${request.id}" class="btn btn-secondary btn-small">Open details</a>
      </div>
    </div>
  `;
}

function renderHelperCard(user) {
  return `
    <div class="card card-helper">
      <div class="flex gap-md mb-md align-items-center">
        ${renderUserBadge(user)}
        <div>
          <h4>${user.name}</h4>
          <p class="text-sm text-light">${user.skills.join(', ')}</p>
        </div>
      </div>
      <div class="flex-between">
        <span class="text-sm">Trust ${user.trustScore}%</span>
        <span class="tag">${user.trustScore}%</span>
      </div>
    </div>
  `;
}

function renderNotificationItem(notification) {
  return `
    <div class="notification-item ${notification.read ? '' : 'unread'}">
      <div class="flex-between mb-sm">
        <h5>${notification.title}</h5>
        <span class="text-sm text-light">${formatTime(notification.timestamp)}</span>
      </div>
      <p class="text-sm text-light mb-md">${notification.type}</p>
      <div class="flex-between">
        <span></span>
        <span class="btn btn-small btn-secondary">${notification.read ? 'Read' : 'Unread'}</span>
      </div>
    </div>
  `;
}

// Form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateRequired(value) {
  return value && value.trim().length > 0;
}

// Local storage helpers (already in sample-data.js but duplicated for safety)
function getUsers() {
  const users = localStorage.getItem('helphub_users');
  return users ? JSON.parse(users) : [];
}

function getRequests() {
  const requests = localStorage.getItem('helphub_requests');
  return requests ? JSON.parse(requests) : [];
}

function getMessages() {
  const messages = localStorage.getItem('helphub_messages');
  return messages ? JSON.parse(messages) : [];
}

function getNotifications() {
  const notifications = localStorage.getItem('helphub_notifications');
  return notifications ? JSON.parse(notifications) : [];
}

function getCurrentUser() {
  const user = localStorage.getItem('helphub_currentUser');
  return user ? JSON.parse(user) : null;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
});
