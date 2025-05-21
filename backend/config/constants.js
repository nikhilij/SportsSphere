// Application constants
const constants = {
  // General
  APP_NAME: "SportsSphere",
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,

  // Authentication
  JWT_COOKIE_EXPIRES_IN: 90, // days
  PASSWORD_RESET_EXPIRES_IN: 10, // minutes
  EMAIL_VERIFICATION_EXPIRES_IN: 24, // hours

  // User roles
  ROLES: {
    ADMIN: "admin",
    USER: "user",
    COACH: "coach",
    ATHLETE: "athlete",
    MANAGER: "manager",
    SPONSOR: "sponsor",
  },

  // Event types
  EVENT_TYPES: ["tournament", "match", "practice", "workshop", "meetup", "other"],

  // Club categories
  CLUB_CATEGORIES: [
    "football",
    "cricket",
    "basketball",
    "tennis",
    "swimming",
    "athletics",
    "hockey",
    "badminton",
    "volleyball",
    "other",
  ],

  // Product categories for store
  PRODUCT_CATEGORIES: ["equipment", "apparel", "accessories", "merchandise", "other"],

  // Scholarship types
  SCHOLARSHIP_TYPES: ["academic", "athletic", "need-based", "merit-based", "other"],

  // Reward types
  REWARD_TYPES: ["achievement", "participation", "loyalty", "referral", "other"],

  // Community post types
  POST_TYPES: ["announcement", "discussion", "question", "event", "poll", "other"],

  // Payment status
  PAYMENT_STATUS: {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
    REFUNDED: "refunded",
    CANCELLED: "cancelled",
  },

  // Order status
  ORDER_STATUS: {
    CREATED: "created",
    PAYMENT_PENDING: "payment_pending",
    PAYMENT_COMPLETED: "payment_completed",
    PROCESSING: "processing",
    SHIPPED: "shipped",
    DELIVERED: "delivered",
    CANCELLED: "cancelled",
    REFUNDED: "refunded",
  },

  // File upload limits
  UPLOAD_LIMITS: {
    PROFILE_PICTURE: 5 * 1024 * 1024, // 5MB
    EVENT_IMAGE: 10 * 1024 * 1024, // 10MB
    PRODUCT_IMAGE: 8 * 1024 * 1024, // 8MB
    DOCUMENT: 15 * 1024 * 1024, // 15MB
  },

  // Socket events
  SOCKET_EVENTS: {
    CONNECTION: "connection",
    DISCONNECT: "disconnect",
    JOIN_ROOM: "join_room",
    LEAVE_ROOM: "leave_room",
    NEW_MESSAGE: "new_message",
    MESSAGE_RECEIVED: "message_received",
    USER_TYPING: "user_typing",
    USER_STOPPED_TYPING: "user_stopped_typing",
    NEW_NOTIFICATION: "new_notification",
    EVENT_UPDATE: "event_update",
    CLUB_UPDATE: "club_update",
  },
};

module.exports = constants;
