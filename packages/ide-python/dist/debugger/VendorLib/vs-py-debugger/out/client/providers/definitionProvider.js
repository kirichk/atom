'use strict';

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

const vscode = require("vscode");

const telemetry_1 = require("../telemetry");

const constants_1 = require("../telemetry/constants");

const proxy = require("./jediProxy");

class PythonDefinitionProvider {
  constructor(jediFactory) {
    this.jediFactory = jediFactory;
  }

  static parseData(data, possibleWord) {
    if (data && Array.isArray(data.definitions) && data.definitions.length > 0) {
      const definitions = data.definitions.filter(d => d.text === possibleWord);
      const definition = definitions.length > 0 ? definitions[0] : data.definitions[data.definitions.length - 1];
      const definitionResource = vscode.Uri.file(definition.fileName);
      const range = new vscode.Range(definition.range.startLine, definition.range.startColumn, definition.range.endLine, definition.range.endColumn);
      return new vscode.Location(definitionResource, range);
    }

    return null;
  }

  provideDefinition(document, position, token) {
    const filename = document.fileName;

    if (document.lineAt(position.line).text.match(/^\s*\/\//)) {
      return Promise.resolve(null);
    }

    if (position.character <= 0) {
      return Promise.resolve(null);
    }

    const range = document.getWordRangeAtPosition(position);
    const columnIndex = range.isEmpty ? position.character : range.end.character;
    const cmd = {
      command: proxy.CommandType.Definitions,
      fileName: filename,
      columnIndex: columnIndex,
      lineIndex: position.line
    };

    if (document.isDirty) {
      cmd.source = document.getText();
    }

    const possibleWord = document.getText(range);
    return this.jediFactory.getJediProxyHandler(document.uri).sendCommand(cmd, token).then(data => {
      return PythonDefinitionProvider.parseData(data, possibleWord);
    });
  }

}

__decorate([telemetry_1.captureTelemetry(constants_1.DEFINITION)], PythonDefinitionProvider.prototype, "provideDefinition", null);

exports.PythonDefinitionProvider = PythonDefinitionProvider;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmluaXRpb25Qcm92aWRlci5qcyJdLCJuYW1lcyI6WyJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiciIsIk9iamVjdCIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImQiLCJSZWZsZWN0IiwiZGVjb3JhdGUiLCJpIiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ2c2NvZGUiLCJyZXF1aXJlIiwidGVsZW1ldHJ5XzEiLCJjb25zdGFudHNfMSIsInByb3h5IiwiUHl0aG9uRGVmaW5pdGlvblByb3ZpZGVyIiwiY29uc3RydWN0b3IiLCJqZWRpRmFjdG9yeSIsInBhcnNlRGF0YSIsImRhdGEiLCJwb3NzaWJsZVdvcmQiLCJBcnJheSIsImlzQXJyYXkiLCJkZWZpbml0aW9ucyIsImZpbHRlciIsInRleHQiLCJkZWZpbml0aW9uIiwiZGVmaW5pdGlvblJlc291cmNlIiwiVXJpIiwiZmlsZSIsImZpbGVOYW1lIiwicmFuZ2UiLCJSYW5nZSIsInN0YXJ0TGluZSIsInN0YXJ0Q29sdW1uIiwiZW5kTGluZSIsImVuZENvbHVtbiIsIkxvY2F0aW9uIiwicHJvdmlkZURlZmluaXRpb24iLCJkb2N1bWVudCIsInBvc2l0aW9uIiwidG9rZW4iLCJmaWxlbmFtZSIsImxpbmVBdCIsImxpbmUiLCJtYXRjaCIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2hhcmFjdGVyIiwiZ2V0V29yZFJhbmdlQXRQb3NpdGlvbiIsImNvbHVtbkluZGV4IiwiaXNFbXB0eSIsImVuZCIsImNtZCIsImNvbW1hbmQiLCJDb21tYW5kVHlwZSIsIkRlZmluaXRpb25zIiwibGluZUluZGV4IiwiaXNEaXJ0eSIsInNvdXJjZSIsImdldFRleHQiLCJnZXRKZWRpUHJveHlIYW5kbGVyIiwidXJpIiwic2VuZENvbW1hbmQiLCJ0aGVuIiwiY2FwdHVyZVRlbGVtZXRyeSIsIkRFRklOSVRJT04iLCJw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QWtCQyxXQURuQjtBQUVSMUIsTUFBQUEsUUFBUSxFQUFFWSxRQUZGO0FBR1JRLE1BQUFBLFdBQVcsRUFBRUEsV0FITDtBQUlSTyxNQUFBQSxTQUFTLEVBQUVqQixRQUFRLENBQUNJO0FBSlosS0FBWjs7QUFNQSxRQUFJTCxRQUFRLENBQUNtQixPQUFiLEVBQXNCO0FBQ2xCTCxNQUFBQSxHQUFHLENBQUNNLE1BQUosR0FBYXBCLFFBQVEsQ0FBQ3FCLE9BQVQsRUFBYjtBQUNIOztBQUNELFVBQU14QyxZQUFZLEdBQUdtQixRQUFRLENBQUNxQixPQUFULENBQWlCN0IsS0FBakIsQ0FBckI7QUFDQSxXQUFPLEtBQUtkLFdBQUwsQ0FBaUI0QyxtQkFBakIsQ0FBcUN0QixRQUFRLENBQUN1QixHQUE5QyxFQUFtREMsV0FBbkQsQ0FBK0RWLEdBQS9ELEVBQW9FWixLQUFwRSxFQUEyRXVCLElBQTNFLENBQWdGN0MsSUFBSSxJQUFJO0FBQzNGLGFBQU9KLHdCQUF3QixDQUFDRyxTQUF6QixDQUFtQ0MsSUFBbkMsRUFBeUNDLFlBQXpDLENBQVA7QUFDSCxLQUZNLENBQVA7QUFHSDs7QUFyQzBCOztBQXVDL0I1QixVQUFVLENBQUMsQ0FDUG9CLFdBQVcsQ0FBQ3FELGdCQUFaLENBQTZCcEQsV0FBVyxDQUFDcUQsVUFBekMsQ0FETyxDQUFELEVBRVBuRCx3QkFBd0IsQ0FBQ29ELFNBRmxCLEVBRTZCLG1CQUY3QixFQUVrRCxJQUZsRCxDQUFWOztBQUdBM0QsT0FBTyxDQUFDTyx3QkFBUixHQUFtQ0Esd0JBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdnNjb2RlID0gcmVxdWlyZShcInZzY29kZVwiKTtcbmNvbnN0IHRlbGVtZXRyeV8xID0gcmVxdWlyZShcIi4uL3RlbGVtZXRyeVwiKTtcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4uL3RlbGVtZXRyeS9jb25zdGFudHNcIik7XG5jb25zdCBwcm94eSA9IHJlcXVpcmUoXCIuL2plZGlQcm94eVwiKTtcbmNsYXNzIFB5dGhvbkRlZmluaXRpb25Qcm92aWRlciB7XG4gICAgY29uc3RydWN0b3IoamVkaUZhY3RvcnkpIHtcbiAgICAgICAgdGhpcy5qZWRpRmFjdG9yeSA9IGplZGlGYWN0b3J5O1xuICAgIH1cbiAgICBzdGF0aWMgcGFyc2VEYXRhKGRhdGEsIHBvc3NpYmxlV29yZCkge1xuICAgICAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuZGVmaW5pdGlvbnMpICYmIGRhdGEuZGVmaW5pdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBkYXRhLmRlZmluaXRpb25zLmZpbHRlcihkID0+IGQudGV4dCA9PT0gcG9zc2libGVXb3JkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlZmluaXRpb24gPSBkZWZpbml0aW9ucy5sZW5ndGggPiAwID8gZGVmaW5pdGlvbnNbMF0gOiBkYXRhLmRlZmluaXRpb25zW2RhdGEuZGVmaW5pdGlvbnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBjb25zdCBkZWZpbml0aW9uUmVzb3VyY2UgPSB2c2NvZGUuVXJpLmZpbGUoZGVmaW5pdGlvbi5maWxlTmFtZSk7XG4gICAgICAgICAgICBjb25zdCByYW5nZSA9IG5ldyB2c2NvZGUuUmFuZ2UoZGVmaW5pdGlvbi5yYW5nZS5zdGFydExpbmUsIGRlZmluaXRpb24ucmFuZ2Uuc3RhcnRDb2x1bW4sIGRlZmluaXRpb24ucmFuZ2UuZW5kTGluZSwgZGVmaW5pdGlvbi5yYW5nZS5lbmRDb2x1bW4pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB2c2NvZGUuTG9jYXRpb24oZGVmaW5pdGlvblJlc291cmNlLCByYW5nZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHByb3ZpZGVEZWZpbml0aW9uKGRvY3VtZW50LCBwb3NpdGlvbiwgdG9rZW4pIHtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBkb2N1bWVudC5maWxlTmFtZTtcbiAgICAgICAgaWYgKGRvY3VtZW50LmxpbmVBdChwb3NpdGlvbi5saW5lKS50ZXh0Lm1hdGNoKC9eXFxzKlxcL1xcLy8pKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb3NpdGlvbi5jaGFyYWN0ZXIgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmdldFdvcmRSYW5nZUF0UG9zaXRpb24ocG9zaXRpb24pO1xuICAgICAgICBjb25zdCBjb2x1bW5JbmRleCA9IHJhbmdlLmlzRW1wdHkgPyBwb3NpdGlvbi5jaGFyYWN0ZXIgOiByYW5nZS5lbmQuY2hhcmFjdGVyO1xuICAgICAgICBjb25zdCBjbWQgPSB7XG4gICAgICAgICAgICBjb21tYW5kOiBwcm94eS5Db21tYW5kVHlwZS5EZWZpbml0aW9ucyxcbiAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICAgIGNvbHVtbkluZGV4OiBjb2x1bW5JbmRleCxcbiAgICAgICAgICAgIGxpbmVJbmRleDogcG9zaXRpb24ubGluZVxuICAgICAgICB9O1xuICAgICAgICBpZiAoZG9jdW1lbnQuaXNEaXJ0eSkge1xuICAgICAgICAgICAgY21kLnNvdXJjZSA9IGRvY3VtZW50LmdldFRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwb3NzaWJsZVdvcmQgPSBkb2N1bWVudC5nZXRUZXh0KHJhbmdlKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuamVkaUZhY3RvcnkuZ2V0SmVkaVByb3h5SGFuZGxlcihkb2N1bWVudC51cmkpLnNlbmRDb21tYW5kKGNtZCwgdG9rZW4pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHl0aG9uRGVmaW5pdGlvblByb3ZpZGVyLnBhcnNlRGF0YShkYXRhLCBwb3NzaWJsZVdvcmQpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5fX2RlY29yYXRlKFtcbiAgICB0ZWxlbWV0cnlfMS5jYXB0dXJlVGVsZW1ldHJ5KGNvbnN0YW50c18xLkRFRklOSVRJT04pXG5dLCBQeXRob25EZWZpbml0aW9uUHJvdmlkZXIucHJvdG90eXBlLCBcInByb3ZpZGVEZWZpbml0aW9uXCIsIG51bGwpO1xuZXhwb3J0cy5QeXRob25EZWZpbml0aW9uUHJvdmlkZXIgPSBQeXRob25EZWZpbml0aW9uUHJvdmlkZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kZWZpbml0aW9uUHJvdmlkZXIuanMubWFwIl19