export interface ConversationSeed {
  id: string;
  participants: [string, string];
  participantNames: [string, string];
  participantRoles: ["Creator" | "Brand" | "Admin", "Creator" | "Brand" | "Admin"];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface MessageSeed {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: "Creator" | "Brand" | "Admin";
  content: string;
  readAt: string | null;
  createdAt: string;
}

export const conversations: ConversationSeed[] = [
  {
    id: "conv-creator-1",
    participants: ["user-admin", "user-creator-1"],
    participantNames: ["Admin", "Sentila Jamir"],
    participantRoles: ["Admin", "Creator"],
    lastMessage: "Your profile approval is now live.",
    lastMessageAt: "2026-08-04T06:15:00.000Z",
    unreadCount: 1,
  },
  {
    id: "conv-brand-1",
    participants: ["user-brand-1", "user-creator-2"],
    participantNames: ["NorthEats", "Rahul Boruah"],
    participantRoles: ["Brand", "Creator"],
    lastMessage: "Could you share the revised reel concept?",
    lastMessageAt: "2026-08-04T05:50:00.000Z",
    unreadCount: 0,
  },
  {
    id: "conv-brand-2",
    participants: ["user-admin", "user-brand-1"],
    participantNames: ["Admin", "NorthEats"],
    participantRoles: ["Admin", "Brand"],
    lastMessage: "We have reviewed the campaign brief and approved the launch.",
    lastMessageAt: "2026-08-04T04:10:00.000Z",
    unreadCount: 2,
  },
];

export const messages: MessageSeed[] = [
  {
    id: "msg-1",
    conversationId: "conv-creator-1",
    senderId: "user-admin",
    senderName: "Admin",
    senderRole: "Admin",
    content: "Your profile approval is now live. Please add one more portfolio piece this week.",
    readAt: null,
    createdAt: "2026-08-04T06:15:00.000Z",
  },
  {
    id: "msg-2",
    conversationId: "conv-creator-1",
    senderId: "user-creator-1",
    senderName: "Sentila Jamir",
    senderRole: "Creator",
    content: "Thanks. I will upload the new portfolio reel today.",
    readAt: "2026-08-04T06:20:00.000Z",
    createdAt: "2026-08-04T06:18:00.000Z",
  },
  {
    id: "msg-3",
    conversationId: "conv-brand-1",
    senderId: "user-brand-1",
    senderName: "NorthEats",
    senderRole: "Brand",
    content: "Could you share the revised reel concept?",
    readAt: "2026-08-04T06:00:00.000Z",
    createdAt: "2026-08-04T05:50:00.000Z",
  },
  {
    id: "msg-4",
    conversationId: "conv-brand-2",
    senderId: "user-admin",
    senderName: "Admin",
    senderRole: "Admin",
    content: "We have reviewed the campaign brief and approved the launch.",
    readAt: null,
    createdAt: "2026-08-04T04:10:00.000Z",
  },
];