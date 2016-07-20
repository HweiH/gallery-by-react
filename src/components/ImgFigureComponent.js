/**
 * Created by hasee on 2016/7/20.
 */
import React from 'react';

class ImgFigureComponent extends React.Component {
  render() {

    var styleObj = {};

    // 如果 props 属性中指定了这张图片的位置，则使用
    if(this.props.arrange.pos) {
      styleObj = this.props.arrange.pos;
    }

    return (
      <figure className="img-figure" style={ styleObj }>
        <img src={ this.props.data.imageURL }
             alt={ this.props.data.title }
        />
        <figcaption>
          <h2 className="img-title">{ this.props.data.title }</h2>
        </figcaption>
      </figure>
    );
  }
}

ImgFigureComponent.defaultProps = {
};

export default ImgFigureComponent;
