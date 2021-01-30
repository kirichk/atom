"use strict";

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = require("events");

const inversify_1 = require("inversify");

const net = require("net");

const async_1 = require("../../utils/async");

const misc_1 = require("../../utils/misc");

let SocketServer = class SocketServer extends events_1.EventEmitter {
  constructor() {
    super();
    this.clientSocket = async_1.createDeferred();
  }

  get client() {
    return this.clientSocket.promise;
  }

  dispose() {
    this.Stop();
  }

  Stop() {
    if (!this.socketServer) {
      return;
    }

    try {
      this.socketServer.close(); // tslint:disable-next-line:no-empty
    } catch (ex) {}

    this.socketServer = undefined;
  }

  Start(options = {}) {
    const def = async_1.createDeferred();
    this.socketServer = net.createServer(this.connectionListener.bind(this));
    const port = typeof options.port === 'number' ? options.port : 0;
    const host = typeof options.host === 'string' ? options.host : 'localhost';
    this.socketServer.on('error', ex => {
      console.error('Error in Socket Server', ex);
      const msg = `Failed to start the socket server. (Error: ${ex.message})`;
      def.reject(msg);
    });
    this.socketServer.listen({
      port,
      host
    }, () => {
      def.resolve(this.socketServer.address().port);
    });
    return def.promise;
  }

  connectionListener(client) {
    if (!this.clientSocket.completed) {
      this.clientSocket.resolve(client);
    }

    client.on('close', () => {
      this.emit('close', client);
    });
    client.on('data', data => {
      this.emit('data', client, data);
    });
    client.on('error', err => misc_1.noop);
    client.on('timeout', d => {// let msg = "Debugger client timedout, " + d;
    });
  }

};
SocketServer = __decorate([inversify_1.injectable()], SocketServer);
exports.SocketServer = SocketServer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldFNlcnZlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJldmVudHNfMSIsInJlcXVpcmUiLCJpbnZlcnNpZnlfMSIsIm5ldCIsImFzeW5jXzEiLCJtaXNjXzEiLCJTb2NrZXRTZXJ2ZXIiLCJFdmVudEVtaXR0ZXIiLCJjb25zdHJ1Y3RvciIsImNsaWVudFNvY2tldCIsImNyZWF0ZURlZmVycmVkIiwiY2xpZW50IiwicHJvbWlzZSIsImRpc3Bvc2UiLCJTdG9wIiwic29ja2V0U2VydmVyIiwiY2xvc2UiLCJleCIsInVuZGVmaW5lZCIsIlN0YXJ0Iiwib3B0aW9ucyIsImRlZiIsImNyZWF0ZVNlcnZlciIsImNvbm5lY3Rpb25MaXN0ZW5lciIsImJpbmQiLCJwb3J0IiwiaG9zdCIsIm9uIiwiY29uc29sZSIsImVycm9yIiwibXNnIiwibWVzc2FnZSIsInJlamVjdCIsImxpc3RlbiIsInJlc29sdmUiLCJhZGRyZXNzIiwiY29tcGxldGVkIiwiZW1pdCIsImRhdGEiLCJlcnIiLCJub29wIiwiaW5qZWN0YWJsZSJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1B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QUFxQmxDLENBQUMsSUFBSSxDQUN0QjtBQUNILEtBRkQ7QUFHSDs7QUFuRCtELENBQXBFO0FBcURBYSxZQUFZLEdBQUd4QixVQUFVLENBQUMsQ0FDdEJvQixXQUFXLENBQUN1QyxVQUFaLEVBRHNCLENBQUQsRUFFdEJuQyxZQUZzQixDQUF6QjtBQUdBUixPQUFPLENBQUNRLFlBQVIsR0FBdUJBLFlBQXZCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19kZWNvcmF0ZSA9ICh0aGlzICYmIHRoaXMuX19kZWNvcmF0ZSkgfHwgZnVuY3Rpb24gKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBpbnZlcnNpZnlfMSA9IHJlcXVpcmUoXCJpbnZlcnNpZnlcIik7XG5jb25zdCBuZXQgPSByZXF1aXJlKFwibmV0XCIpO1xuY29uc3QgYXN5bmNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9hc3luY1wiKTtcbmNvbnN0IG1pc2NfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlscy9taXNjXCIpO1xubGV0IFNvY2tldFNlcnZlciA9IGNsYXNzIFNvY2tldFNlcnZlciBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY2xpZW50U29ja2V0ID0gYXN5bmNfMS5jcmVhdGVEZWZlcnJlZCgpO1xuICAgIH1cbiAgICBnZXQgY2xpZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jbGllbnRTb2NrZXQucHJvbWlzZTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5TdG9wKCk7XG4gICAgfVxuICAgIFN0b3AoKSB7XG4gICAgICAgIGlmICghdGhpcy5zb2NrZXRTZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXRTZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkgeyB9XG4gICAgICAgIHRoaXMuc29ja2V0U2VydmVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBTdGFydChvcHRpb25zID0ge30pIHtcbiAgICAgICAgY29uc3QgZGVmID0gYXN5bmNfMS5jcmVhdGVEZWZlcnJlZCgpO1xuICAgICAgICB0aGlzLnNvY2tldFNlcnZlciA9IG5ldC5jcmVhdGVTZXJ2ZXIodGhpcy5jb25uZWN0aW9uTGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbnN0IHBvcnQgPSB0eXBlb2Ygb3B0aW9ucy5wb3J0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMucG9ydCA6IDA7XG4gICAgICAgIGNvbnN0IGhvc3QgPSB0eXBlb2Ygb3B0aW9ucy5ob3N0ID09PSAnc3RyaW5nJyA/IG9wdGlvbnMuaG9zdCA6ICdsb2NhbGhvc3QnO1xuICAgICAgICB0aGlzLnNvY2tldFNlcnZlci5vbignZXJyb3InLCBleCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBTb2NrZXQgU2VydmVyJywgZXgpO1xuICAgICAgICAgICAgY29uc3QgbXNnID0gYEZhaWxlZCB0byBzdGFydCB0aGUgc29ja2V0IHNlcnZlci4gKEVycm9yOiAke2V4Lm1lc3NhZ2V9KWA7XG4gICAgICAgICAgICBkZWYucmVqZWN0KG1zZyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNvY2tldFNlcnZlci5saXN0ZW4oeyBwb3J0LCBob3N0IH0sICgpID0+IHtcbiAgICAgICAgICAgIGRlZi5yZXNvbHZlKHRoaXMuc29ja2V0U2VydmVyLmFkZHJlc3MoKS5wb3J0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkZWYucHJvbWlzZTtcbiAgICB9XG4gICAgY29ubmVjdGlvbkxpc3RlbmVyKGNsaWVudCkge1xuICAgICAgICBpZiAoIXRoaXMuY2xpZW50U29ja2V0LmNvbXBsZXRlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGllbnRTb2NrZXQucmVzb2x2ZShjbGllbnQpO1xuICAgICAgICB9XG4gICAgICAgIGNsaWVudC5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJywgY2xpZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNsaWVudC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RhdGEnLCBjbGllbnQsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xpZW50Lm9uKCdlcnJvcicsIChlcnIpID0+IG1pc2NfMS5ub29wKTtcbiAgICAgICAgY2xpZW50Lm9uKCd0aW1lb3V0JywgZCA9PiB7XG4gICAgICAgICAgICAvLyBsZXQgbXNnID0gXCJEZWJ1Z2dlciBjbGllbnQgdGltZWRvdXQsIFwiICsgZDtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcblNvY2tldFNlcnZlciA9IF9fZGVjb3JhdGUoW1xuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKVxuXSwgU29ja2V0U2VydmVyKTtcbmV4cG9ydHMuU29ja2V0U2VydmVyID0gU29ja2V0U2VydmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29ja2V0U2VydmVyLmpzLm1hcCJdfQ==