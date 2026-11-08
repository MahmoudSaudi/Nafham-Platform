import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example mock for notifications
  http.get('*/api/notifications', () => {
    return HttpResponse.json({
      success: true,
      data: {
        notifications: [
          {
            id: '1',
            title: 'Mocked Notification',
            message: 'This is an intercepted response from MSW.',
            type: 'INFO',
            isRead: false,
            createdAt: new Date().toISOString(),
          }
        ],
        unreadCount: 1,
      }
    });
  }),
];
