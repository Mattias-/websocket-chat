import tornado.ioloop
import tornado.web
import tornado.websocket

def main():
  app = tornado.web.Application([(r"/", EchoWebSocket)], debug=True)
  app.listen(8080)
  tornado.ioloop.IOLoop.instance().start()

connections = set()

class EchoWebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        connections.add(self)

    def on_message(self, message):
        for c in connections:
          c.write_message(message)

    def on_close(self):
        connections.discard(self)

if __name__ == "__main__":
  main()

