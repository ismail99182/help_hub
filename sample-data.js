// Sample data for HelpHub AI - Initialize LocalStorage with demo data
const SAMPLE_DATA = {
  users: [
    {
      id: 'user-1',
      name: 'Ayesha Khan',
      email: 'ayesha@helphub.ai',
      role: 'both',
      location: 'Karachi',
      skills: ['Figma', 'UI/UX', 'HTML/CSS', 'Career Guidance'],
      trustScore: 100,
      contributions: 35,
      badges: ['Design Ally', 'Fast Responder', 'Top Mentor'],
      interests: ['Hackathons', 'UI/UX', 'Community Building'],
      avatar: 'AK'
    },
    {
      id: 'user-2',
      name: 'Hassan Ali',
      email: 'hassan@helphub.ai',
      role: 'both',
      location: 'Lahore',
      skills: ['JavaScript', 'React', 'Git/GitHub'],
      trustScore: 88,
      contributions: 24,
      badges: ['Code Rescuer', 'Bug Hunter'],
      interests: ['Web Dev', 'Open Source'],
      avatar: 'HA'
    },
    {
      id: 'user-3',
      name: 'Sara Noor',
      email: 'sara@helphub.ai',
      role: 'both',
      location: 'Remote',
      skills: ['Python', 'Data Analysis'],
      trustScore: 74,
      contributions: 11,
      badges: ['Community Voice'],
      interests: ['Data Science', 'Analytics'],
      avatar: 'SN'
    }
  ],

  requests: [
    {
      id: 'req-1',
      title: 'Need help',
      description: 'help needed',
      category: 'Web Development',
      urgency: 'High',
      status: 'Solved',
      requester: 'user-1',
      tags: ['Web Development'],
      location: 'Karachi',
      helpersInterested: 1,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'req-2',
      title: 'Need help making my portfolio responsive before demo day',
      description: 'My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.',
      category: 'Web Development',
      urgency: 'High',
      status: 'Open',
      requester: 'user-3',
      tags: ['HTML/CSS', 'Responsive', 'Portfolio'],
      location: 'Karachi',
      helpersInterested: 1,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'req-3',
      title: 'Looking for Figma feedback on a volunteer event poster',
      description: 'I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.',
      category: 'Design',
      urgency: 'Medium',
      status: 'Open',
      requester: 'user-1',
      tags: ['Figma', 'Poster', 'Design Review'],
      location: 'Lahore',
      helpersInterested: 0,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'req-4',
      title: 'Need mock interview support for internship applications',
      description: 'Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.',
      category: 'Career',
      urgency: 'Low',
      status: 'Solved',
      requester: 'user-3',
      tags: ['Interview Prep', 'Career', 'Frontend'],
      location: 'Remote',
      helpersInterested: 2,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],

  messages: [
    {
      id: 'msg-1',
      from: 'user-1',
      to: 'user-3',
      content: 'I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'msg-2',
      from: 'user-2',
      to: 'user-1',
      content: 'Your event poster concept is solid. I would tighten the CTA and reduce the background texture.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ],

  notifications: [
    {
      id: 'notif-1',
      title: '"Need help" was marked as solved',
      type: 'Status',
      timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-2',
      title: 'Ayesha Khan offered help on "Need help"',
      type: 'Match',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-3',
      title: 'Your request "Need help" is now live in the community feed',
      type: 'Request',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-4',
      title: '"Need help making my portfolio responsive before demo day" was marked as solved',
      type: 'Status',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-5',
      title: '"Need help making my portfolio responsive before demo day" was marked as solved',
      type: 'Status',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-6',
      title: '"Need help making my portfolio responsive before demo day" was marked as solved',
      type: 'Status',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-7',
      title: 'New helper matched to your responsive portfolio request',
      type: 'Match',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-8',
      title: 'Your trust score increased after a solved request',
      type: 'Reputation',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      read: false
    },
    {
      id: 'notif-9',
      title: 'AI Center detected rising demand for interview prep',
      type: 'Insight',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true
    }
  ]
};

// Initialize LocalStorage
function initializeLocalStorage() {
  if (!localStorage.getItem('helphub_users')) {
    localStorage.setItem('helphub_users', JSON.stringify(SAMPLE_DATA.users));
  }
  if (!localStorage.getItem('helphub_requests')) {
    localStorage.setItem('helphub_requests', JSON.stringify(SAMPLE_DATA.requests));
  }
  if (!localStorage.getItem('helphub_messages')) {
    localStorage.setItem('helphub_messages', JSON.stringify(SAMPLE_DATA.messages));
  }
  if (!localStorage.getItem('helphub_notifications')) {
    localStorage.setItem('helphub_notifications', JSON.stringify(SAMPLE_DATA.notifications));
  }
  if (!localStorage.getItem('helphub_currentUser')) {
    localStorage.setItem('helphub_currentUser', JSON.stringify(SAMPLE_DATA.users[0]));
  }
}

// Utility functions
function getCurrentUser() {
  const user = localStorage.getItem('helphub_currentUser');
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem('helphub_currentUser', JSON.stringify(user));
}

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

function saveRequest(request) {
  const requests = getRequests();
  const index = requests.findIndex(r => r.id === request.id);
  if (index >= 0) {
    requests[index] = request;
  } else {
    requests.push(request);
  }
  localStorage.setItem('helphub_requests', JSON.stringify(requests));
}

function saveMessage(message) {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem('helphub_messages', JSON.stringify(messages));
}

function saveNotification(notification) {
  const notifications = getNotifications();
  notifications.unshift(notification);
  localStorage.setItem('helphub_notifications', JSON.stringify(notifications));
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLocalStorage);
} else {
  initializeLocalStorage();
}
