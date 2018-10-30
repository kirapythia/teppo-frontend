import React from 'react';
import SVGInline from 'react-svg-inline';

export default class SVGRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svg: null,
      loading: false,
    };
  }

  componentDidMount() {
    fetch(this.props.svgUrl)
      .then(res => res.text())
      .then((text) => {
        const parser = new DOMParser();
        console.log(parser.parseFromString(text, 'text/xml'));
        this.setState({ svg: text });
      });
  }

  render() {
    const { loading, svg } = this.state;
    if (loading) {
      return <div className="spinner" />;
    } else if (!svg) {
      return <div className="error" />;
    }
    // return <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />;
    return <SVGInline viewBox="0 0 2230 1123" svg={this.state.svg} component="svg" />;
  }
}
