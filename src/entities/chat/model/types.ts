export interface IUser {
  id: string;
  fullName: string;
  email: string;
}

export type Message = {
  id: string;
  text: string;
  createdAt: string;
  user: IUser;
};

export type Chat = {
  id: string;
  memberName: string;
  memberEmail: string;
  chatMembers: IUser[];
  chatMessages: Message[];
};
