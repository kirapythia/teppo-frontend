import React from 'react';
import SVGInline from 'react-svg-inline';

export default class SVGRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      svgWidth: 0,
      svgHeight: 0,
      loading: false,
    };
  }

  componentDidMount() {
    fetch(this.props.svgUrl)
      .then(res => res.text())
      .then((text) => {
        const svgDocument = new DOMParser().parseFromString(text, 'text/xml');
        const svgElement = svgDocument.getElementsByTagName('svg')[0];
        this.setState({ svg: text });
        this.setState({ svgWidth: svgElement.getAttribute('width') });
        this.setState({ svgHeight: svgElement.getAttribute('height') });
      });
  }

  render() {
    const { loading, svg } = this.state;
    if (loading) {
      return <div className="spinner" />;
    } else if (!svg) {
      return <div className="error" />;
    }
    return <SVGInline viewBox={`0 0 ${this.state.svgWidth} ${this.state.svgHeight}`} svg={this.state.svg} component="svg" />;
  }
}
