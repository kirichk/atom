// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

const React = require("react");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  componentDidCatch(error, info) {
    const stack = info.componentStack; // Display fallback UI

    this.setState({
      hasError: true,
      errorMessage: `${error} at \n  ${stack}`
    });
  }

  render() {
    if (this.state.hasError) {
      // Render our error message;
      const style = {}; // tslint:disable-next-line:no-string-literal

      style['whiteSpace'] = 'pre';
      return React.createElement("h1", {
        style: style
      }, this.state.errorMessage);
    }

    return this.props.children;
  }

}

exports.ErrorBoundary = ErrorBoundary;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVycm9yQm91bmRhcnkuanMiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJSZWFjdCIsInJlcXVpcmUiLCJFcnJvckJvdW5kYXJ5IiwiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJwcm9wcyIsInN0YXRlIiwiaGFzRXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJjb21wb25lbnREaWRDYXRjaCIsImVycm9yIiwiaW5mbyIsInN0YWNrIiwiY29tcG9uZW50U3RhY2siLCJzZXRTdGF0ZSIsInJlbmRlciIsInN0eWxlIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBQ0FBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQkMsT0FBdEIsRUFBK0IsWUFBL0IsRUFBNkM7QUFBRUMsRUFBQUEsS0FBSyxFQUFFO0FBQVQsQ0FBN0M7O0FBQ0EsTUFBTUMsS0FBSyxHQUFHQyxPQUFPLENBQUMsT0FBRCxDQUFyQjs7QUFDQSxNQUFNQyxhQUFOLFNBQTRCRixLQUFLLENBQUNHLFNBQWxDLENBQTRDO0FBQ3hDQyxFQUFBQSxXQUFXLENBQUNDLEtBQUQsRUFBUTtBQUNmLFVBQU1BLEtBQU47QUFDQSxTQUFLQyxLQUFMLEdBQWE7QUFBRUMsTUFBQUEsUUFBUSxFQUFFLEtBQVo7QUFBbUJDLE1BQUFBLFlBQVksRUFBRTtBQUFqQyxLQUFiO0FBQ0g7O0FBQ0RDLEVBQUFBLGlCQUFpQixDQUFDQyxLQUFELEVBQVFDLElBQVIsRUFBYztBQUMzQixVQUFNQyxLQUFLLEdBQUdELElBQUksQ0FBQ0UsY0FBbkIsQ0FEMkIsQ0FFM0I7O0FBQ0EsU0FBS0MsUUFBTCxDQUFjO0FBQUVQLE1BQUFBLFFBQVEsRUFBRSxJQUFaO0FBQWtCQyxNQUFBQSxZQUFZLEVBQUcsR0FBRUUsS0FBTSxXQUFVRSxLQUFNO0FBQXpELEtBQWQ7QUFDSDs7QUFDREcsRUFBQUEsTUFBTSxHQUFHO0FBQ0wsUUFBSSxLQUFLVCxLQUFMLENBQVdDLFFBQWYsRUFBeUI7QUFDckI7QUFDQSxZQUFNUyxLQUFLLEdBQUcsRUFBZCxDQUZxQixDQUdyQjs7QUFDQUEsTUFBQUEsS0FBSyxDQUFDLFlBQUQsQ0FBTCxHQUFzQixLQUF0QjtBQUNBLGFBQU9oQixLQUFLLENBQUNpQixhQUFOLENBQW9CLElBQXBCLEVBQTBCO0FBQUVELFFBQUFBLEtBQUssRUFBRUE7QUFBVCxPQUExQixFQUE0QyxLQUFLVixLQUFMLENBQVdFLFlBQXZELENBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQUtILEtBQUwsQ0FBV2EsUUFBbEI7QUFDSDs7QUFuQnVDOztBQXFCNUNwQixPQUFPLENBQUNJLGFBQVIsR0FBd0JBLGFBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4ndXNlIHN0cmljdCc7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBSZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbmNsYXNzIEVycm9yQm91bmRhcnkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgaGFzRXJyb3I6IGZhbHNlLCBlcnJvck1lc3NhZ2U6ICcnIH07XG4gICAgfVxuICAgIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBpbmZvKSB7XG4gICAgICAgIGNvbnN0IHN0YWNrID0gaW5mby5jb21wb25lbnRTdGFjaztcbiAgICAgICAgLy8gRGlzcGxheSBmYWxsYmFjayBVSVxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgaGFzRXJyb3I6IHRydWUsIGVycm9yTWVzc2FnZTogYCR7ZXJyb3J9IGF0IFxcbiAgJHtzdGFja31gIH0pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmhhc0Vycm9yKSB7XG4gICAgICAgICAgICAvLyBSZW5kZXIgb3VyIGVycm9yIG1lc3NhZ2U7XG4gICAgICAgICAgICBjb25zdCBzdHlsZSA9IHt9O1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXN0cmluZy1saXRlcmFsXG4gICAgICAgICAgICBzdHlsZVsnd2hpdGVTcGFjZSddID0gJ3ByZSc7XG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcImgxXCIsIHsgc3R5bGU6IHN0eWxlIH0sIHRoaXMuc3RhdGUuZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcbiAgICB9XG59XG5leHBvcnRzLkVycm9yQm91bmRhcnkgPSBFcnJvckJvdW5kYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXJyb3JCb3VuZGFyeS5qcy5tYXAiXX0=