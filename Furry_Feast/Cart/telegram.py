import telepot

def bot_send(bot_token, chat_id, message):
    bot = telepot.Bot(bot_token)
    bot.sendMessage(chat_id, message)