import type { Db } from 'mongodb'

export type ChatMessage = {
  queryId?: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const CHAT_COLLECTION = 'chatMessages'

export function insertChatMessage(db: Db, message: ChatMessage) {
  return db.collection(CHAT_COLLECTION).insertOne({
    ...message,
    timestamp: new Date(),
  })
}

export function getChatHistory(db: Db, sessionId: string) {
  return db
    .collection(CHAT_COLLECTION)
    .find({ sessionId })
    .sort({ timestamp: 1 })
    .toArray()
}
