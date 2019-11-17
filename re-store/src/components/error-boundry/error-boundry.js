import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

export default class ErrorBoundry extends Component {
  state = {
    haseError: false
  };

  componentDidCatch() {
    this.setState({ haseError: true });
  }

  render() {
    if (this.state.haseError) {
      return <ErrorIndicator />;
    }

    return this.props.children;
  }
}
