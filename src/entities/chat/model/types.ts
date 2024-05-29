export type User = {
  id: string;
  fullName: string;
};

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  user: User;
};

export type Chat = {
  id: string;
  chatMembers: User[];
  chatMessages: Message[];
};
