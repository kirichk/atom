// tslint:disable:quotemark ordered-imports member-ordering one-line prefer-const
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = require("events");

const SocketStream_1 = require("./SocketStream");

class SocketCallbackHandler extends events_1.EventEmitter {
  constructor(socketServer) {
    super();
    this.commandHandlers = new Map();
    socketServer.on('data', this.onData.bind(this));
  }

  dispose() {
    this.disposed = true;
    this.commandHandlers.clear();
  }

  onData(socketClient, data) {
    if (this.disposed) {
      return;
    }

    this.HandleIncomingData(data, socketClient);
  }

  get stream() {
    return this._stream;
  }

  SendRawCommand(commandId) {
    this.stream.Write(commandId);
  }

  registerCommandHandler(commandId, handler) {
    this.commandHandlers.set(commandId, handler);
  }

  HandleIncomingData(buffer, socket) {
    if (!this._stream) {
      this._stream = new SocketStream_1.SocketStream(socket, buffer);
    } else {
      this._stream.Append(buffer);
    }

    if (!this.handeshakeDone && !this.handleHandshake()) {
      return;
    }

    this.handeshakeDone = true;
    this.HandleIncomingDataFromStream();
    return true;
  }

  HandleIncomingDataFromStream() {
    if (this.stream.Length === 0) {
      return;
    }

    this.stream.BeginTransaction();
    let cmd = this.stream.ReadAsciiString(4);

    if (this.stream.HasInsufficientDataForReading) {
      this.stream.RollBackTransaction();
      return;
    }

    if (this.commandHandlers.has(cmd)) {
      const handler = this.commandHandlers.get(cmd);
      handler();
    } else {
      this.emit("error", `Unhandled command '${cmd}'`);
    }

    if (this.stream.HasInsufficientDataForReading) {
      // Most possibly due to insufficient data
      this.stream.RollBackTransaction();
      return;
    }

    this.stream.EndTransaction();

    if (this.stream.Length > 0) {
      this.HandleIncomingDataFromStream();
    }
  }

}

exports.SocketCallbackHandler = SocketCallbackHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvY2tldENhbGxiYWNrSGFuZGxlci5qcyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImV2ZW50c18xIiwicmVxdWlyZSIsIlNvY2tldFN0cmVhbV8xIiwiU29ja2V0Q2FsbGJhY2tIYW5kbGVyIiwiRXZlbnRFbWl0dGVyIiwiY29uc3RydWN0b3IiLCJzb2NrZXRTZXJ2ZXIiLCJjb21tYW5kSGFuZGxlcnMiLCJNYXAiLCJvbiIsIm9uRGF0YSIsImJpbmQiLCJkaXNwb3NlIiwiZGlzcG9zZWQiLCJjbGVhciIsInNvY2tldENsaWVudCIsImRhdGEiLCJIYW5kbGVJbmNvbWluZ0RhdGEiLCJzdHJlYW0iLCJfc3RyZWFtIiwiU2VuZFJhd0NvbW1hbmQiLCJjb21tYW5kSWQiLCJXcml0ZSIsInJlZ2lzdGVyQ29tbWFuZEhhbmRsZXIiLCJoYW5kbGVyIiwic2V0IiwiYnVmZmVyIiwic29ja2V0IiwiU29ja2V0U3RyZWFtIiwiQXBwZW5kIiwiaGFuZGVzaGFrZURvbmUiLCJoYW5kbGVIYW5kc2hha2UiLCJIYW5kbGVJbmNvbWluZ0RhdGFGcm9tU3RyZWFtIiwiTGVuZ3RoIiwiQmVnaW5UcmFuc2FjdGlvbiIsImNtZCIsIlJlYWRBc2NpaVN0cmluZyIsIkhhc0luc3VmZmljaWVudERhdGFGb3JSZWFkaW5nIiwiUm9sbEJhY2tUcmFuc2FjdGlvbiIsImhhcyIsImdldCIsImVtaXQiLCJFbmRUcmFuc2FjdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFDQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCQyxPQUF0QixFQUErQixZQUEvQixFQUE2QztBQUFFQyxFQUFBQSxLQUFLLEVBQUU7QUFBVCxDQUE3Qzs7QUFDQSxNQUFNQyxRQUFRLEdBQUdDLE9BQU8sQ0FBQyxRQUFELENBQXhCOztBQUNBLE1BQU1DLGNBQWMsR0FBR0QsT0FBTyxDQUFDLGdCQUFELENBQTlCOztBQUNBLE1BQU1FLHFCQUFOLFNBQW9DSCxR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YmVyLW9yZGVyaW5nIG9uZS1saW5lIHByZWZlci1jb25zdFxuXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBTb2NrZXRTdHJlYW1fMSA9IHJlcXVpcmUoXCIuL1NvY2tldFN0cmVhbVwiKTtcbmNsYXNzIFNvY2tldENhbGxiYWNrSGFuZGxlciBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Ioc29ja2V0U2VydmVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY29tbWFuZEhhbmRsZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICBzb2NrZXRTZXJ2ZXIub24oJ2RhdGEnLCB0aGlzLm9uRGF0YS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgdGhpcy5kaXNwb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY29tbWFuZEhhbmRsZXJzLmNsZWFyKCk7XG4gICAgfVxuICAgIG9uRGF0YShzb2NrZXRDbGllbnQsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLkhhbmRsZUluY29taW5nRGF0YShkYXRhLCBzb2NrZXRDbGllbnQpO1xuICAgIH1cbiAgICBnZXQgc3RyZWFtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICAgIH1cbiAgICBTZW5kUmF3Q29tbWFuZChjb21tYW5kSWQpIHtcbiAgICAgICAgdGhpcy5zdHJlYW0uV3JpdGUoY29tbWFuZElkKTtcbiAgICB9XG4gICAgcmVnaXN0ZXJDb21tYW5kSGFuZGxlcihjb21tYW5kSWQsIGhhbmRsZXIpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kSGFuZGxlcnMuc2V0KGNvbW1hbmRJZCwgaGFuZGxlcik7XG4gICAgfVxuICAgIEhhbmRsZUluY29taW5nRGF0YShidWZmZXIsIHNvY2tldCkge1xuICAgICAgICBpZiAoIXRoaXMuX3N0cmVhbSkge1xuICAgICAgICAgICAgdGhpcy5fc3RyZWFtID0gbmV3IFNvY2tldFN0cmVhbV8xLlNvY2tldFN0cmVhbShzb2NrZXQsIGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9zdHJlYW0uQXBwZW5kKGJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmhhbmRlc2hha2VEb25lICYmICF0aGlzLmhhbmRsZUhhbmRzaGFrZSgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oYW5kZXNoYWtlRG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuSGFuZGxlSW5jb21pbmdEYXRhRnJvbVN0cmVhbSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgSGFuZGxlSW5jb21pbmdEYXRhRnJvbVN0cmVhbSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLkxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RyZWFtLkJlZ2luVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgbGV0IGNtZCA9IHRoaXMuc3RyZWFtLlJlYWRBc2NpaVN0cmluZyg0KTtcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLkhhc0luc3VmZmljaWVudERhdGFGb3JSZWFkaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0cmVhbS5Sb2xsQmFja1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuY29tbWFuZEhhbmRsZXJzLmhhcyhjbWQpKSB7XG4gICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gdGhpcy5jb21tYW5kSGFuZGxlcnMuZ2V0KGNtZCk7XG4gICAgICAgICAgICBoYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBgVW5oYW5kbGVkIGNvbW1hbmQgJyR7Y21kfSdgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdHJlYW0uSGFzSW5zdWZmaWNpZW50RGF0YUZvclJlYWRpbmcpIHtcbiAgICAgICAgICAgIC8vIE1vc3QgcG9zc2libHkgZHVlIHRvIGluc3VmZmljaWVudCBkYXRhXG4gICAgICAgICAgICB0aGlzLnN0cmVhbS5Sb2xsQmFja1RyYW5zYWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdHJlYW0uRW5kVHJhbnNhY3Rpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuc3RyZWFtLkxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuSGFuZGxlSW5jb21pbmdEYXRhRnJvbVN0cmVhbSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Tb2NrZXRDYWxsYmFja0hhbmRsZXIgPSBTb2NrZXRDYWxsYmFja0hhbmRsZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zb2NrZXRDYWxsYmFja0hhbmRsZXIuanMubWFwIl19