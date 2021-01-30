// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __param = void 0 && (void 0).__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const inversify_1 = require("inversify");

const types_1 = require("../common/application/types");

require("../common/extensions");

const types_2 = require("../common/types");

const localize = require("../common/utils/localize");

var DSSurveyStateKeys;

(function (DSSurveyStateKeys) {
  DSSurveyStateKeys["ShowBanner"] = "ShowDSSurveyBanner";
  DSSurveyStateKeys["ShowAttemptCounter"] = "DSSurveyShowAttempt";
})(DSSurveyStateKeys = exports.DSSurveyStateKeys || (exports.DSSurveyStateKeys = {}));

var DSSurveyLabelIndex;

(function (DSSurveyLabelIndex) {
  DSSurveyLabelIndex[DSSurveyLabelIndex["Yes"] = 0] = "Yes";
  DSSurveyLabelIndex[DSSurveyLabelIndex["No"] = 1] = "No";
})(DSSurveyLabelIndex || (DSSurveyLabelIndex = {}));

let DataScienceSurveyBanner = class DataScienceSurveyBanner {
  constructor(appShell, persistentState, browserService, commandThreshold = 500, surveyLink = 'https://aka.ms/pyaisurvey') {
    this.appShell = appShell;
    this.persistentState = persistentState;
    this.browserService = browserService;
    this.disabledInCurrentSession = false;
    this.isInitialized = false;
    this.bannerMessage = localize.DataScienceSurveyBanner.bannerMessage();
    this.bannerLabels = [localize.DataScienceSurveyBanner.bannerLabelYes(), localize.DataScienceSurveyBanner.bannerLabelNo()];
    this.commandThreshold = commandThreshold;
    this.surveyLink = surveyLink;
    this.initialize();
  }

  initialize() {
    if (this.isInitialized) {
      return;
    }

    this.isInitialized = true;
  }

  get optionLabels() {
    return this.bannerLabels;
  }

  get shownCount() {
    return this.getPythonDSCommandCounter();
  }

  get enabled() {
    return this.persistentState.createGlobalPersistentState(DSSurveyStateKeys.ShowBanner, true).value;
  }

  showBanner() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.enabled || this.disabledInCurrentSession) {
        return;
      }

      const launchCounter = yield this.incrementPythonDataScienceCommandCounter();
      const show = yield this.shouldShowBanner(launchCounter);

      if (!show) {
        return;
      }

      const response = yield this.appShell.showInformationMessage(this.bannerMessage, ...this.bannerLabels);

      switch (response) {
        case this.bannerLabels[DSSurveyLabelIndex.Yes]:
          {
            yield this.launchSurvey();
            yield this.disable();
            break;
          }

        case this.bannerLabels[DSSurveyLabelIndex.No]:
          {
            yield this.disable();
            break;
          }

        default:
          {
            // Disable for the current session.
            this.disabledInCurrentSession = true;
          }
      }
    });
  }

  shouldShowBanner(launchCounter) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.enabled || this.disabledInCurrentSession) {
        return false;
      }

      if (!launchCounter) {
        launchCounter = yield this.getPythonDSCommandCounter();
      }

      return launchCounter >= this.commandThreshold;
    });
  }

  disable() {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.persistentState.createGlobalPersistentState(DSSurveyStateKeys.ShowBanner, false).updateValue(false);
    });
  }

  launchSurvey() {
    return __awaiter(this, void 0, void 0, function* () {
      this.browserService.launch(this.surveyLink);
    });
  }

  getPythonDSCommandCounter() {
    return __awaiter(this, void 0, void 0, function* () {
      const state = this.persistentState.createGlobalPersistentState(DSSurveyStateKeys.ShowAttemptCounter, 0);
      return state.value;
    });
  }

  incrementPythonDataScienceCommandCounter() {
    return __awaiter(this, void 0, void 0, function* () {
      const state = this.persistentState.createGlobalPersistentState(DSSurveyStateKeys.ShowAttemptCounter, 0);
      yield state.updateValue(state.value + 1);
      return state.value;
    });
  }

};
DataScienceSurveyBanner = __decorate([inversify_1.injectable(), __param(0, inversify_1.inject(types_1.IApplicationShell)), __param(1, inversify_1.inject(types_2.IPersistentStateFactory)), __param(2, inversify_1.inject(types_2.IBrowserService))], DataScienceSurveyBanner);
exports.DataScienceSurveyBanner = DataScienceSurveyBanner;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGFTY2llbmNlU3VydmV5QmFubmVyLmpzIl0sIm5hbWVzIjpbIl9fZGVjb3JhdGUiLCJkZWNvcmF0b3JzIiwidGFyZ2V0Iiwia2V5IiwiZGVzYyIsImMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZCIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImkiLCJkZWZpbmVQcm9wZXJ0eSIsIl9fcGFyYW0iLCJwYXJhbUluZGV4IiwiZGVjb3JhdG9yIiwiX19hd2FpdGVyIiwidGhpc0FyZyIsIl9hcmd1bWVudHMiLCJQIiwiZ2VuZXJhdG9yIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJ2YWx1ZSIsInN0ZXAiLCJuZXh0IiwiZSIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJhcHBseSIsImV4cG9ydHMiLCJpbnZlcnNpZnlfMSIsInJlcXVpcmUiLCJ0eXBlc18xIiwidHlwZXNfMiIsImxvY2FsaXplIiwiRFNTdXJ2ZXlTdGF0ZUtleXMiLCJEU1N1cnZleUxhYmVsSW5kZXgiLCJEYXRhU2NpZW5jZVN1cnZleUJhbm5lciIsImNvbnN0cnVjdG9yIiwiYXBwU2hlbGwiLCJwZXJzaXN0ZW50U3RhdGUiLCJicm93c2VyU2VydmljZSIsImNvbW1hbmRUaHJlc2hvbGQiLCJzdXJ2ZXlMaW5rIiwiZGlzYWJsZWRJbkN1cnJlbnRTZXNzaW9uIiwiaXNJbml0aWFsaXplZCIsImJhbm5lck1lc3NhZ2UiLCJiYW5uZXJMYWJlbHMiLCJiYW5uZXJMYWJlbFllcyIsImJhbm5lckxhYmVsTm8iLCJpbml0aWFsaXplIiwib3B0aW9uTGFiZWxzIiwic2hvd25Db3VudCIsImdldFB5dGhvbkRTQ29tbWFuZENvdW50ZXIiLCJlbmFibGVkIiwiY3JlYXRlR2xvYmFsUGVyc2lzdGVudFN0YXRlIiwiU2hvd0Jhbm5lciIsInNob3dCYW5uZXIiLCJsYXVuY2hDb3VudGVyIiwiaW5jcmVtZW50UHl0aG9uRGF0YVNjaWVuY2VDb21tYW5kQ291bnRlciIsInNob3ciLCJzaG91bGRTaG93QmFubmVyIiwicmVzcG9uc2UiLCJzaG93SW5mb3JtYXRpb25NZXNzYWdlIiwiWWVzIiwibGF1bmNoU3VydmV5IiwiZGlzYWJsZSIsIk5vIiwidXBkYXRlVmFsdWUiLCJsYXVuY2giLCJzdGF0ZSIsIlNob3dBdHRlbXB0Q291bnRlciIsImluamVjdGFibGUiLCJpbmplY3QiLCJJQXBwbGljYXRpb25TaGVsbCIsIklQZXJzaXN0ZW50U3RhdGVGYWN0b3J5IiwiSUJyb3dzZXJTZXJ2aWNlIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0EsSUFBSUEsVUFBVSxHQUFJLFVBQVEsU0FBS0EsVUFBZCxJQUE2QixVQUFVQyxVQUFWLEVBQXNCQyxNQUF0QixFQUE4QkMsR0FBOUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ25GLE1BQUlDLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUFsQjtBQUFBLE1BQTBCQyxDQUFDLEdBQUdILENBQUMsR0FBRyxDQUFKLEdBQVFILE1BQVIsR0FBaUJFLElBQUksS0FBSyxJQUFULEdBQWdCQSxJQUFJLEdBQUdLLE1BQU0sQ0FBQ0Msd0JBQVAsQ0FBZ0NSLE1BQWhDLEVBQXdDQyxHQUF4QyxDQUF2QixHQUFzRUMsSUFBckg7QUFBQSxNQUEySE8sQ0FBM0g7QUFDQSxNQUFJLE9BQU9DLE9BQVAsS0FBbUIsUUFBbkIsSUFBK0IsT0FBT0EsT0FBTyxDQUFDQyxRQUFmLEtBQTRCLFVBQS9ELEVBQTJFTCxDQUFDLEdBQUdJLE9BQU8sQ0FBQ0MsUUFBUixDQUFpQlosVUFBakIsRUFBNkJDLE1BQTdCLEVBQXFDQyxHQUFyQyxFQUEwQ0MsSUFBMUMsQ0FBSixDQUEzRSxLQUNLLEtBQUssSUFBSVUsQ0FBQyxHQUFHYixVQUFVLENBQUNNLE1BQVgsR0FBb0IsQ0FBakMsRUFBb0NPLENBQUMsSUFBSSxDQUF6QyxFQUE0Q0EsQ0FBQyxFQUE3QyxFQUFpRCxJQUFJSCxDQUFDLEdB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eEMsT0FBTyxDQUFDMkMsZUFBM0IsQ0FBSixDQUowQixDQUFELEVBS2pDdkMsdUJBTGlDLENBQXBDO0FBTUFSLE9BQU8sQ0FBQ1EsdUJBQVIsR0FBa0NBLHVCQUFsQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuJ3VzZSBzdHJpY3QnO1xudmFyIF9fZGVjb3JhdGUgPSAodGhpcyAmJiB0aGlzLl9fZGVjb3JhdGUpIHx8IGZ1bmN0aW9uIChkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XG59O1xudmFyIF9fcGFyYW0gPSAodGhpcyAmJiB0aGlzLl9fcGFyYW0pIHx8IGZ1bmN0aW9uIChwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cbn07XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGludmVyc2lmeV8xID0gcmVxdWlyZShcImludmVyc2lmeVwiKTtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi4vY29tbW9uL2FwcGxpY2F0aW9uL3R5cGVzXCIpO1xucmVxdWlyZShcIi4uL2NvbW1vbi9leHRlbnNpb25zXCIpO1xuY29uc3QgdHlwZXNfMiA9IHJlcXVpcmUoXCIuLi9jb21tb24vdHlwZXNcIik7XG5jb25zdCBsb2NhbGl6ZSA9IHJlcXVpcmUoXCIuLi9jb21tb24vdXRpbHMvbG9jYWxpemVcIik7XG52YXIgRFNTdXJ2ZXlTdGF0ZUtleXM7XG4oZnVuY3Rpb24gKERTU3VydmV5U3RhdGVLZXlzKSB7XG4gICAgRFNTdXJ2ZXlTdGF0ZUtleXNbXCJTaG93QmFubmVyXCJdID0gXCJTaG93RFNTdXJ2ZXlCYW5uZXJcIjtcbiAgICBEU1N1cnZleVN0YXRlS2V5c1tcIlNob3dBdHRlbXB0Q291bnRlclwiXSA9IFwiRFNTdXJ2ZXlTaG93QXR0ZW1wdFwiO1xufSkoRFNTdXJ2ZXlTdGF0ZUtleXMgPSBleHBvcnRzLkRTU3VydmV5U3RhdGVLZXlzIHx8IChleHBvcnRzLkRTU3VydmV5U3RhdGVLZXlzID0ge30pKTtcbnZhciBEU1N1cnZleUxhYmVsSW5kZXg7XG4oZnVuY3Rpb24gKERTU3VydmV5TGFiZWxJbmRleCkge1xuICAgIERTU3VydmV5TGFiZWxJbmRleFtEU1N1cnZleUxhYmVsSW5kZXhbXCJZZXNcIl0gPSAwXSA9IFwiWWVzXCI7XG4gICAgRFNTdXJ2ZXlMYWJlbEluZGV4W0RTU3VydmV5TGFiZWxJbmRleFtcIk5vXCJdID0gMV0gPSBcIk5vXCI7XG59KShEU1N1cnZleUxhYmVsSW5kZXggfHwgKERTU3VydmV5TGFiZWxJbmRleCA9IHt9KSk7XG5sZXQgRGF0YVNjaWVuY2VTdXJ2ZXlCYW5uZXIgPSBjbGFzcyBEYXRhU2NpZW5jZVN1cnZleUJhbm5lciB7XG4gICAgY29uc3RydWN0b3IoYXBwU2hlbGwsIHBlcnNpc3RlbnRTdGF0ZSwgYnJvd3NlclNlcnZpY2UsIGNvbW1hbmRUaHJlc2hvbGQgPSA1MDAsIHN1cnZleUxpbmsgPSAnaHR0cHM6Ly9ha2EubXMvcHlhaXN1cnZleScpIHtcbiAgICAgICAgdGhpcy5hcHBTaGVsbCA9IGFwcFNoZWxsO1xuICAgICAgICB0aGlzLnBlcnNpc3RlbnRTdGF0ZSA9IHBlcnNpc3RlbnRTdGF0ZTtcbiAgICAgICAgdGhpcy5icm93c2VyU2VydmljZSA9IGJyb3dzZXJTZXJ2aWNlO1xuICAgICAgICB0aGlzLmRpc2FibGVkSW5DdXJyZW50U2Vzc2lvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYW5uZXJNZXNzYWdlID0gbG9jYWxpemUuRGF0YVNjaWVuY2VTdXJ2ZXlCYW5uZXIuYmFubmVyTWVzc2FnZSgpO1xuICAgICAgICB0aGlzLmJhbm5lckxhYmVscyA9IFtsb2NhbGl6ZS5EYXRhU2NpZW5jZVN1cnZleUJhbm5lci5iYW5uZXJMYWJlbFllcygpLCBsb2NhbGl6ZS5EYXRhU2NpZW5jZVN1cnZleUJhbm5lci5iYW5uZXJMYWJlbE5vKCldO1xuICAgICAgICB0aGlzLmNvbW1hbmRUaHJlc2hvbGQgPSBjb21tYW5kVGhyZXNob2xkO1xuICAgICAgICB0aGlzLnN1cnZleUxpbmsgPSBzdXJ2ZXlMaW5rO1xuICAgICAgICB0aGlzLmluaXRpYWxpemUoKTtcbiAgICB9XG4gICAgaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuICAgIGdldCBvcHRpb25MYWJlbHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbm5lckxhYmVscztcbiAgICB9XG4gICAgZ2V0IHNob3duQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFB5dGhvbkRTQ29tbWFuZENvdW50ZXIoKTtcbiAgICB9XG4gICAgZ2V0IGVuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBlcnNpc3RlbnRTdGF0ZS5jcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUoRFNTdXJ2ZXlTdGF0ZUtleXMuU2hvd0Jhbm5lciwgdHJ1ZSkudmFsdWU7XG4gICAgfVxuICAgIHNob3dCYW5uZXIoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZW5hYmxlZCB8fCB0aGlzLmRpc2FibGVkSW5DdXJyZW50U2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGxhdW5jaENvdW50ZXIgPSB5aWVsZCB0aGlzLmluY3JlbWVudFB5dGhvbkRhdGFTY2llbmNlQ29tbWFuZENvdW50ZXIoKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3cgPSB5aWVsZCB0aGlzLnNob3VsZFNob3dCYW5uZXIobGF1bmNoQ291bnRlcik7XG4gICAgICAgICAgICBpZiAoIXNob3cpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIHRoaXMuYXBwU2hlbGwuc2hvd0luZm9ybWF0aW9uTWVzc2FnZSh0aGlzLmJhbm5lck1lc3NhZ2UsIC4uLnRoaXMuYmFubmVyTGFiZWxzKTtcbiAgICAgICAgICAgIHN3aXRjaCAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlIHRoaXMuYmFubmVyTGFiZWxzW0RTU3VydmV5TGFiZWxJbmRleC5ZZXNdOlxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmxhdW5jaFN1cnZleSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhc2UgdGhpcy5iYW5uZXJMYWJlbHNbRFNTdXJ2ZXlMYWJlbEluZGV4Lk5vXToge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0aGlzLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBmb3IgdGhlIGN1cnJlbnQgc2Vzc2lvbi5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlZEluQ3VycmVudFNlc3Npb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNob3VsZFNob3dCYW5uZXIobGF1bmNoQ291bnRlcikge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVuYWJsZWQgfHwgdGhpcy5kaXNhYmxlZEluQ3VycmVudFNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWxhdW5jaENvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICBsYXVuY2hDb3VudGVyID0geWllbGQgdGhpcy5nZXRQeXRob25EU0NvbW1hbmRDb3VudGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbGF1bmNoQ291bnRlciA+PSB0aGlzLmNvbW1hbmRUaHJlc2hvbGQ7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgeWllbGQgdGhpcy5wZXJzaXN0ZW50U3RhdGUuY3JlYXRlR2xvYmFsUGVyc2lzdGVudFN0YXRlKERTU3VydmV5U3RhdGVLZXlzLlNob3dCYW5uZXIsIGZhbHNlKS51cGRhdGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsYXVuY2hTdXJ2ZXkoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0aGlzLmJyb3dzZXJTZXJ2aWNlLmxhdW5jaCh0aGlzLnN1cnZleUxpbmspO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0UHl0aG9uRFNDb21tYW5kQ291bnRlcigpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gdGhpcy5wZXJzaXN0ZW50U3RhdGUuY3JlYXRlR2xvYmFsUGVyc2lzdGVudFN0YXRlKERTU3VydmV5U3RhdGVLZXlzLlNob3dBdHRlbXB0Q291bnRlciwgMCk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbmNyZW1lbnRQeXRob25EYXRhU2NpZW5jZUNvbW1hbmRDb3VudGVyKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSB0aGlzLnBlcnNpc3RlbnRTdGF0ZS5jcmVhdGVHbG9iYWxQZXJzaXN0ZW50U3RhdGUoRFNTdXJ2ZXlTdGF0ZUtleXMuU2hvd0F0dGVtcHRDb3VudGVyLCAwKTtcbiAgICAgICAgICAgIHlpZWxkIHN0YXRlLnVwZGF0ZVZhbHVlKHN0YXRlLnZhbHVlICsgMSk7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5EYXRhU2NpZW5jZVN1cnZleUJhbm5lciA9IF9fZGVjb3JhdGUoW1xuICAgIGludmVyc2lmeV8xLmluamVjdGFibGUoKSxcbiAgICBfX3BhcmFtKDAsIGludmVyc2lmeV8xLmluamVjdCh0eXBlc18xLklBcHBsaWNhdGlvblNoZWxsKSksXG4gICAgX19wYXJhbSgxLCBpbnZlcnNpZnlfMS5pbmplY3QodHlwZXNfMi5JUGVyc2lzdGVudFN0YXRlRmFjdG9yeSkpLFxuICAgIF9fcGFyYW0oMiwgaW52ZXJzaWZ5XzEuaW5qZWN0KHR5cGVzXzIuSUJyb3dzZXJTZXJ2aWNlKSlcbl0sIERhdGFTY2llbmNlU3VydmV5QmFubmVyKTtcbmV4cG9ydHMuRGF0YVNjaWVuY2VTdXJ2ZXlCYW5uZXIgPSBEYXRhU2NpZW5jZVN1cnZleUJhbm5lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGFTY2llbmNlU3VydmV5QmFubmVyLmpzLm1hcCJdfQ==