import ChatModel from '../models/messages.model.js'

export default class ChatManager {
    constructor() {}

    async getHistory() {
        try {
            const data = await ChatModel.find()
            return data
        } catch(e) {
            return []
        }
    }

    async sendMsg(msg) {
        try {
            await ChatModel.insertMany([msg])
        } catch(e) {
            return e
        }
    }
}